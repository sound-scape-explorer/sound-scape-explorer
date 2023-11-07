from typing import List

import numpy as np

from processing.common.AutoclusteredStorage import AutoclusteredStorage
from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandConfig import BandConfig
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.files.FileStorage import FileStorage
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.labels.LabelConfig import LabelConfig
from processing.config.labels.LabelStorage import LabelStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class AggregatedLabelStorage:
    @staticmethod
    def read_from_storage(
        storage: Storage,
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: ExtractorConfig,
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
            f"/{extractor.index}"
        )

        aggregated_values = storage.read(path)

        # INFO: As labels can be empty, this check is needed
        if aggregated_values.shape[1] == 0:
            aggregated_values_strings = []
        else:
            aggregated_values_strings = aggregated_values.asstr()

        aggregated_values_np = np.array(aggregated_values_strings)

        for index, values in enumerate(aggregated_values_np.T):
            property_ = properties[index]
            aggregated_label = LabelConfig(
                index=index + len(autoclustereds),
                property=property_,
            )
            aggregated_label.load_values(values)
            aggregated_labels.append(aggregated_label)

        return aggregated_labels
