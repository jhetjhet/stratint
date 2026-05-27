import json
from typing import Dict
from core.config import settings
from .client import client
from schemas.step1 import Step1Response
from schemas.step2 import Step2Response
from utils.errors import InvalidJSONError, MalformedAIOutputError
from utils.prompts import STEP1_PROMPT_TEMPLATE, STEP2_PROMPT_TEMPLATE

LLM_TIMEOUT = 60  # seconds

def generate_step1_strategy(company_text: str, strategy_text: str) -> Dict:
    schema = json.dumps(Step1Response.model_json_schema(), indent=2)
    prompt = STEP1_PROMPT_TEMPLATE.format(
        company_text=company_text,
        strategy_text=strategy_text,
        schema=schema
    )
    try:
        response = client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=2048,
            timeout=LLM_TIMEOUT,
            response_format={"type": "json_object"},
        )
        content = response.choices[0].message.content
        data = json.loads(content)
        Step1Response.model_validate(data)
        return data
    except json.JSONDecodeError:
        raise InvalidJSONError()
    except Exception as e:
        raise MalformedAIOutputError(str(e))

def generate_bsc(step1_output: dict) -> Dict:
    schema = json.dumps(Step2Response.model_json_schema(), indent=2)
    prompt = STEP2_PROMPT_TEMPLATE.format(
        step1_json=json.dumps(step1_output, indent=2),
        schema=schema
    )
    try:
        response = client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=2048,
            timeout=LLM_TIMEOUT,
            response_format={"type": "json_object"},
        )
        content = response.choices[0].message.content
        data = json.loads(content)
        # Ensure rag_status and lead are always empty
        def clear_rag_lead(bsc_dict):
            for perspective in ["financial", "customers_partners", "systems_processes", "learning_growth"]:
                rows = bsc_dict["balanced_scorecard"][perspective]["rows"]
                for row in rows:
                    row["rag_status"] = ""
                    row["lead"] = ""
        clear_rag_lead(data)
        Step2Response.model_validate(data)
        return data
    except json.JSONDecodeError:
        raise InvalidJSONError()
    except Exception as e:
        raise MalformedAIOutputError(str(e))
