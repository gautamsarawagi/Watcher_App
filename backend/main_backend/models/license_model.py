from pydantic import BaseModel;

class License(BaseModel):
    licenseNo:str
    model: str
    color:str
    lastLocation: str
    dateOfTheft:object