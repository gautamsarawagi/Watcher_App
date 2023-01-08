from pydantic import BaseModel

class Person_Details(BaseModel):
    email:str
    password:str