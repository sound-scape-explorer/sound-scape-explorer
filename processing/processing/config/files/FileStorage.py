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
        sites = parser.get(sheet, FileSheet.site)

        # file template detection
        # todo: extract this to its own method
        # todo: call this only on sse_fill for now
        prefix = "[[AUTO]]"
        prefix_length = len(prefix)
        print(prefix)
        auto_indices = list(
            reversed([i for i, n in enumerate(names) if str(n).startswith(prefix)])
        )

        print("number of auto indices detected", len(auto_indices))

        if len(auto_indices) > 0:
            import re
            from processing.utils.walk_directory import walk_directory
            from processing.utils.read_audio_path_from_config import (
                read_audio_path_from_config,
            )

            audio_path = read_audio_path_from_config(parser.path)
            set_names = set(names)  # todo: names are already unique
            paths = [p for p in walk_directory(audio_path) if p not in set_names]

            for i in auto_indices:
                rre = re.sub(":([a-zA-Z]+)", r"(?P<\1>[^/]*)", names[i][prefix_length:])
                auto_names = []
                auto_dates = []
                auto_sites = []
                auto_labels = [[] for _label in labels]
                for p in paths:
                    match = re.fullmatch(rre, p)
                    if match is not None:
                        match = {**match.groupdict(), "_": match.group(0)}
                        auto_names.append(p)
                        if "date" in match:
                            d = match["date"]
                            if re.match(r"[0-9]{8}T[0-9]{6}_?[0-9]*", d):
                                auto_dates.append(
                                    d[:4]
                                    + "-"
                                    + d[4:6]
                                    + "-"
                                    + d[6:8]
                                    + " "
                                    + d[9:11]
                                    + ":"
                                    + d[11:13]
                                    + ":"
                                    + d[13:15]
                                )
                            else:
                                auto_dates.append(d)
                        else:
                            auto_dates.append(dates[i])
                        auto_sites.append(sites[i].format(**match))
                        for il, label in enumerate(labels):
                            if type(label.values[i]) == str:
                                auto_labels[il].append(label.values[i].format(**match))
                            else:
                                auto_labels[il].append(label.values[i])

                # splice
                i1 = i + 1
                names = names[:i] + auto_names + names[i1:]
                dates = dates[:i] + auto_dates + dates[i1:]
                sites = sites[:i] + auto_sites + sites[i1:]
                for il, label in enumerate(labels):
                    label.values = (
                        label.values[:i] + auto_labels[il] + label.values[i1:]
                    )
                paths = [p for p in paths if not p in auto_names]

        timestamps = [convert_date_to_timestamp(d) for d in dates]

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

        print(files)
        print(len(files))
        print(
            "\n".join(
                [f"{f.site} {f.duration} {f.labels} {f.timestamp}" for f in files]
            )
        )

        return files
