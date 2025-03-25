import os


def get_file_full_path(filename: str, audio_folder: str):
    relative_path = filename[1:] if filename.startswith(os.path.sep) else filename
    full_path = os.path.join(audio_folder, relative_path)
    return full_path
