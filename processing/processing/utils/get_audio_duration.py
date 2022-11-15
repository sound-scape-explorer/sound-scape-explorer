import torchaudio


# Return in seconds
def get_audio_duration(audio_path):
    wav_data, sr = torchaudio.load(audio_path)
    return wav_data.shape[1] / sr
