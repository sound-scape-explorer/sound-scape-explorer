from typing import List

from processing.common.AggregatedReducible import AggregatedReducible
from processing.config.bands.BandStorage import BandStorage
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.storage.Storage import Storage
from processing.utils.filter_nn_extractors import filter_nn_extractors


def build_aggregated_reduceables(
    storage: Storage,
) -> List[AggregatedReducible]:
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    extractors = ExtractorStorage.read_from_storage(storage)
    nn_extractors = filter_nn_extractors(extractors)

    aggregated_reduceables = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        extractors=nn_extractors,
    )

    return aggregated_reduceables
