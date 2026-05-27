from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from services.strategy_service import process_step1, process_step2
from utils.errors import http_error_from_exception
from typing import Dict

router = APIRouter()

@router.post("/strategy/step1")
async def strategy_step1(company_file: UploadFile = File(...), strategy_file: UploadFile = File(...)):
    try:
        result = process_step1(company_file, strategy_file)
        return JSONResponse(content=result)
    except Exception as e:
        raise http_error_from_exception(e)

@router.post("/strategy/step2")
async def strategy_step2(step1_output: Dict):
    try:
        result = process_step2(step1_output)
        return JSONResponse(content=result)
    except Exception as e:
        raise http_error_from_exception(e)
