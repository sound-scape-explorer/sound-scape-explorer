from processing.config.ConfigParser import ConfigParser
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class BinaryStorage:
    config_file = StoragePath.config_file.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(BinaryStorage.config_file)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(BinaryStorage.config_file)

    @staticmethod
    def read_from_storage(storage: Storage) -> None:
        pass

    @staticmethod
    def read_from_config(parser: ConfigParser) -> None:
        pass

    @staticmethod
    def write_to_storage(path: str, storage: Storage) -> None:
        with open(path, "rb") as f:
            binary_data = f.read()

            storage.write_binary(
                path=BinaryStorage.config_file,
                binary_data=binary_data,
            )
