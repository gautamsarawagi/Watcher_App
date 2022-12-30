from flask import Flask, request
from pymongo import MongoClient
# from flask_cors import CORS
import datetime
import requests
from werkzeug.utils import secure_filename
import os
import face_recognition
import numpy as np


app = Flask(__name__)
# CORS(app)

from config.database import db

cars = db.cars
reports = db.reports
persons = db.persons

def findPlateNumbers():
    regions = ['in']
    with open('latest.png', 'rb') as fp:
        response = requests.post(
            'https://api.platerecognizer.com/v1/plate-reader/',
            data=dict(regions=regions),
            files=dict(upload=fp),
        )
    try:
        results = response.json()['results']
        licensePlates = []
        for result in results:
            licensePlates.append(result['plate'])
        print(licensePlates)
        return licensePlates
    except:
        return []


@app.route('/api/cars', methods=['POST'])
def postCars():
    photograph = request.files['photograph']
    photograph.save(secure_filename('latest.png'))
    plateNumbers = findPlateNumbers()
    os.remove('latest.png')
    for plateNumber in plateNumbers:
        carData = {
            'licensePlateNumber': plateNumber,
            'timestamp': datetime.datetime.now(),
            'latitude': request.form['latitude'],
            'longitude': request.form['longitude'],
        }
        cars.insert_one(carData)
    return {
        'licensePlateNumber': plateNumbers,
        'status': 'success',
        'message': 'Car added successfully'
    }


@app.route('/api/cars/find', methods=['POST'])
def getCars():
    data = cars.find({
        'licensePlateNumber': request.form['licensePlate']
    })
    results = []
    for car in data:
        results.append({
            'licensePlateNumber': car['licensePlateNumber'],
            'latitude': car['latitude'], 
            'longitude': car['longitude'],
            'timestamp': car['timestamp']
        })
    return {
        'status': 'success',
        'data': results
    }

@app.route('/api/data', methods=['POST'])
def postData():
    carData = {
            'licensePlateNumber': request.form['plate'],
            'timestamp': datetime.datetime.now(),
            'latitude': request.form['latitude'],
            'longitude': request.form['longitude'],
        }
    cars.insert_one(carData)
    return {
        'status': 'success',
        'message': 'Car added successfully'
    }

@app.route('/')
def hello_world():
    return 'Hello, World! welcome to Third Eye!'

def findEncodings():
    image = face_recognition.load_image_file("latest.png")
    face_encodings = face_recognition.face_encodings(image, model='cnn')
    results = []
    for face_encoding in face_encodings:
        results.append(face_encoding)
    return results

def findIfPresent(encoding):
    all_persons = persons.find()
    results = []
    for person in all_persons:
        if face_recognition.compare_faces([person['encoding']], encoding, tolerance=0.5)[0]:
            results.append({
                'latitude': person['latitude'],
                'longitude': person['longitude'],
            })
    return results

@app.route('/api/reports', methods=['POST'])
def postReport():
    try:
        photograph = request.files['photograph']
        photograph.save(secure_filename('latest.png'))
        encoding = findEncodings()
        os.remove('latest.png')
        encoding = encoding[0]
        results = findIfPresent(encoding)
        personData = {
            'name': request.form['name'],
            'encoding': encoding.tolist()
        }
        reports.insert_one(personData)
        return {
            'data': results,
            'status': 'success',
            'message': 'Person added successfully'
        }
    except(Exception) as e:
        return {
            'status': 'error',
            'message': str(e)
        }

def findReports(encoding):
    all_reports = reports.find()
    results = []
    for report in all_reports:
        if face_recognition.compare_faces([report['encoding']], encoding)[0]:
            results.append({
                'name': report['name']
            })
    return results

@app.route('/api/persons', methods=['POST'])
def postPerson():
    try:
        photograph = request.files['photograph']
        photograph.save(secure_filename('latest.png'))
        encodings = findEncodings()
        os.remove('latest.png')
        results = []
        for encoding in encodings:
            personData = {
                'encoding': encoding.tolist(),
                'latitude': request.form['latitude'],
                'longitude': request.form['longitude'],
            }
            persons.insert_one(personData)
            results.append(findReports(encoding))
        return {
            'data': results,
            'status': 'success',
            'message': 'Person(s) added successfully'
        }
    except(Exception) as e:
        return {
            'status': 'error',
            'message': str(e)
        }