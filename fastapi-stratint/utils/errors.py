from fastapi import HTTPException

class InvalidJSONError(Exception):
    pass

class LLMTimeoutError(Exception):
    pass

class MalformedAIOutputError(Exception):
    pass

def http_error_from_exception(exc: Exception) -> HTTPException:
    if hasattr(exc, 'status_code'):
        return exc
    if isinstance(exc, InvalidJSONError):
        return HTTPException(status_code=422, detail="Invalid JSON structure.")
    if isinstance(exc, LLMTimeoutError):
        return HTTPException(status_code=504, detail="LLM request timed out.")
    if isinstance(exc, MalformedAIOutputError):
        return HTTPException(status_code=502, detail="Malformed AI output.")
    return HTTPException(status_code=500, detail=str(exc))
