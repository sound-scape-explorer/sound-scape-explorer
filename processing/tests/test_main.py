import os
import sys

from processing.actions.refresh_configuration import refresh_configuration
from processing.config.Config import Config
from processing.storage.Storage import Storage

venv = sys.prefix
relative_path = "../examples/tests/config.xlsx"

config_path = os.path.join(venv, relative_path)
config = Config(config_path)
storage_path = config.settings.storage_path

if os.path.exists(storage_path):
    os.remove(storage_path)

storage = Storage(storage_path)


def test_refresh_configuration():
    refresh_configuration(config, storage)
    exists = os.path.exists(storage_path)
    assert exists is True, "storage file should exist"
    assert storage_path.endswith("/tests/storage.h5"), "storage paths should match"
