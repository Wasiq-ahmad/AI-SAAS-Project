from fastapi import FastAPI, Depends, HTTPException,APIRouter
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import PlainTextResponse
from schemas import Query
from agent.assistantagent import get_agent_response

agent_router=APIRouter()

@agent_router.post("/assistant")
async def ask_agent(data: Query):
    try:
        response = await get_agent_response(data.query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



