from processing.config.Config import Config
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.get_file_type import get_file_type
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action


def refresh_configuration(
    config: Config,
    storage: Storage,
    callback: MenuCallback = None,
):
    print_action("Configuration refresh started!", "start")

    file_type = get_file_type(config.path)
    if file_type == "JSON":
        # TODO: Make storage refreshable from JSON config
        print_action("Configuration refresh skipped!", "end")
        invoke_menu(storage, callback)
        return

    config = Config(path=config.path)
    config.write(storage)

    print_action("Configuration refresh completed!", "end")
    invoke_menu(storage, callback)
