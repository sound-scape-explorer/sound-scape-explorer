from typing import Optional

from rich import print

from processing.common.YamlEnv import YamlEnv
from processing.config.Config import Config
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.print_extractors import print_extractors
from processing.utils.print_file_indexes_by_site import print_file_indexes_by_site


def refresh_configuration(
    env: YamlEnv,
    storage: Storage,
    callback: Optional[IMain] = None,
):
    config = Config(path=env.config)
    config.write(storage)

    print_file_indexes_by_site(storage, config.settings)
    print_extractors(storage)

    print("[bold green]:rocket: Configuration refresh completed![/bold green]")

    if callback is not None:
        callback(storage)
