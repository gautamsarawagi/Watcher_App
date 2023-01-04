from pydantic import BaseModel

class Criminal_Check(BaseModel):
    image: str

class Criminal_Add(BaseModel):
    criminal_name:str
    age:str
    image:str
    latitude:str
    longitude:str