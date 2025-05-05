import os


def create_folder(path: str):
    if os.path.exists(path):
        return

    os.makedirs(path)
