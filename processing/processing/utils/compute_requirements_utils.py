from enum import Enum
from typing import List

from rich import print
from rich.progress import track

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.storage.Storage import Storage


class ComputeStrategy(Enum):
    default = "default"
    embeddings = "embeddings"
    pca = "pca"


def get_compute_strategy(settings: SettingsConfig) -> ComputeStrategy:
    if settings.computation_umap_dimensions == 0:
        return ComputeStrategy.embeddings

    if settings.computation_umap_dimensions < 0:
        return ComputeStrategy.pca

    return ComputeStrategy.default


def compute_default(
    storage: Storage,
    ars: List[AggregatedReduceable],
    settings: SettingsConfig,
) -> None:
    print(
        f"Computing UMAPs..."
        f" (iterations: {settings.computation_umap_iterations},"
        f" dimensions: {settings.computation_umap_dimensions})"
    )

    for ar in ars:
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


def compute_embeddings(
    storage: Storage,
    ars: List[AggregatedReduceable],
) -> None:
    print("Using primary embeddings...")

    for ar in ars:
        features = ar.read_features_from_storage(storage)

        ComputationUmapStorage.write(
            storage=storage,
            ar=ar,
            data=features[:],
            index=0,
        )


def compute_pca(
    storage: Storage,
    ars: List[AggregatedReduceable],
    settings: SettingsConfig,
):
    sanitized_dimensions = settings.computation_umap_dimensions * -1

    print(
        f"Computing PCAs..."
        f" (iterations: {settings.computation_umap_iterations},"
        f" dimensions: {sanitized_dimensions})"
    )

    for ar in ars:
        features = ar.read_features_from_storage(storage)

        for computation_index in track(
            range(settings.computation_umap_iterations),
            description=f"Band {ar.band.name}, integration {ar.integration.seconds}",
        ):
            pca = PcaReducer()
            pca.load(
                dimensions=sanitized_dimensions,
                seed=None,
                features=features,
            )

            computation_features = pca.calculate()

            ComputationUmapStorage.write(
                storage=storage,
                ar=ar,
                data=computation_features,
                index=computation_index,
            )
