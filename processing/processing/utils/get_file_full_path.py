import os


def get_file_full_path(filename: str, audio_folder: str):
    relative_path = filename

    # TODO: Will drop the '/' filename start convention later
    if filename.startswith(os.path.sep) or filename.startswith("/"):
        relative_path = filename[1:]

    full_path = os.path.join(audio_folder, relative_path)
    return full_path
