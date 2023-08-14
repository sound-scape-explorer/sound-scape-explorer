import subprocess

from rich import print

from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.ask_for_repack_replacement import ask_for_repack_replacement
from processing.utils.print_repack_end import print_repack_end
from processing.utils.print_repack_start import print_repack_start


def repack_storage(
    storage: Storage,
    callback: IMain,
):
    print_repack_start()

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

    print_repack_end()

    if answer is True:
        path_old = storage.path
        subprocess.run(["rm", path_old])
        subprocess.run(["mv", path_repack, path_old])

        storage_repacked = Storage(path_old)
        callback(storage_repacked)
    else:
        storage.load()
        callback(storage)
