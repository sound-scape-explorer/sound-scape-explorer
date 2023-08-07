from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.IntegrationExcel import IntegrationExcel
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class IntegrationStorage:
    names = StoragePath.integrations_names
    milliseconds = StoragePath.integrations_milliseconds

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(IntegrationStorage.names)
        storage.delete(IntegrationStorage.milliseconds)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[IntegrationConfig]:
        names_dataset = storage.read(IntegrationStorage.names)

        names = storage.convert_dataset_to_string_list(names_dataset)
        durations = storage.read(IntegrationStorage.milliseconds)

        integrations = IntegrationConfig.reconstruct(
            names=names,
            durations=durations[:],
        )

        return integrations

    @staticmethod
    def write_to_storage(
        integrations: List[IntegrationConfig],
        storage: Storage,
    ) -> None:
        names, durations = IntegrationConfig.flatten(integrations)
        storage.write(path=IntegrationStorage.names, data=names)
        storage.write(path=IntegrationStorage.milliseconds, data=durations)

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[IntegrationConfig]:
        sheet = ExcelSheet.integrations

        names = parser.parse_column(sheet, IntegrationExcel.name_)
        durations = parser.parse_column(sheet, IntegrationExcel.duration)

        integrations = IntegrationConfig.reconstruct(
            names=names,
            durations=durations,
        )

        return integrations
