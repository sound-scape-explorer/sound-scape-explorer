from typing import List

from h5py import Dataset, Group

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class ComputationUmapStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.computation_umap)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(StoragePath.computation_umap)

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

    @staticmethod
    def read_from_storage(
        storage: Storage,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> List[Dataset]:
        path = (
            f"{StoragePath.computation_umap.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
        )

        group: Group = storage.read(path)  # type: ignore

        datasets: List[Dataset] = []

        for dataset in group.values():
            datasets.append(dataset)

        return datasets
