from rich import print
from rich.progress import track

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.config.bands.BandStorage import BandStorage
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.interfaces import MenuCallback
from processing.reducers.UmapReducer import UmapReducer
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
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
    storage.delete(StoragePath.mean_distances_matrix)

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

    print(
        f"Computing UMAPs..."
        f" (iterations: {settings.computation_umap_iterations},"
        f" dimensions: {settings.computation_umap_dimensions})"
    )

    for ar in aggregated_reduceables:
        features = ar.read_features_from_storage(storage)
        for computation_index in track(
            range(settings.computation_umap_iterations),
            description=f"Band {ar.band.name}, integration {ar.integration.seconds}",
        ):
            umap = UmapReducer(min_dist=0)
            umap.load(
                dimensions=settings.computation_umap_dimensions,
                seed=None,
                features=features,
            )

            computation_features = umap.calculate()

            ComputationUmapStorage.write(
                storage=storage,
                ar=ar,
                data=computation_features,
                index=computation_index,
            )

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
