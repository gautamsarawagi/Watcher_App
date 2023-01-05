from fastapi import APIRouter
from config.database import third_collection_name
from models.login_model import Person_Details
from schemas.login_schema import login_searilizer,logins_searilizer

login_api_router = APIRouter()

@login_api_router.post("/login")
async def post_login(person:Person_Details):
    try:
        login_person = login_searilizer(third_collection_name.find_one({"email": person.email }))
        if login_person["password"] == person.password:
            return {"Status":"success","msg" : "Login Successful","data":login_person}
        else:
            return{"Status": "error","msg": "Wrong credentials entered"}
    except:
        return {"Status": "error","msg": "Problem via login"}