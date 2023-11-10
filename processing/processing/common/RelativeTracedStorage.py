from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class RelativeTracedStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.relative_traced)
