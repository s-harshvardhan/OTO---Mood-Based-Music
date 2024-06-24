import requests
import json

class MusicGen:
    def __init__(self):
        self.api_url = 'http://localhost:8080/generate'
        self.headers = {"Content-Type": "application/json"}

    def generate_song(self, description):
        # Create a dictionary with the song description
        data = {"description": description}

        # Convert the dictionary to a JSON string
        json_data = json.dumps(data)

        # Send the POST request
        response = requests.post(self.api_url, data=json_data, headers=self.headers)

        # Handle the response
        if response.status_code == 200:
            print("Request was successful.")
            # Save the song file
            with open('song.wav', 'wb') as f:
                f.write(response.content)
            print("Song saved as 'song.wav'.")
        else:
            print(f"Request failed with status code {response.status_code}.")
            return None