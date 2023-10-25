from typing import Optional

from processing.config.Config import Config
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.print_action import print_action


def refresh_configuration(
    config: Config,
    storage: Storage,
    callback: Optional[IMain] = None,
):
    print_action("Configuration refresh started!", "start")

    config = Config(path=config.path)
    config.write(storage)

    print_action("Configuration refresh completed!", "end")

    if callback is not None:
        callback(storage)
