from typing import List

import numpy as np

from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandConfig import BandConfig
from processing.config.files.FileStorage import FileStorage
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.labels.LabelConfig import LabelConfig
from processing.config.labels.LabelStorage import LabelStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.storage.AutoclusteredStorage import AutoclusteredStorage
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class AggregatedLabelStorage:
    @staticmethod
    def read_from_storage(
        storage: Storage,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> List[LabelConfig]:
        aggregated_labels: List[LabelConfig] = []

        # Fetching autoclustered values first
        autoclusters = AutoclusterStorage.read_from_storage(storage)
        autoclustereds = AutoclusteredStorage.read_from_storage(
            storage=storage,
            autoclusters=autoclusters,
            band=band,
            integration=integration,
        )

        for autoclustered in autoclustereds:
            aggregated_labels.append(autoclustered)

        # Fetching aggregated labels (interval labels after walking timeline intervals)
        settings = SettingsStorage.read_from_storage(storage)
        files = FileStorage.read_from_storage(storage, settings)
        files_labels = LabelStorage.read_from_storage(storage, files)
        properties = [fl.property for fl in files_labels]

        path = (
            f"{StoragePath.aggregated_labels.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/0"  # INFO: Hack because we store too much information (extractor)
        )

        aggregated_values = storage.read(path)
        aggregated_values_transposed = np.array(aggregated_values.asstr()).T

        for index, values in enumerate(aggregated_values_transposed):
            property = properties[index]
            aggregated_label = LabelConfig(
                index=index + len(autoclustereds),
                property=property,
            )
            aggregated_label.load_values(values)
            aggregated_labels.append(aggregated_label)

        return aggregated_labels
