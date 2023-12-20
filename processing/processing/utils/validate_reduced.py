from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_no_reduced import print_no_reduced


def validate_reduced(action):
    """The reduced data validator."""

    def decorator(
        storage: Storage,
        callback: MenuCallback,
    ):
        if not storage.exists_dataset(StoragePath.reduced):
            print_no_reduced()
            invoke_menu(storage, callback)
            return

        action(storage, callback)

    return decorator
