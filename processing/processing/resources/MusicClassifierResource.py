import os

import requests

from processing.lib.fs import create_folder
from processing.resources.kaggle import get_resources_folder


class MusicClassifierResource:
    _url = "https://github.com/crlandsc/Music-Genre-Classification-Using-Convolutional-Neural-Networks/raw/refs/heads/main/models/model_cnn3.h5"
    _parent_folder = os.path.join(
        get_resources_folder(),
        "music_classifier",
    )
    _filename = "model_cnn3.h5"

    @staticmethod
    def download():
        create_folder(MusicClassifierResource._parent_folder)

        target_path = os.path.join(
            MusicClassifierResource._parent_folder,
            MusicClassifierResource._filename,
        )

        response = requests.get(MusicClassifierResource._url, stream=True)
        response.raise_for_status()

        with open(target_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    file.write(chunk)

        return target_path

    @staticmethod
    def get_path():
        path = os.path.join(
            MusicClassifierResource._parent_folder,
            MusicClassifierResource._filename,
        )

        if not os.path.exists(path):
            raise FileNotFoundError

        return path
