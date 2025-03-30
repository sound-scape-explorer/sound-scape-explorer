from typing import List

from h5py import Dataset

from processing.new.AggregatedManager import AggregatedPath
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.StorageNew import StorageNew
from processing.new.paths import build_path
from processing.utils.walk_bands_integrations import walk_bands_integrations


# TODO: get rid of me
class AggregatedReducible:
    def __init__(
        self,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> None:
        self.band = band
        self.integration = integration
        self.extractor = extractor

        self._path_suffix = [
            self.band.index,
            self.integration.index,
            self.extractor.index,
        ]

        # data input
        self.path = build_path(
            AggregatedPath.data.value,
            *self._path_suffix,
        )

    # TODO: remove me
    def read_features_from_storage(self, storage: StorageNew) -> Dataset:
        return storage.read(self.path)

    # TODO: remove me
    @staticmethod
    def reconstruct(
        bands: List[BandConfigNew],
        integrations: List[IntegrationConfigNew],
        extractors: List[ExtractorConfigNew],
    ) -> List["AggregatedReducible"]:
        reducibles: List[AggregatedReducible] = []

        for ex in extractors:
            for band, integration in walk_bands_integrations(bands, integrations):
                reducible = AggregatedReducible(
                    extractor=ex,
                    band=band,
                    integration=integration,
                )

                reducibles.append(reducible)

        return reducibles
