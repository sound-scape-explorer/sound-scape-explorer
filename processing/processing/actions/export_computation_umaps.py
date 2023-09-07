from typing import Optional
import numpy as np

from h5py import Dataset, Group
from processing.common.YamlEnv import YamlEnv
from processing.config.bands.BandStorage import BandStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.ask_band import ask_band
from processing.utils.ask_integration import ask_integration
from processing.utils.ask_npy_path import ask_npy_path
from processing.utils.print_action import print_action
from processing.utils.print_no_mean_distances_matrices import print_no_mean_distances_matrices


def export_computation_umaps(
    env: YamlEnv,
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not storage.exists_dataset(StoragePath.mean_distances_matrix):
        print_no_mean_distances_matrices()
        if callback is not None:
            callback(storage)
        return

    print_action("Computation UMAPs export started!", "start")

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)

    band = ask_band(bands)
    integration = ask_integration(integrations)

    group_path = f"{StoragePath.computation_umap.value}/{band.name}/{integration.seconds}"
    group: Group = storage.read(group_path) # type: ignore

    datasets = []
    length = group.__len__()

    for i in range(length):
        dataset: Dataset = group.get(f"{i}") # type: ignore
        datasets.append(np.array(dataset[:]))

    datasets_np = np.array(datasets)

    npy_path = ask_npy_path(env)
    np.save(npy_path, datasets_np)

    print_action("Computation UMAPs export completed!", "end")

    if callback is not None:
        callback(storage)
