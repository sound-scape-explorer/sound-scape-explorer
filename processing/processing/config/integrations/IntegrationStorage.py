from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.integrations.IntegrationExcel import IntegrationExcel
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.validate_excel_names import validate_excel_names


class IntegrationStorage:
    names = StoragePath.integrations_names
    seconds = StoragePath.integrations_seconds

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(IntegrationStorage.names)
        storage.delete(IntegrationStorage.seconds)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(
            IntegrationStorage.names
        ) and storage.exists_dataset(IntegrationStorage.seconds)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[IntegrationConfig]:
        names_dataset = storage.read(IntegrationStorage.names)

        names = storage.convert_dataset_to_string_list(names_dataset)
        durations = storage.read(IntegrationStorage.seconds)

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
        storage.write(path=IntegrationStorage.seconds, data=durations)

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[IntegrationConfig]:
        sheet = ExcelSheet.integrations

        names = parser.get(sheet, IntegrationExcel.name_)
        names = validate_excel_names(names)

        durations = parser.get(sheet, IntegrationExcel.duration)

        integrations = IntegrationConfig.reconstruct(
            names=names,
            durations=durations,
        )

        return integrations
