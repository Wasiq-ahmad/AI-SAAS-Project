from fastapi import APIRouter, UploadFile, File, HTTPException
from agent.cv_review_agent import review_cv

cv_router = APIRouter()

@cv_router.post("/cv-review")
async def review_cv_endpoint(file: UploadFile = File(...)):
    try:
        # ✅ DIRECTLY CALL THE FUNCTION TOOL — DO NOT USE Runner.run()
        result = await review_cv(file) 
        return {"response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
