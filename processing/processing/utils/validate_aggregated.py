from processing.common.AggregatedStorage import AggregatedStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_no_aggregated import print_no_aggregated


def validate_aggregated(action):
    """The aggregated data validator."""

    def decorator(
        storage: Storage,
        callback: MenuCallback,
    ):
        if not AggregatedStorage.exists(storage):
            print_no_aggregated()
            invoke_menu(storage, callback)
            return

        action(storage, callback)

    return decorator
