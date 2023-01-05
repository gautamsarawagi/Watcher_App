from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.complete_database

collection_name = db["license_plates"]

second_collection_name = db["Criminal_Database"]

third_collection_name = db["Authorization"]