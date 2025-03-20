from enum import Enum

from processing.common.AggregatedReducible import AggregatedReducible
from processing.context import Context
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.new.TrajectoryConfigNew import TrajectoryConfigNew
from processing.new.paths import register_path, build_path


class TracedPath(Enum):
    data = register_path("traced", "data")
    timestamps = register_path("traced", "timestamps")
    relative_timestamps = register_path("traced", "relative_timestamps")


class TracedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(TracedPath.data.value)
        context.storage.delete(TracedPath.timestamps.value)
        context.storage.delete(TracedPath.relative_timestamps.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(TracedPath.data.value)
            and context.storage.exists(TracedPath.timestamps.value)
            and context.storage.exists(TracedPath.relative_timestamps.value)
        )

    @staticmethod
    def to_storage(
        context: Context,
        trajectory: TrajectoryConfigNew,
        reducer: ReducerConfigNew,
        ar: AggregatedReducible,
    ):
        path_suffix = [
            ar.band.index,
            ar.integration.index,
            ar.extractor.index,
            reducer.index,
            trajectory.index,
        ]

        # data
        data_path = build_path(
            TracedPath.data.value,
            *path_suffix,
        )

        context.storage.write(
            path=data_path,
            data=trajectory.instance.values,
            # compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "reducer_index": str(reducer.index),
                "trajectory_index": str(trajectory.index),
            },
        )

        # timestamps
        timestamps_path = build_path(TracedPath.timestamps.value, *path_suffix)

        context.storage.write(
            path=timestamps_path,
            data=[trajectory.instance.timestamps],
            # compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "reducer_index": str(reducer.index),
                "trajectory_index": str(trajectory.index),
            },
        )

        # relative timestamps
        relative_timestamps_path = build_path(
            TracedPath.relative_timestamps.value,
            *path_suffix,
        )

        context.storage.write(
            path=relative_timestamps_path,
            data=trajectory.instance.relative_timestamps,
            # compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "reducer_index": str(reducer.index),
                "trajectory_index": str(trajectory.index),
            },
        )
