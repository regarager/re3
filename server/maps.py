import os
import googlemaps
import json
from dotenv import load_dotenv

load_dotenv(".env")

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
                "description": result['vicinity']
            })

        return markers

    except Exception as e:
        print("Error:", e)
        return []

# Replace with your API key and desired coordinates
latitude = 37.78825
longitude = -122.4324

markers = search_nearby_recycling_centers(api_key, latitude, longitude)

# Print or use the markers as needed
print(json.dumps(markers, indent=4))
