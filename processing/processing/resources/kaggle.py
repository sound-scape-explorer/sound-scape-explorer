import os

from processing.lib.fs import create_folder


def get_resources_folder():
    return os.path.dirname(os.path.abspath(__file__))


def set_kaggle_cache():
    resources_folder = get_resources_folder()
    kaggle_folder = os.path.join(resources_folder, "kaggle")

    create_folder(kaggle_folder)
    os.environ["KAGGLEHUB_CACHE"] = kaggle_folder
