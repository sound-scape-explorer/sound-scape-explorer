from typing import List

from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig
from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.labels.LabelConfig import LabelConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class AutoclusteredStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.autoclustered)

    @staticmethod
    def exists(storage: Storage) -> bool:
        return storage.exists_dataset(StoragePath.autoclustered)

    @staticmethod
    def read_from_storage(
        storage: Storage,
        autoclusters: List[AutoclusterConfig],
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> List[LabelConfig]:
        autoclustereds: List[LabelConfig] = []

        for index, autocluster in enumerate(autoclusters):
            autoclustered = LabelConfig(index, autocluster.name)

            path = (
                f"{StoragePath.autoclustered.value}"
                f"/{band.name}"
                f"/{integration.seconds}"
                f"/{autocluster.index}"
            )

            values = storage.read(path)

            autoclustered.load_values(values[:])

            autoclustereds.append(autoclustered)

        return autoclustereds

    @staticmethod
    def get_path(
        band: BandConfig,
        integration: IntegrationConfig,
        ac: AutoclusterConfig,
    ) -> str:
        return (
            f"{StoragePath.autoclustered.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{ac.index}"
        )

    @staticmethod
    def write(
        storage: Storage,
        band: BandConfig,
        integration: IntegrationConfig,
        ac: AutoclusterConfig,
    ) -> None:
        path = AutoclusteredStorage.get_path(band, integration, ac)

        attributes = {
            "min_cluster_size": ac.min_cluster_size,
            "min_samples": ac.min_samples,
            "alpha": ac.alpha,
            "epsilon": ac.epsilon,
            "name": ac.name,
            "index": ac.index,
        }

        storage.write(
            path=path,
            data=ac.values,
            compression=True,
            attributes=attributes,
        )
