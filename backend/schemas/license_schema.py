def license_searilizer(license) -> dict:
    return {
        "id": str(license["_id"]),
        "licenseNo":license["licenseNo"],
        "model": license["model"],
        "color": license["color"],
        "lastLocation": license["lastLocation"],
        "dateOfTheft": license["dateOfTheft"],
        "latitude": license["latitude"],
        "longitude": license["longitude"],
        "complete_status": license["complete_status"]
    }

def licenses_searilizer(licenses) -> list:
    return [license_searilizer(license) for license in licenses]