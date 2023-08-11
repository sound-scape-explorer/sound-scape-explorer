from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.volumes.VolumeConfig import VolumeConfig
from processing.config.volumes.VolumeSheet import VolumeSheet
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class VolumeStorage:
    names = StoragePath.volumes_names.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(VolumeStorage.names)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(VolumeStorage.names)

    @staticmethod
    def write_to_storage(volumes: List[VolumeConfig], storage: Storage) -> None:
        names = VolumeConfig.flatten(volumes)

        storage.write(path=VolumeStorage.names, data=names)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[VolumeConfig]:
        names_dataset = storage.read(StoragePath.volumes_names)
        names = storage.convert_dataset_to_string_list(names_dataset)
        volumes = VolumeConfig.reconstruct(names)
        return volumes

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[VolumeConfig]:
        sheet = ExcelSheet.volumes
        names = parser.get(sheet, VolumeSheet.name_)
        volumes = VolumeConfig.reconstruct(names)
        return volumes
