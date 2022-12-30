import gridfs
from itertools import chain
from config.database import db
from PIL import Image
import numpy as np

fs = gridfs.GridFS(db)

file="/home/gautam/code/Watcher_App/backend/sample_images/peter.png"

with open(file, 'rb') as f:
    contents = f.read()

# a = fs.put(contents, filename="peter")


# --------------------------------------------------------------------

# products = db["fs.files"]

# item = products.find_one({'_id': "63aead352172eef3ea9294d1"})

# for x in products.find({}, {"_id":0, "filename": 1 }):
    # print(x)

# ----------------------------------------------------------------------------
