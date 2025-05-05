from enum import Enum

import numpy as np

from processing.common.ContinuousTimeTrajectory import ContinuousTimeTrajectory
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.context import Context
from processing.paths.path_registry import register_path, build_path


class TracedPath(Enum):
    DATA = register_path("traced", "data")
    TIMESTAMPS = register_path("traced", "timestamps")
    RELATIVE_TIMESTAMPS = register_path("traced", "relative_timestamps")


class TracedRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(TracedPath.DATA.value)
        context.storage.delete(TracedPath.TIMESTAMPS.value)
        context.storage.delete(TracedPath.RELATIVE_TIMESTAMPS.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(TracedPath.DATA.value)
            and context.storage.exists(TracedPath.TIMESTAMPS.value)
            and context.storage.exists(TracedPath.RELATIVE_TIMESTAMPS.value)
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
        traced: ContinuousTimeTrajectory,
    ):
        path_suffix = [
            extraction.index,
            band.index,
            integration.index,
            reducer.index,
            trajectory.index,
        ]

        attributes = {
            "extraction_index": str(extraction.index),
            "reducer_index": str(reducer.index),
            "trajectory_index": str(trajectory.index),
        }

        # data
        data_path = build_path(
            TracedPath.DATA.value,
            *path_suffix,
        )

        context.storage.write(
            path=data_path,
            data=np.stack(traced.values),
            attributes=attributes,
        )

        # timestamps
        timestamps_path = build_path(TracedPath.TIMESTAMPS.value, *path_suffix)

        context.storage.write(
            path=timestamps_path,
            data=np.stack(traced.timestamps),
            attributes=attributes,
        )

        # relative timestamps
        relative_timestamps_path = build_path(
            TracedPath.RELATIVE_TIMESTAMPS.value,
            *path_suffix,
        )

        context.storage.write(
            path=relative_timestamps_path,
            data=np.stack(traced.relative_timestamps),
            attributes=attributes,
        )
