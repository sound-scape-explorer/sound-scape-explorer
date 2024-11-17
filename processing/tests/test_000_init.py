import os

from ._utils import get_inputs

config, storage = get_inputs()


def test_init():
    exists = os.path.exists(storage.path)
    assert exists is True, "storage file should exist"
    assert storage.path.endswith("/tests/storage.h5"), "storage paths should match"
