from pymongo import MongoClient
import gridfs
import io
from PIL import Image

connection = MongoClient("localhost", 27017)
database = connection['Image_database']

def uploadImageIntoDatabase(image,name):
    fs = gridfs.GridFS(database)
    file = image
    with open(file, 'rb') as f:
        contents = f.read()
    fs.put(contents, filename=name)

uploadImageIntoDatabase("./sample_images/obama.jpeg","obama")