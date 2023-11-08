from typing import List

from pandas import Timestamp

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.labels.LabelConfig import LabelConfig
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.config.trajectories.TrajectoryExcel import TrajectoryExcel
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.convert_date_to_timestamp import convert_date_to_timestamp
from processing.utils.validate_excel_names import validate_excel_names
from processing.utils.validate_trajectory_labels import validate_trajectory_labels


class TrajectoryStorage:
    names = StoragePath.trajectories_names.value
    starts = StoragePath.trajectories_starts.value
    ends = StoragePath.trajectories_ends.value
    label_properties = StoragePath.trajectories_label_properties.value
    label_values = StoragePath.trajectories_label_values.value
    steps = StoragePath.trajectories_steps.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(TrajectoryStorage.names)
        storage.delete(TrajectoryStorage.starts)
        storage.delete(TrajectoryStorage.ends)
        storage.delete(TrajectoryStorage.label_properties)
        storage.delete(TrajectoryStorage.label_values)
        storage.delete(TrajectoryStorage.steps)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return (
            storage.exists_dataset(TrajectoryStorage.names)
            and storage.exists_dataset(TrajectoryStorage.starts)
            and storage.exists_dataset(TrajectoryStorage.ends)
            and storage.exists_dataset(TrajectoryStorage.label_properties)
            and storage.exists_dataset(TrajectoryStorage.label_values)
            and storage.exists_dataset(TrajectoryStorage.steps)
        )

    @staticmethod
    def read_from_storage(storage: Storage) -> List[TrajectoryConfig]:
        names_dataset = storage.read(TrajectoryStorage.names)
        names = storage.convert_dataset_to_string_list(names_dataset)
        starts = storage.read(TrajectoryStorage.starts)
        ends = storage.read(TrajectoryStorage.ends)
        label_properties_dataset = storage.read(TrajectoryStorage.label_properties)
        label_properties = storage.convert_dataset_to_string_list(
            label_properties_dataset
        )
        label_values_dataset = storage.read(TrajectoryStorage.label_values)
        label_values = storage.convert_dataset_to_string_list(label_values_dataset)
        steps = storage.read(TrajectoryStorage.steps)

        trajectories = TrajectoryConfig.reconstruct(
            names=names,
            starts=starts[:],
            ends=ends[:],
            label_properties=label_properties,
            label_values=label_values,
            steps=steps[:],
        )

        return trajectories

    @staticmethod
    def read_from_config(
        parser: ConfigParser,
        labels: List[LabelConfig],
    ) -> List[TrajectoryConfig]:
        sheet = ExcelSheet.trajectories

        names = parser.get(sheet, TrajectoryExcel.name_)
        names = validate_excel_names(names)

        starts: List[Timestamp] = parser.get(sheet, TrajectoryExcel.start)
        ends: List[Timestamp] = parser.get(sheet, TrajectoryExcel.end)

        starts_timestamps = [convert_date_to_timestamp(start) for start in starts]
        ends_timestamps = [convert_date_to_timestamp(end) for end in ends]

        label_properties = parser.get(sheet, TrajectoryExcel.label_property)
        label_values = parser.get(sheet, TrajectoryExcel.label_value)
        step_names = parser.get(sheet, TrajectoryExcel.step)
        steps = [TrajectoryConfig.step_by_name[sn] for sn in step_names]

        validate_trajectory_labels(names, label_properties, label_values, labels)

        trajectories = TrajectoryConfig.reconstruct(
            names=names,
            starts=starts_timestamps,
            ends=ends_timestamps,
            label_properties=label_properties,
            label_values=label_values,
            steps=steps,
        )

        return trajectories

    @staticmethod
    def write_to_storage(
        trajectories: List[TrajectoryConfig],
        storage: Storage,
    ) -> None:
        (
            names,
            starts,
            ends,
            label_properties,
            label_values,
            steps,
        ) = TrajectoryConfig.flatten(trajectories)

        storage.write(path=TrajectoryStorage.names, data=names)
        storage.write(path=TrajectoryStorage.starts, data=starts)
        storage.write(path=TrajectoryStorage.ends, data=ends)
        storage.write(path=TrajectoryStorage.label_properties, data=label_properties)
        storage.write(path=TrajectoryStorage.label_values, data=label_values)
        storage.write(path=TrajectoryStorage.steps, data=steps)
