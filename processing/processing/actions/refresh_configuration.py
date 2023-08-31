from typing import Optional

from processing.common.YamlEnv import YamlEnv
from processing.config.Config import Config
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.print_action import print_action
from processing.utils.print_digesters import print_digesters
from processing.utils.print_extractors import print_extractors


def refresh_configuration(
    env: YamlEnv,
    storage: Storage,
    callback: Optional[IMain] = None,
):
    print_action("Configuration refresh started!", "start")

    config = Config(path=env.config)
    config.write(storage)

    print_extractors(config.extractors)
    print_digesters(config.digesters)

    print_action("Configuration refresh completed!", "end")

    if callback is not None:
        callback(storage)
