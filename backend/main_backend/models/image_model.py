from pydantic import BaseModel

class Image_Check(BaseModel):
    image: str
    isMatched: bool