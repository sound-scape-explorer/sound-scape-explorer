from processing.common.AutoclusteredStorage import AutoclusteredStorage
from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandStorage import BandStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.print_autoclusters import print_autoclusters
from processing.utils.validate_autoclusters import validate_autoclusters
from processing.utils.validate_configuration import (
    validate_configuration,
)
from processing.utils.validate_mean_distances_matrix import (
    validate_mean_distances_matrix,
)
from processing.utils.walk_bands_integrations import walk_bands_integrations


@validate_configuration
@validate_mean_distances_matrix
@validate_autoclusters
def autocluster(
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Autoclustering started!", "start")

    AutoclusteredStorage.delete(storage)

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    autoclusters = AutoclusterStorage.read_from_storage(storage)
    print_autoclusters(autoclusters)

    for band, integration in walk_bands_integrations(bands, integrations):
        for ac in autoclusters:
            ac.create_instance(band, integration)
            mdm = storage.read(MeanDistancesMatrix.get_path(band, integration))
            ac.calculate(mdm[:])

            path = (
                f"{StoragePath.autoclustered.value}"
                f"/{band.name}"
                f"/{integration.seconds}"
                f"/{ac.index}"
            )

            attributes = {
                "min_cluster_size": ac.min_cluster_size,
                "min_samples": ac.min_samples,
                "alpha": ac.alpha,
                "epsilon": ac.epsilon,
                "name": ac.name,
                "index": ac.index,
            }

            storage.write(
                path=path,
                data=ac.values,
                compression=True,
                attributes=attributes,
            )

    print_action("Autoclustering completed!", "end")
    invoke_menu(storage, callback)
