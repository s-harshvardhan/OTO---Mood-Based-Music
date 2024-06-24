import soundfile as sf
from transformers import Speech2TextProcessor, Speech2TextForConditionalGeneration
import torch
import logging
from scipy.signal import resample
import numpy as np

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Speech2Text2Transcriber:
    def __init__(self):
        self.model = Speech2TextForConditionalGeneration.from_pretrained("facebook/s2t-small-librispeech-asr")
        self.processor = Speech2TextProcessor.from_pretrained("facebook/s2t-small-librispeech-asr")

    def transcribe(self, audio_file):
        try:
            device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            self.model.to(device)
            logging.debug("Reading audio file")
            speech, sample_rate = sf.read(audio_file)
            logging.debug(f"Audio file read successfully: {len(speech)} samples at {sample_rate} Hz")

            # Resample audio to 16000 Hz
            if sample_rate != 16000:
                logging.debug(f"Resampling audio from {sample_rate} Hz to 16000 Hz")
                num_samples = int(len(speech) * 16000 / sample_rate)
                speech = resample(speech, num_samples)
            if len(speech) < 16000 * 3:  # Ensure the audio is at least 3 seconds long
                padding = 16000 * 3 - len(speech)
                speech = np.pad(speech, (0, padding), 'constant')

            logging.debug("Processing the speech data")
            inputs = self.processor(speech, sampling_rate=16000, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}  # Move inputs to device

            with torch.no_grad():
                logging.debug("Generating transcription")
                generated_ids = self.model.generate(inputs["input_features"], attention_mask=inputs["attention_mask"])

            logging.debug("Decoding the transcription")
            transcription = self.processor.batch_decode(generated_ids, skip_special_tokens=True)
            return transcription
        except Exception as e:
            logging.error(f"An error occurred during transcription: {str(e)}")
            return {"error": str(e)}