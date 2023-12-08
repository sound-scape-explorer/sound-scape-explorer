from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_no_computation_umap import print_no_computation_umap


def validate_computation_umap(action):
    def decorator(
        storage: Storage,
        callback: MenuCallback,
    ):
        if not ComputationUmapStorage.exists_in_storage(storage):
            print_no_computation_umap()
            invoke_menu(storage, callback)
            return

        return action(storage, callback)

    return decorator
