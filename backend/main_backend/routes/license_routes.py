from bson import ObjectId
from fastapi import APIRouter
from config.database import collection_name
from models.license_model import License
from schemas.license_schema import license_searilizer,licenses_searilizer


license_api_router = APIRouter()

# retrieve
@license_api_router.get("/license")
async def get_licenses():
    licenses = licenses_searilizer(collection_name.find())
    return {"Status":"ok","data":licenses}

@license_api_router.get("/license/{id}")
async def get_license(id:str):
    license = licenses_searilizer(collection_name.find({"_id":ObjectId(id)}))
    return {"Status":"ok","data":license}

@license_api_router.post("/license")
async def post_license(license:License):
    _id = collection_name.insert_one(dict(license))
    license = licenses_searilizer(collection_name.find({"_id":_id.inserted_id}))
    return {"Status":"ok","data":license}
