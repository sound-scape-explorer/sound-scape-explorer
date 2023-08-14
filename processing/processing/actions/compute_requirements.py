from typing import List, Optional

from h5py import Dataset, Group
from rich import print
from rich.progress import track

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.common.MeanDistancesMatrix import MeanDistancesMatrix
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.interfaces import IMain
from processing.reducers.UmapReducer import UmapReducer
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.walk_bands_integrations import walk_bands_integrations


def compute_requirements(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    # TODO: Add check for aggregated data
    storage.delete(StoragePath.computation_umap)
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

    print()
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

            path = (
                f"{StoragePath.computation_umap.value}"
                f"/{ar.band.name}"
                f"/{ar.integration.seconds}"
                f"/{computation_index}"
            )

            storage.write(
                path=path,
                data=computation_features,
                compression=True,
            )

    print()
    print("Computing mean distances matrix...")

    for band, integration in walk_bands_integrations(bands, integrations):
        path = (
            f"{StoragePath.computation_umap.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
        )

        group: Group = storage.read(path)  # type: ignore

        datasets: List[Dataset] = []
        for dataset in group.values():
            datasets.append(dataset)

        mdm = MeanDistancesMatrix.calculate(features=datasets)
        path = MeanDistancesMatrix.get_path(band, integration)

        storage.write(
            path=path,
            data=mdm,
            compression=True,
        )

    print()
    print("[bold green]:rocket: Computation requirements completed![/bold green]")
    if callback is not None:
        callback(storage)
