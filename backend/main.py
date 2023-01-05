import os
from fastapi import FastAPI;
from fastapi.middleware.cors import CORSMiddleware
from flask_cors import CORS

from routes.login_routes import login_api_router
from routes.license_routes import license_api_router
from routes.criminal_routes import image_api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=['*']
)

app.include_router(login_api_router)
app.include_router(license_api_router)
app.include_router(image_api_router)
