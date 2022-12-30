from fastapi import FastAPI;
from routes.license_routes import license_api_router
from flask_cors import CORS

app = FastAPI()

app.include_router(license_api_router)

# CORS(app)
