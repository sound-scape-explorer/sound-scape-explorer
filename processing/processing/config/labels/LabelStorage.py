from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.files.FileExcel import FileExcel
from processing.config.labels.LabelConfig import LabelConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class LabelStorage:
    properties = StoragePath.labels_properties.value
    sets = StoragePath.labels_sets.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(LabelStorage.properties)
        storage.delete(LabelStorage.sets)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(
            LabelStorage.properties
        ) and storage.exists_dataset(LabelStorage.sets)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[LabelConfig]:
        pass

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[LabelConfig]:
        sheet = parser.parse(ExcelSheet.files)

        labels: List[LabelConfig] = []

        index = 0
        for column in sheet:
            if not LabelConfig.is_meta_property(column):
                continue

            label: LabelConfig = LabelConfig(index=index, string=column)

            values = parser.get(
                ExcelSheet.files,
                FileExcel.label_prefix,
                suffix=label.property,
            )

            label.load_values(values)
            labels.append(label)
            index += 1

        return labels

    @staticmethod
    def write_to_storage(labels: List[LabelConfig], storage: Storage) -> None:
        properties, sets = LabelConfig.flatten(labels)

        storage.write(path=LabelStorage.properties, data=properties)
        sets_rectangular = storage.make_rectangular(sets, "")
        storage.write(path=LabelStorage.sets, data=sets_rectangular)
