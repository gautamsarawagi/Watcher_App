def license_searilizer(license) -> dict:
    return {
        "id": str(license["_id"]),
        "licenseNo":license["licenseNo"],
        "model": license["model"],
        "color": license["color"],
        "lastLocation": license["lastLocation"],
        "dateOfTheft": license["dateOfTheft"]
    }

def licenses_searilizer(licenses) -> list:
    return [license_searilizer(license) for license in licenses]