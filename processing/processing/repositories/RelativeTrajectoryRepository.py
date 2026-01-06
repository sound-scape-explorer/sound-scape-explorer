from enum import Enum

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.context import Context
from processing.enums import StorageDomain, RelativeTrajectoryStoragePath
from processing.interfaces import TrajectoryStatistics
from processing.paths.PathRegistry import PathRegistry


_domain = StorageDomain.relative_trajectories
_paths = RelativeTrajectoryStoragePath


class RelativeTrajectoryPath(Enum):
    DISTANCES = PathRegistry.register(_domain, _paths.distances)
    TIMESTAMPS = PathRegistry.register(_domain, _paths.timestamps)
    DECILES = PathRegistry.register(_domain, _paths.deciles)


class RelativeTrajectoryRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(RelativeTrajectoryPath.DISTANCES.value)
        context.storage.delete(RelativeTrajectoryPath.TIMESTAMPS.value)
        context.storage.delete(RelativeTrajectoryPath.DECILES.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(RelativeTrajectoryPath.DISTANCES.value)
            and context.storage.exists(RelativeTrajectoryPath.TIMESTAMPS.value)
            and context.storage.exists(RelativeTrajectoryPath.DECILES.value)
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
        statistics: TrajectoryStatistics,
    ):
        path_suffix = [
            extraction.index,
            band.index,
            integration.index,
            reducer.index,
            trajectory.index,
        ]

        distances_path = PathRegistry.build(
            RelativeTrajectoryPath.DISTANCES.value,
            *path_suffix,
        )

        context.storage.write(
            path=distances_path,
            data=statistics.median_distances,
        )

        timestamps_path = PathRegistry.build(
            RelativeTrajectoryPath.TIMESTAMPS.value,
            *path_suffix,
        )

        context.storage.write(
            path=timestamps_path,
            data=statistics.median_timestamps,
        )

        deciles_path = PathRegistry.build(
            RelativeTrajectoryPath.DECILES.value,
            *path_suffix,
        )

        deciles_data = np.column_stack(
            [
                statistics.lower_deciles,
                statistics.upper_deciles,
            ]
        )

        context.storage.write(
            path=deciles_path,
            data=deciles_data,
        )
