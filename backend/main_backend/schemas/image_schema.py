def image_searilizer(image_data) -> dict:
    return{
        "id":str(image_data["_id"]),
        "image":str(image_data["image"]),
        "isMatched": bool(image_data["isMatched"])
    } 

def images_Searilizer(images_data) -> list:
    return [image_searilizer(image_data) for image_data in images_data]
