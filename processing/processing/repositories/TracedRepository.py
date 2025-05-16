from enum import Enum
from typing import NamedTuple

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.context import Context
from processing.interfaces import TrajectoryData
from processing.paths.path_registry import register_path, build_path


class TracedPath(Enum):
    PATH = register_path("traced", "path")
    TIMESTAMPS = register_path("traced", "timestamps")


class _Paths(NamedTuple):
    path: str
    timestamps: str


class TracedRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(TracedPath.PATH.value)
        context.storage.delete(TracedPath.TIMESTAMPS.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(TracedPath.PATH.value) and context.storage.exists(
            TracedPath.TIMESTAMPS.value
        )

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

        path = build_path(
            TracedPath.PATH.value,
            *path_suffix,
        )

        timestamps = build_path(TracedPath.TIMESTAMPS.value, *path_suffix)

        return _Paths(
            path=path,
            timestamps=timestamps,
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
        paths = TracedRepository._get_paths(
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
