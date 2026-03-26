from google import genai
from app.schemas.payload import ScriptResponse
from dotenv import load_dotenv
import os


load_dotenv()

client = genai.Client()

def generate_script(keyword: str):
    prompt = f"""Bạn là chuyên gia YouTube chuyên sâu về chủ đề khoa học và công nghệ. Hãy viết kịch bản video hấp dẫn về [keyword].
    YÊU CẦU ĐỊNH DẠNG ĐẦU RA BẮT BUỘC: 
    - Trình bày chuẩn định dạng Markdown.
    - BẮT BUỘC phải dùng 2 dấu xuống dòng (\\n\\n) để tách biệt rõ ràng các đoạn văn, cảnh quay, và lời bình. Không được dính chùm văn bản vào nhau.
    - Dùng **in đậm** cho các tiêu đề (Mở đầu, Phần 1...) và dấu - cho các danh sách liệt kê.
    - Dùng [ngoặc vuông] cho các ghi chú về hiệu ứng âm thanh/hình ảnh.

    Chủ đề của video là: {keyword}
    """
    
    response = client.models.generate_content_stream(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    
    for chunk in response:
        yield chunk.text