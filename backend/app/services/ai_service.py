from google import genai
from app.schemas.payload import ScriptResponse
from dotenv import load_dotenv
import os


load_dotenv()

client = genai.Client()

def generate_script(keyword: str):
    prompt = f"Bạn là chuyên gia YouTube. Hãy viết kịch bản về chủ đề: {keyword}."
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': ScriptResponse,
        },
    )
    
    return response.text