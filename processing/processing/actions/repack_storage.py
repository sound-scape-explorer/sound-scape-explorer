import subprocess

from rich import print

from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.ask_for_repack_replacement import ask_for_repack_replacement
from processing.utils.print_action import print_action


def repack_storage(
    storage: Storage,
    callback: IMain,
):
    print_action("Repacking started!", "start")

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

    print(f"Repacked storage path: {path_repack}")

    answer = ask_for_repack_replacement()

    print_action("Repacking completed!", "end")

    if answer is True:
        path_old = storage.path
        subprocess.run(["rm", path_old])
        subprocess.run(["mv", path_repack, path_old])

        storage_repacked = Storage(path_old)
        callback(storage_repacked)
    else:
        storage.load()
        callback(storage)