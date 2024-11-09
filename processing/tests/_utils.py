import os
import sys

from processing.config.Config import Config
from processing.storage.Storage import Storage


def get_inputs():
    venv = sys.prefix
    relative_path = "../examples/tests/config.xlsx"

    config_path = os.path.join(venv, relative_path)
    config = Config(config_path)
    storage_path = config.settings.storage_path

    if os.path.exists(storage_path):
        os.remove(storage_path)

    storage = Storage(storage_path)

    return config, storage
