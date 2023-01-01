from fastapi import FastAPI;
from fastapi.middleware.cors import CORSMiddleware

from routes.license_routes import license_api_router
from flask_cors import CORS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=['*']
)

app.include_router(license_api_router)

# CORS(app) 
