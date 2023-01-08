from fastapi import APIRouter
from config.database import collection_name
from models.license_model import License
from schemas.license_schema import license_searilizer,licenses_searilizer
from twilio.rest import Client
from dotenv import load_dotenv
import os
import re
load_dotenv()

account_sid = os.environ['TWILIO_SID']
auth_token = os.environ['TWILIO_AUTH']
msgClient = Client(account_sid, auth_token)

license_api_router = APIRouter()

# retrieve
@license_api_router.get("/license")
async def get_licenses():
    licenses = licenses_searilizer(collection_name.find())
    return {"Status":"ok","data":licenses}

@license_api_router.get("/license/{licenseNo}")
async def get_license(licenseNo:str):
    license = licenses_searilizer(collection_name.find({"licenseNo":re.compile(licenseNo, re.IGNORECASE)}))
    if license:
        return {"Status":"success","msg": "license plate in database", "data":license}
    else:
        return {"Status":"error","msg": "license plate not in database"}
    

@license_api_router.post("/license")
async def post_license(license:License):
    _id = collection_name.insert_one(dict(license))
    license = licenses_searilizer(collection_name.find({"_id":_id.inserted_id}))
    return {"Status":"ok","data":license}

@license_api_router.get("/send-message/{plate_no}")
async def send_message(plate_no:str):
    license = licenses_searilizer(collection_name.find({"licenseNo":re.compile(plate_no, re.IGNORECASE)}))
    if license:
        msgClient.messages.create(
        body= f"License Plate: {license[0]['licenseNo']} has been found at latitude: {license[0]['latitude']} and longitude: {license[0]['longitude']}",
        from_="+19298224131",
        to="+919301912689"
        )   
        return {"Status":"success","msg":"License Plate in Database","data": license}
    else:
        return {"Status":"error","msg":"License Plate not in Database"}