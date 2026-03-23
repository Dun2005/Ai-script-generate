from fastapi import FastAPI
from app.schemas.payload import ScriptRequest
from app.services.ai_service import generate_script
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate")
def generate(data : ScriptRequest):
    keyword = data.keyword
    script = generate_script(keyword)

    return {"message" : "Keyword received", "keyword" : keyword, "script" : script}