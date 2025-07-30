from fastapi import APIRouter, Request
from starlette.responses import RedirectResponse
import os
from google_auth_oauthlib.flow import Flow

router = APIRouter()

CLIENT_SECRETS_FILE = "client_secret_file.json"
SCOPES = ["https://www.googleapis.com/auth/userinfo.email", "openid"]
REDIRECT_URI = "http://localhost:8000/google/callback"

flow = Flow.from_client_secrets_file(
    CLIENT_SECRETS_FILE,
    scopes=SCOPES,
    redirect_uri=REDIRECT_URI
)

@router.get("/google/login")
def google_login():
    auth_url, _ = flow.authorization_url(prompt="consent")
    return RedirectResponse(auth_url)

@router.get("/google/callback")
def google_callback(request: Request):
    flow.fetch_token(authorization_response=str(request.url))
    credentials = flow.credentials
    session = flow.authorized_session()
    profile = session.get("https://www.googleapis.com/userinfo/v2/me").json()
    # Extract email and login/register user
    return profile
