from typing import List

from pandas import Timestamp

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.config.trajectories.TrajectoryExcel import TrajectoryExcel
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.convert_date_to_timestamp import convert_date_to_timestamp


class TrajectoryStorage:
    names = StoragePath.trajectories_names.value
    starts = StoragePath.trajectories_starts.value
    ends = StoragePath.trajectories_ends.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(TrajectoryStorage.names)
        storage.delete(TrajectoryStorage.starts)
        storage.delete(TrajectoryStorage.ends)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[TrajectoryConfig]:
        names_dataset = storage.read(TrajectoryStorage.names)

        names = storage.convert_dataset_to_string_list(names_dataset)
        starts = storage.read(TrajectoryStorage.starts)
        ends = storage.read(TrajectoryStorage.ends)

        trajectories = TrajectoryConfig.reconstruct(
            names=names,
            starts=starts[:],
            ends=ends[:],
        )

        return trajectories

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[TrajectoryConfig]:
        sheet = ExcelSheet.trajectories

        names = parser.get(sheet, TrajectoryExcel.name_)
        starts: List[Timestamp] = parser.get(sheet, TrajectoryExcel.start)
        ends: List[Timestamp] = parser.get(sheet, TrajectoryExcel.end)

        starts_timestamps = [convert_date_to_timestamp(start) for start in starts]
        ends_timestamps = [convert_date_to_timestamp(end) for end in ends]

        trajectories = TrajectoryConfig.reconstruct(
            names=names,
            starts=starts_timestamps,
            ends=ends_timestamps,
        )

        return trajectories

    @staticmethod
    def write_to_storage(
        trajectories: List[TrajectoryConfig],
        storage: Storage,
    ) -> None:
        names, starts, ends = TrajectoryConfig.flatten(trajectories)

        storage.write(path=StoragePath.trajectories_names, data=names)
        storage.write(path=StoragePath.trajectories_starts, data=starts)
        storage.write(path=StoragePath.trajectories_ends, data=ends)
