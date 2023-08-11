from typing import List

from processing.config.bands.BandConfig import BandConfig
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.storage.AggregatedReduceable import AggregatedReduceable
from processing.storage.Storage import Storage


class AggregatedReduceableStorage:
    @staticmethod
    def read_from_storage(
        storage: Storage,
        bands: List[BandConfig],
        integrations: List[IntegrationConfig],
    ) -> List[AggregatedReduceable]:
        extractors = ExtractorStorage.read_from_storage(storage)

        picked_extractors: List[ExtractorConfig] = []
        for extractor in extractors:
            # Bad hardcoding
            if extractor.name != "vgg":
                continue

            picked_extractors.append(extractor)

        aggregated_reduceables: List[AggregatedReduceable] = []

        for pe in picked_extractors:
            for band in bands:
                for integration in integrations:
                    aggregated_reduceable = AggregatedReduceable(
                        extractor=pe,
                        band=band,
                        integration=integration,
                    )

                    aggregated_reduceables.append(aggregated_reduceable)

        return aggregated_reduceables
