from processing.config.Config import Config
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action


def refresh_configuration(
    config: Config,
    storage: Storage,
    callback: MenuCallback = None,
):
    print_action("Configuration refresh started!", "start")

    config = Config(path=config.path)
    config.write(storage)

    print_action("Configuration refresh completed!", "end")
    invoke_menu(storage, callback)
