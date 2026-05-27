from document.extractor import extract_text_from_file, UnsupportedFileTypeError, EmptyDocumentError
from services.llm.generators import generate_step1_strategy, generate_bsc
from utils.errors import InvalidJSONError, MalformedAIOutputError


def process_step1(company_file, strategy_file):
    try:
        company_text = extract_text_from_file(company_file.file.read(), company_file.filename)
        strategy_text = extract_text_from_file(strategy_file.file.read(), strategy_file.filename)
    except (UnsupportedFileTypeError, EmptyDocumentError) as e:
        raise e
    return generate_step1_strategy(company_text, strategy_text)


def process_step2(step1_output: dict):
    try:
        return generate_bsc(step1_output)
    except (InvalidJSONError, MalformedAIOutputError) as e:
        raise e
