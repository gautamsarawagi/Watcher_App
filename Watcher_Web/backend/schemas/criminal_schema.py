def criminal_searilizer(criminal_data) -> dict:
    return{
        "id":str(criminal_data["_id"]),
        "criminal_name": criminal_data["criminal_name"],
        "age":  criminal_data["age"],
        "image":criminal_data["image"],
        "latitude": criminal_data["latitude"],
        "longitude": criminal_data["longitude"],
    } 

def criminals_searilizer(criminal_data) -> list:
    return [criminal_searilizer(criminal_data) for criminal_data in criminal_data]
