import numpy as np
from h5py import Dataset, Group

from processing.config.Config import Config
from processing.config.bands.BandStorage import BandStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.ask_band import ask_band
from processing.utils.ask_integration import ask_integration
from processing.utils.ask_npy_path import ask_npy_path
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.validate_mean_distances_matrix_with_config import (
    validate_mean_distances_matrix_with_config,
)


@validate_mean_distances_matrix_with_config
def export_computation_umaps(
    config: Config,
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Computation UMAPs export started!", "start")

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)

    band = ask_band(bands)
    integration = ask_integration(integrations)

    group_path = (
        f"{StoragePath.computation_umap.value}/{band.name}/{integration.seconds}"
    )
    group: Group = storage.read(group_path)  # type: ignore

    datasets = []
    length = group.__len__()

    for i in range(length):
        dataset: Dataset = group.get(f"{i}")  # type: ignore
        datasets.append(np.array(dataset[:]))

    datasets_np = np.array(datasets)

    npy_path = ask_npy_path(config)
    np.save(npy_path, datasets_np)

    print_action("Computation UMAPs export completed!", "end")
    invoke_menu(storage, callback)
