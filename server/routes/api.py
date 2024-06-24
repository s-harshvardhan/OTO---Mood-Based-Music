from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS, cross_origin
import base64
import numpy as np
from models.mistralai import MistralAI
from models.deepface import DeepFaceModel
from models.speech2text import Speech2Text2Transcriber
from models.musicgen import MusicGen
import cv2
from pydub import AudioSegment
import io
import logging

logging.basicConfig(level=logging.DEBUG)


# Define your blueprints
api = Blueprint('api', __name__)
CORS(api, origins=["http://localhost:3000"], supports_credentials=True)

@api.route('/generate_text', methods=['POST'])
@cross_origin()
def generate_text():
    text = request.json.get('text')
    print("generate_text server: ", text)
    mistralai_model = MistralAI()
    response = mistralai_model.generate_text(text)
    return jsonify({"response": response}), 200

@api.route('/analyze_face', methods=['POST'])
@cross_origin()
def analyze_face():
    data = request.get_json()
    base64_image = data['image'].split(',')[1]
    decoded_image = base64.b64decode(base64_image)
    nparr = np.frombuffer(decoded_image, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    model = DeepFaceModel()
    response = model.process_frame(frame)

    return jsonify({"response": response}), 200

@api.route('/transcribe_speech', methods=['POST'])
@cross_origin()
def transcribe_speech():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file in request"}), 400

    audio_file = request.files['audio']
    logging.debug(f"Received audio file: {audio_file.filename}")

    try:
        logging.debug("Converting webm to wav")
        audio = AudioSegment.from_file(audio_file, format="webm")
        wav_io = io.BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)

        logging.debug("Initializing transcription model")
        s2t2_model = Speech2Text2Transcriber()
        transcription = s2t2_model.transcribe(wav_io)

        if "error" in transcription:
            return jsonify({"error": transcription["error"]}), 500

        logging.debug(f"Transcription successful: {transcription}")
        return jsonify({"transcription": transcription[0]}), 200
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
@api.route('/generate_song', methods=['POST'])
@cross_origin()
def generate_song():
    description = request.json.get('description')
    music_gen = MusicGen()
    response = music_gen.generate_song(description)
    return jsonify({"response": response}), 200

