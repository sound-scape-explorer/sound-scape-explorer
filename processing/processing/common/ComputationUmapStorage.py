from typing import List

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class ComputationUmapStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.computation_umap)

    @staticmethod
    def get_path(
        ar: AggregatedReduceable,
        index: int,  # Computation Index
    ) -> str:
        return (
            f"{StoragePath.computation_umap.value}"
            f"/{ar.band.name}"
            f"/{ar.integration.seconds}"
            f"/{index}"
        )

    @staticmethod
    def write(
        storage: Storage,
        ar: AggregatedReduceable,
        data: List[List[float]],
        index: int,
    ):
        path = ComputationUmapStorage.get_path(
            ar=ar,
            index=index,
        )

        storage.write(
            path=path,
            data=data,
            compression=True,
        )
