import os
import fitz  # type: ignore
from docx import Document   # type: ignore
from fastapi import UploadFile
import tempfile
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("gemini_api_key")

client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)


async def review_cv(file: UploadFile) -> str:
    ext = file.filename.lower().split(".")[-1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as temp_file:
        temp_path = temp_file.name
        temp_file.write(await file.read())

    if ext == "pdf":
        text = extract_text_from_pdf(temp_path)
    elif ext == "docx":
        text = extract_text_from_docx(temp_path)
    else:
        return "Unsupported file type. Please upload a PDF or DOCX file."

    prompt = (
        f"Here is the content of a candidate's CV:\n\n{text}\n\n"
        "Act as an expert career advisor and provide constructive suggestions for improving this CV. "
        "Focus on formatting, clarity, language, missing information, and impact."
    )

    response = await client.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "system", "content": "You are a professional CV reviewer."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()


def extract_text_from_pdf(path: str) -> str:
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text


def extract_text_from_docx(path: str) -> str:
    doc = Document(path)
    return "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
