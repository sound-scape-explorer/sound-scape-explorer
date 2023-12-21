from typing import List

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class RelativeTracedStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.relative_traced)
        storage.delete(StoragePath.relative_traced_relative_timestamps)

    @staticmethod
    def exists(storage: Storage) -> bool:
        return storage.exists_dataset(
            StoragePath.relative_traced
        ) and storage.exists_dataset(StoragePath.relative_traced_relative_timestamps)

    @staticmethod
    def get_distance_path(
        trajectory: TrajectoryConfig,
        ar: AggregatedReduceable,
    ) -> str:
        return (
            f"{StoragePath.relative_traced.value}"
            f"/{ar.band.name}"
            f"/{ar.integration.seconds}"
            f"/{ar.extractor.index}"
            f"/{trajectory.index}"
        )

    @staticmethod
    def get_timestamp_path(
        trajectory: TrajectoryConfig,
        ar: AggregatedReduceable,
    ) -> str:
        return (
            f"{StoragePath.relative_traced_relative_timestamps.value}"
            f"/{ar.band.name}"
            f"/{ar.integration.seconds}"
            f"/{ar.extractor.index}"
            f"/{trajectory.index}"
        )

    @staticmethod
    def write_distances(
        storage: Storage,
        trajectory: TrajectoryConfig,
        ar: AggregatedReduceable,
        relative_distances: List[float],
        label_property: str,
        label_value: str,
    ) -> None:
        path = RelativeTracedStorage.get_distance_path(
            trajectory=trajectory,
            ar=ar,
        )

        storage.write(
            path=path,
            data=relative_distances,
            compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "trajectory_index": str(trajectory.index),
                "trajectory_name": trajectory.name,
                "label_property": label_property,
                "label_value": label_value,
            },
        )

    @staticmethod
    def write_timestamps(
        storage: Storage,
        trajectory: TrajectoryConfig,
        ar: AggregatedReduceable,
        relative_timestamps: List[List[float]],
    ) -> None:
        path = RelativeTracedStorage.get_timestamp_path(
            trajectory=trajectory,
            ar=ar,
        )

        storage.write(
            path=path,
            data=relative_timestamps,
            compression=True,
            attributes={
                "extractor_index": str(ar.extractor.index),
                "trajectory_index": str(trajectory.index),
            },
        )
