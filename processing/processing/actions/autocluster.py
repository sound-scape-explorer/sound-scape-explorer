from typing import Optional

from rich import print

from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.print_autoclusters import print_autoclusters
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.print_no_mean_distances_matrices import (
    print_no_mean_distances_matrices,
)
from processing.utils.walk_bands_integrations import walk_bands_integrations


def autocluster(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    if not storage.exists_dataset(StoragePath.mean_distances_matrix):
        print_no_mean_distances_matrices()
        if callback is not None:
            callback(storage)
        return

    storage.delete(StoragePath.autoclustered)

    autoclusters = AutoclusterStorage.read_from_storage(storage)

    print_autoclusters(autoclusters)

    if len(autoclusters) == 0:
        if callback is not None:
            callback(storage)
        return

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)

    for band, integration in walk_bands_integrations(bands, integrations):
        for autocluster in autoclusters:
            autocluster.create_instance(band, integration)
            mdm = storage.read(MeanDistancesMatrix.get_path(band, integration))
            autocluster.calculate(mdm[:])
            path = (
                f"{StoragePath.autoclustered.value}"
                f"/{band.name}"
                f"/{integration.seconds}"
                f"/{autocluster.index}"
            )
            storage.write(
                path=path,
                data=autocluster.values,
                compression=True,
            )

    print("[bold green]:rocket: Autoclusters completed![/bold green]")
    if callback is not None:
        callback(storage)
