from typing import Optional

from processing.common.YamlEnv import YamlEnv
from processing.config.Config import Config
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.print_digesters import print_digesters
from processing.utils.print_extractors import print_extractors
from processing.utils.print_file_indexes_by_site import print_file_indexes_by_site
from processing.utils.print_refresh_configuration_end import (
    print_refresh_configuration_end,
)
from processing.utils.print_refresh_configuration_start import (
    print_refresh_configuration_start,
)


def refresh_configuration(
    env: YamlEnv,
    storage: Storage,
    callback: Optional[IMain] = None,
):
    print_refresh_configuration_start()

    config = Config(path=env.config)
    config.write(storage)

    print_file_indexes_by_site(storage, config.settings)
    print_extractors(config.extractors)
    print_digesters(config.digesters)

    print_refresh_configuration_end()

    if callback is not None:
        callback(storage)
