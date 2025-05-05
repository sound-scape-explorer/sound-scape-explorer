from enum import Enum

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.context import Context
from processing.paths.path_registry import register_path, build_path


class RelativeTracedPath(Enum):
    DATA = register_path("relative_traced", "data")
    TIMESTAMPS = register_path("relative_traced", "timestamps")
    DECILES = register_path("relative_traced", "deciles")


class RelativeTracedRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(RelativeTracedPath.DATA.value)
        context.storage.delete(RelativeTracedPath.TIMESTAMPS.value)
        context.storage.delete(RelativeTracedPath.DECILES.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(RelativeTracedPath.DATA.value)
            and context.storage.exists(RelativeTracedPath.TIMESTAMPS.value)
            and context.storage.exists(RelativeTracedPath.DECILES.value)
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
        tag_name: str,
        tag_value: str,
        distance_medians: list[float],
        timestamp_medians: list[list[float]],
        lower_deciles: list[float],
        upper_deciles: list[float],
    ):
        path_suffix = [
            extraction.index,
            band.index,
            integration.index,
            reducer.index,
            trajectory.index,
        ]

        distances_path = build_path(RelativeTracedPath.DATA.value, *path_suffix)
        context.storage.write(
            path=distances_path,
            data=np.stack([distance_medians]),
            attributes={
                "trajectory_name": trajectory.name,
                "tag_name": tag_name,
                "tag_value": tag_value,
            },
        )

        timestamps_path = build_path(RelativeTracedPath.TIMESTAMPS.value, *path_suffix)
        context.storage.write(
            path=timestamps_path,
            data=np.stack(timestamp_medians),
        )

        deciles_path = build_path(RelativeTracedPath.DECILES.value, *path_suffix)
        deciles_data = np.column_stack([lower_deciles, upper_deciles])

        context.storage.write(
            path=deciles_path,
            data=deciles_data,
        )
