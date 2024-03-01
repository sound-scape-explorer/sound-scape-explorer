import numpy as np

from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.config.Config import Config
from processing.config.bands.BandStorage import BandStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.ask_band import ask_band
from processing.utils.ask_integration import ask_integration
from processing.utils.ask_npy_path import ask_npy_path
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.validate_configuration_with_config import (
    validate_configuration_with_config,
)


@validate_configuration_with_config
def export_mdm(
    config: Config,
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Mean distances matrix export started!", "start")

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)

    band = ask_band(bands)
    integration = ask_integration(integrations)

    mdm = MeanDistancesMatrix.read_from_storage(storage, band, integration)
    npy_path = ask_npy_path(config)
    np.save(npy_path, mdm)

    print_action("Mean distances matrix export completed!", "end")
    invoke_menu(storage, callback)
