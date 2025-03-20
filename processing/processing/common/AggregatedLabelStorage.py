from typing import List

import numpy as np

from processing.common.AggregatedReducible import AggregatedReducible
from processing.common.AutoclusteredStorage import AutoclusteredStorage
from processing.config.labels.LabelConfig import LabelConfig
from processing.config.labels.LabelStorage import LabelStorage
from processing.context import Context
from processing.new.AggregatedManager import AggregatedPath
from processing.new.paths import build_path


# TODO: refactor me
class AggregatedLabelStorage:
    @staticmethod
    def read_from_storage(
        context: Context,
        reducible: AggregatedReducible,
    ) -> List[LabelConfig]:
        storage = context.storage
        band = reducible.band
        integration = reducible.integration
        extractor = reducible.extractor

        aggregated_labels: List[LabelConfig] = []

        # Fetching autoclustered values first
        autoclusters = context.config.autoclusters
        autoclustereds = AutoclusteredStorage.read_from_storage(
            context=context,
            autoclusters=autoclusters,
            band=band,
            integration=integration,
        )

        for autoclustered in autoclustereds:
            aggregated_labels.append(autoclustered)

        # Fetching aggregated labels (interval labels after walking timeline intervals)
        files_labels = LabelStorage.read_from_storage(context)
        properties = [fl.property for fl in files_labels]

        path_suffix = [band.index, integration.index, extractor.index]

        path = build_path(AggregatedPath.labels.value, *path_suffix)

        aggregated_values: list[list[str]] = storage.read(path, as_strings=True)
        aggregated_values_np = np.array(aggregated_values)

        for index, values in enumerate(aggregated_values_np.T):
            property_ = properties[index]
            aggregated_label = LabelConfig(
                index=index + len(autoclustereds),
                property_=property_,
            )
            aggregated_label.load_values(values)
            aggregated_labels.append(aggregated_label)

        return aggregated_labels
