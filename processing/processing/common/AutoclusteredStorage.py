from typing import List

from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig
from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.labels.LabelConfig import LabelConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class AutoclusteredStorage:
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
