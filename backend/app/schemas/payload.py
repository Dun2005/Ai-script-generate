from pydantic import BaseModel

class ScriptRequest(BaseModel):
    keyword: str

class ScriptResponse(BaseModel):
    title: str
    description: str
    script: str
