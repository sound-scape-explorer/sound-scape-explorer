import os

import gdown

from processing.lib.fs import create_folder
from processing.resources.kaggle import get_resources_folder


class BirdNetResource:
    _url = "https://drive.google.com/uc?id=1ixYBPbZK2Fh1niUQzadE2IWTFZlwATa3"
    _parent_folder = os.path.join(get_resources_folder(), "birdnet")
    _filename = "BirdNET-Analyzer-V2.4.zip"

    @staticmethod
    def download():
        create_folder(BirdNetResource._parent_folder)

        target_path = os.path.join(
            BirdNetResource._parent_folder,
            BirdNetResource._filename,
        )

        path = gdown.cached_download(
            BirdNetResource._url,
            target_path,
            postprocess=gdown.extractall,
        )
        return path

    @staticmethod
    def get_path():
        unzipped_path = os.path.join(
            BirdNetResource._parent_folder,
            "V2.4",
            "BirdNET_GLOBAL_6K_V2.4_Model",
        )

        if not os.path.exists(unzipped_path):
            raise FileNotFoundError

        return unzipped_path
