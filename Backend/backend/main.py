from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user
from auth import oauth
from routes.agentsroutes import agent_router
from routes.cv_review import cv_router
from memory import get_full_memory
from models import Base
from database import engine
import os
from dotenv import load_dotenv
load_dotenv()  # This loads variables from .env into os.environ

DATABASE_URL = os.getenv("DATABASE_URL")


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(oauth.router)
app.include_router(agent_router)
app.include_router(cv_router)

@app.get("/memory")
def memory():
    return get_full_memory()