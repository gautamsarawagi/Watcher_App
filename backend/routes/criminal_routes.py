from fastapi import APIRouter
from config.database import second_collection_name
from models.criminal_model import Criminal_Check,Criminal_Add
from schemas.criminal_schema import criminal_searilizer,criminals_searilizer
import face_recognition as fr
import urllib.request as ur
import re
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

account_sid = os.environ['TWILIO_SID']
auth_token = os.environ['TWILIO_AUTH']
msgClient = Client(account_sid, auth_token)

image_api_router = APIRouter()

known_faces = second_collection_name.distinct("image")

def compare_faces(encoded_image1, encoded_image2):
    file1 = ur.urlopen(encoded_image1)
    file2 = ur.urlopen(encoded_image2)
    
    image1 = fr.load_image_file(file1)
    image2 = fr.load_image_file(file2)

    height1, width1, _ = image1.shape
    height2, width2, _ = image2.shape

    face_location_1 = (0, width1, height1, 0)
    face_location_2 = (0, width2, height2, 0)
    
    # Get the face encodings for 1st face in each image file
    image1_encoding = fr.face_encodings(image1, [face_location_1])[0]
    image2_encoding = fr.face_encodings(image2, [face_location_2])[0]
    
    # Compare faces and return True / False
    results = fr.compare_faces([image1_encoding], image2_encoding)    
    return results[0]    

def face_rec(encode_image):
    for image in known_faces:
        if compare_faces(image,encode_image):
            return image
        else:
            return "Unmatched"

@image_api_router.get("/image_match")
async def get_image():
    images = criminals_searilizer(second_collection_name.find())
    return {"Status":"ok","data":known_faces}

@image_api_router.post("/image_match")
async def post_image(image:Criminal_Check):
    if face_rec(image.image) != "Unmatched":
        criminal = criminal_searilizer(second_collection_name.find_one({"image": face_rec(image.image)}))
        msgClient.messages.create(
            body= f"Criminal: {criminal['criminal_name']} has been found at latitude: {criminal['latitude']} and longitude: {criminal['longitude']}.",
            from_="+19298224131",
            to="+916261316598"
        )
        return {"Status":"success","msg" : "Criminal Founded Successfully","data": criminal}
    else:
        return {"Status":"error","msg": "No Criminal Found!!"}

# adding the criminals

@image_api_router.post("/criminal")
async def post_criminal(criminal:Criminal_Add):
    _id = second_collection_name.insert_one(dict(criminal))
    criminal = criminals_searilizer(second_collection_name.find({"_id":_id.inserted_id}))
    return {"Status": "success","data": criminal}

@image_api_router.get("/criminal/{criminal_name}")
async def get_criminal(criminal_name:str):
    criminal = criminals_searilizer(second_collection_name.find({"criminal_name":re.compile(criminal_name, re.IGNORECASE)}))
    if criminal:
        return {"Status":"success","msg": "Criminal present in database", "data":criminal}
    else:
        return {"Status":"error","msg": "Criminal not present in database"}


# { '$regex':/^John$/i}