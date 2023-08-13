from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.digesters.DigesterConfig import DigesterConfig
from processing.config.digesters.DigesterSheet import DigesterSheet
from processing.config.ExcelSheet import ExcelSheet
from processing.storage.Storage import Storage


class DigesterStorage:
    names = "/digesters/names"

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(DigesterStorage.names)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(DigesterStorage.names)

    @staticmethod
    def write_to_storage(volumes: List[DigesterConfig], storage: Storage) -> None:
        names = DigesterConfig.flatten(volumes)

        storage.write(path=DigesterStorage.names, data=names)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[DigesterConfig]:
        names_dataset = storage.read(DigesterStorage.names)
        names = storage.convert_dataset_to_string_list(names_dataset)
        digests = DigesterConfig.reconstruct(names)
        return digests

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[DigesterConfig]:
        sheet = ExcelSheet.digesters
        names = parser.get(sheet, DigesterSheet.name_)
        digests = DigesterConfig.reconstruct(names)
        return digests
