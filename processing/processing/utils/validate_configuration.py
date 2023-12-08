from processing.config.Config import Config
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_no_configuration import print_no_configuration


def validate_configuration(action):
    def decorator(
        storage: Storage,
        callback: MenuCallback = None,
    ):
        if not Config.exists_in_storage(storage):
            print_no_configuration()
            invoke_menu(storage, callback)
            return

        return action(storage, callback)

    return decorator
