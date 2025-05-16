from enum import Enum

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.context import Context
from processing.enums import StorageDomain
from processing.paths.path_registry import register_path, build_path


_domain = StorageDomain.relative_trajectories


class RelativeTrajectoryPath(Enum):
    DATA = register_path(_domain, "data")
    TIMESTAMPS = register_path(_domain, "timestamps")
    DECILES = register_path(_domain, "deciles")


class RelativeTrajectoryRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(RelativeTrajectoryPath.DATA.value)
        context.storage.delete(RelativeTrajectoryPath.TIMESTAMPS.value)
        context.storage.delete(RelativeTrajectoryPath.DECILES.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(RelativeTrajectoryPath.DATA.value)
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

        distances_path = build_path(RelativeTrajectoryPath.DATA.value, *path_suffix)
        context.storage.write(
            path=distances_path,
            data=np.stack([distance_medians]),
            attributes={
                "trajectory_name": trajectory.name,
                "tag_name": tag_name,
                "tag_value": tag_value,
            },
        )

        timestamps_path = build_path(
            RelativeTrajectoryPath.TIMESTAMPS.value, *path_suffix
        )
        context.storage.write(
            path=timestamps_path,
            data=np.stack(timestamp_medians),
        )

        deciles_path = build_path(RelativeTrajectoryPath.DECILES.value, *path_suffix)
        deciles_data = np.column_stack([lower_deciles, upper_deciles])

        context.storage.write(
            path=deciles_path,
            data=deciles_data,
        )
