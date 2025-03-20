from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.files.FileSheet import FileSheet
from processing.config.labels.LabelConfig import LabelConfig
from processing.context import Context
from processing.new.LabelManager import LabelManager
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

    # TODO: refactor me
    @staticmethod
    def read_from_storage(context: Context) -> List[LabelConfig]:
        files = context.config.files
        properties = LabelManager.get_properties(context)

        labels: List[LabelConfig] = []

        for index, property_ in enumerate(properties):
            label: LabelConfig = LabelConfig(index, property_)
            values = [file.labels[property_] for file in files]
            label.load_values(values)
            labels.append(label)

        return labels

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[LabelConfig]:
        sheet = parser.parse(ExcelSheet.files)

        labels: List[LabelConfig] = []

        index = 0
        for column in sheet:
            if not LabelConfig.is_label_property(column):
                continue

            property_ = LabelConfig.trim_prefixed_property_from_config(column)
            label: LabelConfig = LabelConfig(index=index, property_=property_)

            values = parser.get(
                ExcelSheet.files,
                FileSheet.label_prefix,
                suffix=label.property,
            )

            label.load_values(values)
            labels.append(label)
            index += 1

        return labels

    @staticmethod
    def write_to_storage(labels: List[LabelConfig], storage: Storage) -> None:
        if len(labels) == 0:
            properties = []
            sets_rectangular = []
        else:
            properties, sets = LabelConfig.flatten(labels)
            sets_rectangular = storage.make_rectangular(sets, "")

        storage.write(path=LabelStorage.properties, data=properties)
        storage.write(path=LabelStorage.sets, data=sets_rectangular)
