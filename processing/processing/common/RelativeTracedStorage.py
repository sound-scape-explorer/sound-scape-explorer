from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


# TODO: remove me
class RelativeTracedStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.relative_traced)
        storage.delete(StoragePath.relative_traced_relative_timestamps)
        storage.delete(StoragePath.relative_traced_deciles)

    @staticmethod
    def exists(storage: Storage) -> bool:
        return (
            storage.exists_dataset(StoragePath.relative_traced)
            and storage.exists_dataset(StoragePath.relative_traced_relative_timestamps)
            and storage.exists_dataset(StoragePath.relative_traced_deciles)
        )
