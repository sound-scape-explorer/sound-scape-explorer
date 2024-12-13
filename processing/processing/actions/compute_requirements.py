from rich import print

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.config.bands.BandStorage import BandStorage
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.compute_requirements_utils import (
    ComputeStrategy,
    get_compute_strategy,
    compute_default,
    compute_embeddings,
    compute_pca,
)
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_autoclusters import validate_autoclusters
from processing.utils.validate_configuration import validate_configuration
from processing.utils.walk_bands_integrations import walk_bands_integrations


@validate_configuration
@validate_autoclusters  # skipping computing if no autoclusters are requested
@validate_aggregated
def compute_requirements(
    storage: Storage,
    callback: MenuCallback,
):
    # TODO: Add check for aggregated data

    print_action("Requirements computation started!", "start")

    ComputationUmapStorage.delete(storage)

    settings = SettingsStorage.read_from_storage(storage)
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    extractors = ExtractorStorage.read_from_storage(storage)
    nn_extractors = filter_nn_extractors(extractors)
    aggregated_reduceables = AggregatedReduceable.reconstruct(
        bands=bands,
        integrations=integrations,
        nn_extractors=nn_extractors,
    )

    strategy = get_compute_strategy(settings)

    if strategy == ComputeStrategy.default:
        compute_default(
            storage=storage,
            ars=aggregated_reduceables,
            settings=settings,
        )
    elif strategy == ComputeStrategy.embeddings:
        compute_embeddings(
            storage=storage,
            ars=aggregated_reduceables,
        )
    elif strategy == ComputeStrategy.pca:
        compute_pca(
            storage=storage,
            ars=aggregated_reduceables,
            settings=settings,
        )

    storage.delete(StoragePath.mean_distances_matrix)
    print()
    print("Computing mean distances matrix...")

    for band, integration in walk_bands_integrations(bands, integrations):
        computation_umaps = ComputationUmapStorage.read_from_storage(
            storage=storage,
            band=band,
            integration=integration,
        )

        mdm = MeanDistancesMatrix.calculate(features=computation_umaps)
        path = MeanDistancesMatrix.get_path(band, integration)

        storage.write(
            path=path,
            data=mdm,
            compression=True,
        )

    print_action("Requirements computation completed!", "end")
    invoke_menu(storage, callback)
