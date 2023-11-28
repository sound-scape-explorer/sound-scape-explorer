from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_no_mean_distances_matrices import (
    print_no_mean_distances_matrices,
)


def validate_mean_distances_matrix(action):
    def decorator(
        storage: Storage,
        callback: MenuCallback,
    ):
        if not MeanDistancesMatrix.exists_in_storage(storage):
            print_no_mean_distances_matrices()
            invoke_menu(storage, callback)
            return

        return action(storage, callback)

    return decorator
