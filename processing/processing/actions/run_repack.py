import subprocess

from rich import print

from processing.interfaces import IMain
from processing.storage.Storage import Storage


def run_repack(
    storage: Storage,
    callback: IMain,
):
    path_repack = storage.path.replace(".h5", ".repack.h5")

    subprocess.run(
        [
            "h5repack",
            storage.path,
            f"{storage.path.replace('.h5', '.repack.h5')}",
        ]
    )

    print(f":rocket: Storage file repacked to {path_repack}")

    callback(storage)
