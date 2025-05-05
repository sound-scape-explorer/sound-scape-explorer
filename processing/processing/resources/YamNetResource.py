import os

from processing.resources.KaggleResource import KaggleResource
from processing.resources.kaggle import get_resources_folder


class YamNetResource:
    handle = "google/yamnet/tensorFlow2/yamnet"
    _parent_folder = os.path.join(
        get_resources_folder(),
        os.sep.join(
            [
                "kaggle",
                "models",
                "google",
                "yamnet",
            ]
        ),
    )

    @staticmethod
    def download():
        import kagglehub

        path = kagglehub.model_download(YamNetResource.handle)
        return path

    @staticmethod
    def get_path():
        return KaggleResource.find_path_from_parent(YamNetResource._parent_folder)
