import os

from processing.resources.KaggleResource import KaggleResource
from processing.resources.kaggle import get_resources_folder


class PerchResource:
    handle = (
        "google/bird-vocalization-classifier/tensorFlow2/bird-vocalization-classifier"
    )
    _parent_folder = os.path.join(
        get_resources_folder(),
        os.sep.join(
            [
                "kaggle",
                "models",
                "google",
                "bird-vocalization-classifier",
            ]
        ),
    )

    @staticmethod
    def download():
        import kagglehub

        path = kagglehub.model_download(PerchResource.handle)
        return path

    @staticmethod
    def get_path():
        return KaggleResource.find_path_from_parent(PerchResource._parent_folder)
