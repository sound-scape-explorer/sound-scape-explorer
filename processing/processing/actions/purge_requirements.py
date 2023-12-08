from rich.progress import track

from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action


def purge_requirements(
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Requirements computation purge started!", "start")

    for _ in track(range(1)):
        storage.delete(StoragePath.computation_umap)
        storage.delete(StoragePath.mean_distances_matrix)

    print_action("Requirements computation purge completed!", "end")
    invoke_menu(storage, callback)
