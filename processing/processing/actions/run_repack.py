import subprocess

from rich import print

from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.ask_for_repack_replacement import ask_for_repack_replacement


def run_repack(
    storage: Storage,
    callback: IMain,
):
    # Need to close the storage first
    storage.close()

    path_repack = storage.path.replace(".h5", ".repack.h5")

    subprocess.run(
        [
            "h5repack",
            storage.path,
            f"{path_repack}",
        ]
    )

    print(f"Repacked storage location: {path_repack}")
    print("[bold green]:rocket: Storage file repack completed![/bold green]")

    answer = ask_for_repack_replacement()

    if answer is True:
        path_old = storage.path
        subprocess.run(["rm", path_old])
        subprocess.run(["mv", path_repack, path_old])

        storage_repacked = Storage(path_old)
        callback(storage_repacked)
    else:
        storage.load()
        callback(storage)
