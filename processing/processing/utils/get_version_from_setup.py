import importlib.metadata


def get_version_from_setup() -> str:
    return importlib.metadata.version("sound-scape-explorer")
