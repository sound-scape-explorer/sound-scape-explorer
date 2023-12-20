from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class TracedStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.traced)
        storage.delete(StoragePath.traced_timestamps)
        storage.delete(StoragePath.traced_relative_timestamps)

    @staticmethod
    def exists(storage: Storage) -> bool:
        return (
            storage.exists_dataset(StoragePath.traced)
            and storage.exists_dataset(StoragePath.traced_timestamps)
            and storage.exists_dataset(StoragePath.traced_relative_timestamps)
        )

    @staticmethod
    def get_data_path(
        ar: AggregatedReduceable,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
    ) -> str:
        return (
            f"{StoragePath.traced.value}"
            f"/{ar.band.name}"
            f"/{ar.integration.seconds}"
            f"/{ar.extractor.index}"
            f"/{reducer.index}"
            f"/{trajectory.index}"
        )

    @staticmethod
    def write_data(
        storage: Storage,
        trajectory: TrajectoryConfig,
        reducer: ReducerConfig,
        ar: AggregatedReduceable,
    ) -> None:
        path = TracedStorage.get_data_path(ar, reducer, trajectory)

        storage.write(
            path=path,
            data=trajectory.instance.values,
            compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "reducer_index": str(reducer.index),
                "trajectory_index": str(trajectory.index),
            },
        )

    @staticmethod
    def get_timestamps_path(
        ar: AggregatedReduceable,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
    ) -> str:
        return (
            f"{StoragePath.traced_timestamps.value}"
            f"/{ar.band.name}"
            f"/{ar.integration.seconds}"
            f"/{ar.extractor.index}"
            f"/{reducer.index}"
            f"/{trajectory.index}"
        )

    @staticmethod
    def get_relative_timestamps_path(
        ar: AggregatedReduceable,
        reducer: ReducerConfig,
        trajectory: TrajectoryConfig,
    ) -> str:
        return (
            f"{StoragePath.traced_relative_timestamps.value}"
            f"/{ar.band.name}"
            f"/{ar.integration.seconds}"
            f"/{ar.extractor.index}"
            f"/{reducer.index}"
            f"/{trajectory.index}"
        )

    @staticmethod
    def write_timestamps(
        storage: Storage,
        trajectory: TrajectoryConfig,
        reducer: ReducerConfig,
        ar: AggregatedReduceable,
    ) -> None:
        path = TracedStorage.get_timestamps_path(ar, reducer, trajectory)

        storage.write(
            path=path,
            data=trajectory.instance.timestamps,
            compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "reducer_index": str(reducer.index),
                "trajectory_index": str(trajectory.index),
            },
        )

    @staticmethod
    def write_relative_timestamps(
        storage: Storage,
        trajectory: TrajectoryConfig,
        reducer: ReducerConfig,
        ar: AggregatedReduceable,
    ) -> None:
        path = TracedStorage.get_relative_timestamps_path(ar, reducer, trajectory)

        storage.write(
            path=path,
            data=trajectory.instance.relative_timestamps,
            compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "reducer_index": str(reducer.index),
                "trajectory_index": str(trajectory.index),
            },
        )
