import base64
import os
import logging
import json
import uuid
import subprocess
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS, cross_origin

import google.generativeai as genai
import googlemaps

load_dotenv(".env")

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

app.logger.setLevel(logging.DEBUG)

filemap = {}

genai.configure(api_key=os.environ["GEMINI_KEY"])

subprocess.call(["rm", "uploads/*"])

api_key = os.environ["MAPS_KEY"]

def upload_to_gemini(path, mime_type=None):
    """Uploads the given file to Gemini.

    See https://ai.google.dev/gemini-api/docs/prompting_with_media
    """
    file = genai.upload_file(path, mime_type=mime_type)
    print(f"Uploaded file '{file.display_name}' as: {file.uri}")
    return file


# Create the model
generation_config = {
    "temperature": 2,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 1024,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    # safety_settings = Adjust safety settings
    # See https://ai.google.dev/gemini-api/docs/safety-settings
)


@app.route("/upload_image", methods=["POST"])
@cross_origin()
def upload_image():
    data = json.loads(request.data)["image"]

    # Decode the base64 string
    image_data = base64.b64decode(data)

    # Generate a random filename
    filename = uuid.uuid4().hex + ".jpg"

    print("Saved to " + filename, flush=True)

    # Save the image to a directory
    image_path = os.path.join("uploads", filename)
    with open(image_path, "wb") as f:
        f.write(image_data)

    return filename


@app.route("/gemini", methods=["POST"])
@cross_origin()
def gemini():
    filename = json.loads(request.data)["file"]

    file = upload_to_gemini("uploads/" + filename, "image/jpeg")
    filemap[filename] = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
                    file,
                ],
            },
        ]
    )

    print(filemap, flush=True)

    return "uploaded to gemini"


@app.route("/identify", methods=["POST"])
@cross_origin()
def identify():
    filename = json.loads(request.data)["file"]

    if filename not in filemap:
        print(filemap, flush=True)

        return "An error occured while sending a request to Gemini"

    return (
        filemap[filename]
        .send_message(
            "identify the type of garbage here, only the name, not in a full sentence"
        )
        .text.strip()
    )


@app.route("/recycle", methods=["POST"])
@cross_origin()
def recycle():
    filename = json.loads(request.data)["file"]
    item = json.loads(request.data)["item"]

    if filename not in filemap:
        print(filemap, flush=True)

        return "An error occured while sending a request to Gemini"
    return (
        filemap[filename]
        .send_message(f"Generate a few ways to recycle (or dispose of) {item}")
        .text.strip()
    )


@app.route("/reduce", methods=["POST"])
@cross_origin()
def reduce():
    filename = json.loads(request.data)["file"]
    item = json.loads(request.data)["item"]

    if filename not in filemap:
        print(filemap, flush=True)

        return "An error occured while sending a request to Gemini"
    return (
        filemap[filename]
        .send_message(f"Generate a few ways to reduce the usage of {item}")
        .text.strip()
    )


@app.route("/reuse", methods=["POST"])
@cross_origin()
def reuse():
    filename = json.loads(request.data)["file"]
    item = json.loads(request.data)["item"]

    if filename not in filemap:
        print(filemap, flush=True)

        return "An error occured while sending a request to Gemini"
    return (
        filemap[filename]
        .send_message(f"Generate a few ways to reuse {item}")
        .text.strip()
    )

@app.route("/recenters", methods=["POST"])
@cross_origin()
def recenters():
    stuff = json.loads(request.data)
    latitude = stuff["latitude"]
    longitude = stuff["longitude"]

    markers = search_nearby_recycling_centers(api_key, latitude, longitude)

    return json.dumps(markers, indent=4)

def search_nearby_recycling_centers(api_key, latitude, longitude):
    gmaps = googlemaps.Client(key=api_key)

    try:
        search_results = gmaps.places_nearby(
            location=(latitude, longitude),
            radius=20000,
            keyword="recycling"
        )
        markers = []

        for result in search_results['results']:
            markers.append({
                "coordinate": {
                    "latitude": result['geometry']['location']['lat'],
                    "longitude": result['geometry']['location']['lng']
                },
                "title": result['name'],
                "description": result['vicinity'],
                "place_id": result['place_id']
            })

        return markers

    except Exception as e:
        print("Error:", e, flush=True)
        return []
