from bson import ObjectId
from fastapi import APIRouter
from config.database import second_collection_name
from models.image_model import Image_Check
from schemas.image_schema import image_searilizer,images_Searilizer

image_api_router = APIRouter()
