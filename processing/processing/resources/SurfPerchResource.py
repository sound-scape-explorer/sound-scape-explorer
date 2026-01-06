import os

from processing.resources.KaggleResource import KaggleResource
from processing.resources.kaggle import get_resources_folder


class SurfPerchResource:
    handle = "google/surfperch/tensorFlow2/1"
    _parent_folder = os.path.join(
        get_resources_folder(),
        os.sep.join(
            [
                "kaggle",
                "models",
                "google",
                "surfperch",
            ]
        ),
    )

    @staticmethod
    def download():
        import kagglehub

        path = kagglehub.model_download(SurfPerchResource.handle)
        return path

    @staticmethod
    def get_path():
        return KaggleResource.find_path_from_parent(SurfPerchResource._parent_folder)
