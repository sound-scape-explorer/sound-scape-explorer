from processing.common.AutoclusteredStorage import AutoclusteredStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_no_autoclustered import print_no_autoclustered


def validate_autoclustered(action):
    """The autoclusters generated data validator."""

    def decorator(
        storage: Storage,
        callback: MenuCallback,
    ):
        if not AutoclusteredStorage.exists(storage):
            print_no_autoclustered()
            invoke_menu(storage, callback)
            return

        action(storage, callback)

    return decorator
