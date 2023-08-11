from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.pairings.PairingConfig import PairingConfig
from processing.config.pairings.PairingSheet import PairingSheet
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class PairingStorage:
    names = StoragePath.pairings_names.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(PairingStorage.names)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(PairingStorage.names)

    @staticmethod
    def write_to_storage(matrices: List[PairingConfig], storage: Storage) -> None:
        names = PairingConfig.flatten(matrices)

        storage.write(path=PairingStorage.names, data=names)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[PairingConfig]:
        names_dataset = storage.read(StoragePath.volumes_names)
        names = storage.convert_dataset_to_string_list(names_dataset)
        matrices = PairingConfig.reconstruct(names)
        return matrices

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[PairingConfig]:
        sheet = ExcelSheet.pairings
        names = parser.get(sheet, PairingSheet.name_)
        matrices = PairingConfig.reconstruct(names)
        return matrices
