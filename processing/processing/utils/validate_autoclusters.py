from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_no_autoclusters import print_no_autoclusters


def validate_autoclusters(action):
    """The autoclusters configuration objects validator."""

    def decorator(
        storage: Storage,
        callback: MenuCallback,
    ):
        autoclusters = AutoclusterStorage.read_from_storage(storage)

        if len(autoclusters) == 0:
            print_no_autoclusters()
            invoke_menu(storage, callback)
            return

        action(storage, callback)

    return decorator
