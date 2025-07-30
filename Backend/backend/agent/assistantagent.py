import os
import asyncio
from agents import Runner,OpenAIChatCompletionsModel,Agent, trace,function_tool
from openai import AsyncOpenAI
import fitz  # type: ignore
from docx import Document   # type: ignore
from typing import Annotated
from agents import function_tool
from fastapi import UploadFile
import tempfile
from memory import add_to_memory, search_memory,memory_data,get_latest_topic_from_memory,get_latest_blog_topic

from dotenv import load_dotenv
load_dotenv()

gemini_api_key =os.getenv("gemini_api_key")

client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)


@function_tool
async def blog_title_generator(title:str):
    """ Generate a catchy blog post title based on the given topic.

    Args: 
        title (str): A short topic or keyword for the blog post

    Return:
        str: A creative and attention-grabbing blog post title.
    
    
    
    
    """
    prompt = f"Generate a catchy and creative blog post title about: {title} Do not include any explanations or multiple titles."
    
    response = await client.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "system", "content": "You are a blog title generator."},
            {"role": "user", "content": prompt}
        ],
    )
    return response.choices[0].message.content.strip()



@function_tool
async def blog_description_generator(topic: str):
    """Generate a short blog post description for the given topic."""
    prompt = f"Generate a 2-3 sentence blog post description about: {topic}"
    response = await client.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "system", "content": "You are a blog description generator."},
            {"role": "user", "content": prompt}
        ],
    )
    return response.choices[0].message.content.strip()
    




@function_tool
async def ai_article_writer(topic: str) -> str:
    """
    Generate a complete 400-word blog article based on the given topic.

    Args:
        topic (str): The topic or subject of the blog article.

    Returns:
        str: A well-written, informative, and engaging blog article of approximately 400 words.
    """
    prompt = (
        f"Write a complete, well-structured blog article of approximately 400 words "
        f"on the topic: '{topic}'. The article should have an engaging introduction, "
        f"informative body, and a thoughtful conclusion. Do not include any explanation or notes, "
        f"just return the article content."
    )

    response = await client.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "system", "content": "You are an AI assistant that writes blog articles."},
            {"role": "user", "content": prompt}
        ],
    )
    return response.choices[0].message.content.strip()




@function_tool
async def review_cv(file: Annotated[UploadFile, "Upload your CV (PDF or DOCX)"]) -> str:
    """
    Review a CV file and suggest improvements.

    Args:
        file (UploadFile): A PDF or DOCX CV file.

    Returns:
        str: Suggestions to improve the CV based on clarity, formatting, and strength.
    """
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

    # Prompt to review the CV
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








agent_info="""
        "When the user asks to generate a blog title, use the blog_title_generator tool. "
        "When the user asks for a blog description, use the blog_description_generator tool. "
        "If the topic is missing, retrieve it from memory."
        "When the user asks to generate a article, use the ai_article_writer tool. "
        "When the user upload its cv file for review , use the review_cv tool. "

"""

@function_tool
def agent_tool()->str:
    return agent_info.strip()






agent = Agent(
        name="Assistant",
        instructions=(
        "You are a helpful assistant. Use agent_tool to retrieve instructions . "

        ),
        model=OpenAIChatCompletionsModel(model="gemini-2.0-flash", openai_client=client),
        tools=[ blog_title_generator,blog_description_generator,ai_article_writer,agent_tool]
    )


# async def get_agent_response(query: str) -> str:
#     result = await Runner.run(agent, query)
#     return result.final_output


def preprocess_query(query: str) -> str:
    if any(phrase in query.lower() for phrase in ["write a description about it", "description for it", "description please"]):
        topic = get_latest_blog_topic()
        if topic:
            return f"Write a blog description about {topic}"
        else:
            return "I couldn’t find a previous topic. Please provide one."
    return query




async def get_agent_response(query: str) -> str:
    query = preprocess_query(query)

    # Special case: ask about last query
    if "what was my last query" in query.lower():
        if len(memory_data) >= 2:
            return f"Your last query was: '{memory_data[-2]['user_input']}'"
        else:
            return "You haven't asked any previous queries"
        
    if "previous topic" in query.lower() or "topic i gave earlier" in query.lower():
        latest_topic = get_latest_topic_from_memory()
        if latest_topic:
            # Reconstruct the prompt to call the tool with previous topic
            query = f"Generate a blog title on: {latest_topic}"


    # Step 1: search for relevant memory
    past_contexts = search_memory(query, k=2)
    context_str = "\n---\n".join(
        [f"user_input: {m['user_input']}\nllm_output: {m['llm_output']}" for m in past_contexts]
    )

    # Step 2: enhance query
    enhanced_query = f"Context:\n{context_str}\n\nUser query: {query}"





    # Step 3: run agent
    result = await Runner.run(agent, enhanced_query)
    output = result.final_output
        # Save to memory (after stream ends)


    # Step 4: save to memory
    add_to_memory(query, output)

    return output