from fastapi import FastAPI
from app.schemas.payload import ScriptRequest
from app.services.ai_service import generate_script
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate")
async def stream_script(request : ScriptRequest):
    return StreamingResponse(generate_script(request.keyword), media_type="text/plain")