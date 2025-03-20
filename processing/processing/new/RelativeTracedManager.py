from enum import Enum

import numpy as np

from processing.common.AggregatedReducible import AggregatedReducible
from processing.context import Context
from processing.new.TrajectoryConfigNew import TrajectoryConfigNew
from processing.new.paths import register_path, build_path


class RelativeTracedPath(Enum):
    data = register_path("relative_traced", "data")
    timestamps = register_path("relative_traced", "timestamps")
    deciles = register_path("relative_traced", "deciles")


class RelativeTracedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(RelativeTracedPath.data.value)
        context.storage.delete(RelativeTracedPath.timestamps.value)
        context.storage.delete(RelativeTracedPath.deciles.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(RelativeTracedPath.data.value)
            and context.storage.exists(RelativeTracedPath.timestamps.value)
            and context.storage.exists(RelativeTracedPath.deciles.value)
        )

    @staticmethod
    def to_storage(
        context: Context,
        trajectory: TrajectoryConfigNew,
        reducible: AggregatedReducible,
        label_property: str,
        label_value: str,
        distance_medians: list[float],
        timestamp_medians: list[list[float]],
        lower_deciles: list[float],
        upper_deciles: list[float],
    ):
        path_suffix = [
            reducible.band.index,
            reducible.integration.index,
            reducible.extractor.index,
            trajectory.index,
        ]

        distances_path = build_path(RelativeTracedPath.data.value, *path_suffix)
        context.storage.write(
            path=distances_path,
            data=[distance_medians],
            attributes={
                "extractor_index": str(reducible.extractor.index),
                "trajectory_index": str(trajectory.index),
                "trajectory_name": trajectory.name,
                "label_property": label_property,
                "label_value": label_value,
            },
        )

        timestamps_path = build_path(RelativeTracedPath.timestamps.value, *path_suffix)
        context.storage.write(
            path=timestamps_path,
            data=timestamp_medians,
            attributes={
                "extractor_index": str(reducible.extractor.index),
                "trajectory_index": str(trajectory.index),
            },
        )

        deciles_path = build_path(RelativeTracedPath.deciles.value, *path_suffix)
        deciles_data: list[list[float]] = np.column_stack(  # type: ignore
            [
                lower_deciles,
                upper_deciles,
            ]
        )

        context.storage.write(
            path=deciles_path,
            data=deciles_data,
        )
