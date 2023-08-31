import pathlib


def does_path_exist(path: str) -> bool:
    return pathlib.Path(path).exists()
