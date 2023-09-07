import numpy as np
from typing import Optional
from processing.common.YamlEnv import YamlEnv
from processing.config.Config import Config
from processing.config.bands.BandStorage import BandStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.ask_band import ask_band
from processing.utils.ask_integration import ask_integration
from processing.utils.ask_npy_path import ask_npy_path
from processing.utils.print_action import print_action
from processing.utils.print_no_configuration import print_no_configuration


def export_mdm(
    env: YamlEnv,
    storage: Storage,
    callback: Optional[IMain] = None,
    ):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    print_action("Mean distances matrix export started", "start")

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)

    band = ask_band(bands)
    integration = ask_integration(integrations)

    path = f"{StoragePath.mean_distances_matrix.value}/{band.name}/{integration.seconds}"
    mdm = storage.read(path)

    matrix = np.array(mdm)
    npy_path = ask_npy_path(env)
    np.save(npy_path, matrix)

    print_action("Mean distances matrix export completed!", "end")

    if callback is not None:
        callback(storage)
