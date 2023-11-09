from typing import List, Union

from pandas import Timestamp

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.files.FileConfig import FileConfig
from processing.config.files.FileSheet import FileSheet
from processing.config.labels.LabelConfig import LabelConfig
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.convert_date_to_timestamp import convert_date_to_timestamp
from processing.utils.read_files_durations import read_files_durations


class FileStorage:
    names = StoragePath.files_names.value
    timestamps = StoragePath.files_timestamps.value
    sites = StoragePath.files_sites.value
    labels = StoragePath.files_labels.value
    durations = StoragePath.files_durations.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(FileStorage.names)
        storage.delete(FileStorage.timestamps)
        storage.delete(FileStorage.sites)
        storage.delete(FileStorage.labels)
        storage.delete(FileStorage.durations)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return (
            storage.exists_dataset(FileStorage.names)
            and storage.exists_dataset(FileStorage.timestamps)
            and storage.exists_dataset(FileStorage.sites)
            and storage.exists_dataset(FileStorage.labels)
            and storage.exists_dataset(FileStorage.durations)
        )

    @staticmethod
    def read_from_storage(
        storage: Storage,
        settings: SettingsConfig,
    ) -> List[FileConfig]:
        names_dataset = storage.read(FileStorage.names)
        names = storage.convert_dataset_to_string_list(names_dataset)

        timestamps = storage.read(FileStorage.timestamps)

        sites_dataset = storage.read(FileStorage.sites)
        sites = storage.convert_dataset_to_string_list(sites_dataset)

        labels_dataset = storage.read(FileStorage.labels)

        # INFO: As labels can be empty, this check is needed
        if labels_dataset.shape[1] == 0:
            labels = []
        else:
            labels = list(list(sublist) for sublist in labels_dataset.asstr()[:])

        durations = storage.read(FileStorage.durations)

        files = FileConfig.reconstruct(
            names=names,
            timestamps=timestamps[:],
            sites=sites,
            labels=labels,
            durations=durations[:],
            audio_path=settings.audio_path,
        )

        return files

    @staticmethod
    def write_to_storage(files: List[FileConfig], storage: Storage) -> None:
        (
            names,
            timestamps,
            sites,
            labels,
            durations,
        ) = FileConfig.flatten(files)

        storage.write(
            path=StoragePath.files_names,
            data=names,
        )

        storage.write(
            path=StoragePath.files_timestamps,
            data=timestamps,
            compression=True,
            attributes={"unit": "milliseconds"},
        )

        storage.write(
            path=StoragePath.files_sites,
            data=sites,
        )

        storage.write(
            path=StoragePath.files_labels,
            data=labels,
        )

        storage.write(
            path=StoragePath.files_durations,
            data=durations,
            attributes={"unit": "milliseconds"},
        )

    @staticmethod
    def read_from_config(
        parser: ConfigParser,
        labels: List[LabelConfig],
        settings: SettingsConfig,
    ) -> List[FileConfig]:
        sheet = ExcelSheet.files

        names = parser.get(sheet, FileSheet.name_)

        dates: List[Union[Timestamp, str]] = parser.get(sheet, FileSheet.date)
        timestamps = [convert_date_to_timestamp(d) for d in dates]

        sites = parser.get(sheet, FileSheet.site)

        labels_values = LabelConfig.convert_to_values_by_file(labels)

        durations = read_files_durations(names, settings.audio_path)

        files = FileConfig.reconstruct(
            names=names,
            timestamps=timestamps,
            sites=sites,
            labels=labels_values,
            durations=durations,
            audio_path=settings.audio_path,
        )

        return files
