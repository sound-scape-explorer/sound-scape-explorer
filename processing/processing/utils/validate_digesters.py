from processing.config.digesters.DigesterStorage import DigesterStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu


def validate_digesters(action):
    """The digesters configuration objects validator."""

    def decorator(
        storage: Storage,
        callback: MenuCallback,
    ):
        digesters = DigesterStorage.read_from_storage(storage)

        if len(digesters) == 0:
            invoke_menu(storage, callback)
            return

        return action(storage, callback)

    return decorator
