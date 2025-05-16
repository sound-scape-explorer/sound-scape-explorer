from enum import Enum
from typing import NamedTuple

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.context import Context
from processing.enums import StorageDomain, TrajectoryStoragePath
from processing.interfaces import TrajectoryData
from processing.paths.PathRegistry import PathRegistry


_domain = StorageDomain.trajectories
_paths = TrajectoryStoragePath


class TrajectoryPath(Enum):
    PATH = PathRegistry.register(_domain, _paths.path)
    TIMESTAMPS = PathRegistry.register(_domain, _paths.timestamps)


class _Paths(NamedTuple):
    path: str
    timestamps: str


class TrajectoryRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(TrajectoryPath.PATH.value)
        context.storage.delete(TrajectoryPath.TIMESTAMPS.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(
            TrajectoryPath.PATH.value
        ) and context.storage.exists(TrajectoryPath.TIMESTAMPS.value)

    @staticmethod
    def _get_paths(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
    ):

        path_suffix = [
            extraction.index,
            band.index,
            integration.index,
            reducer.index,
            trajectory.index,
        ]

        return _Paths(
            path=PathRegistry.build(
                TrajectoryPath.PATH.value,
                *path_suffix,
            ),
            timestamps=PathRegistry.build(
                TrajectoryPath.TIMESTAMPS.value,
                *path_suffix,
            ),
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
        data: TrajectoryData,
    ):
        paths = TrajectoryRepository._get_paths(
            extraction,
            band,
            integration,
            reducer,
            trajectory,
        )

        context.storage.write(
            path=paths.path,
            data=data.path,
        )

        context.storage.write(
            path=paths.timestamps,
            data=data.timestamps,
        )
