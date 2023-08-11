from h5py import Dataset

from processing.config.bands.BandConfig import BandConfig
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class AggregatedReduceable:
    def __init__(
        self,
        extractor: ExtractorConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> None:
        self.extractor = extractor
        self.band = band
        self.integration = integration

        self.path = (
            f"{StoragePath.aggregated.value}"
            f"/{self.band.name}"
            f"/{self.integration.seconds}"
            f"/{self.extractor.index}"
        )

    def read_features_from_storage(self, storage: Storage) -> Dataset:
        return storage.read(self.path)

    def exists_in_storage(self, storage: Storage) -> bool:
        return storage.exists_dataset(self.path)
