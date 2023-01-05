def login_searilizer(person) -> dict:
    return {
        "id": str(person["_id"]),
        "email":person["email"],
        "password": person["password"],
    }

def logins_searilizer(persons) -> list:
    return [login_searilizer(person) for person in persons]