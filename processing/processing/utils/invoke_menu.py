from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage


def invoke_menu(
    storage: Storage,
    callback: MenuCallback,
) -> None:
    if callback is None:
        return

    callback(storage)
