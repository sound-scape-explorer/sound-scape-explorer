from typing import List

from h5py import Dataset

from processing.config.bands.BandConfig import BandConfig
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.walk_bands_integrations import walk_bands_integrations


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

    def read_timestamps_from_storage(self, storage: Storage) -> Dataset:
        path = self.get_timestamps_path()
        return storage.read(path)

    def read_labels_from_storage(self, storage: Storage) -> Dataset:
        path = self.get_labels_path()
        return storage.read(path)

    def read_reduced_from_storage(
        self,
        storage: Storage,
        reducer: ReducerConfig,
    ) -> Dataset:
        path = self.get_reduced_path(reducer)
        return storage.read(path)

    def exists_in_storage(self, storage: Storage) -> bool:
        return storage.exists_dataset(self.path)

    def get_timestamps_path(self) -> str:
        return (
            f"{StoragePath.aggregated_timestamps.value}"
            f"/{self.band.name}"
            f"/{self.integration.seconds}"
            f"/{self.extractor.index}"
        )

    def get_labels_path(self) -> str:
        return (
            f"{StoragePath.aggregated_labels.value}"
            f"/{self.band.name}"
            f"/{self.integration.seconds}"
            f"/{self.extractor.index}"
        )

    def get_reduced_path(self, reducer: ReducerConfig) -> str:
        return (
            f"{StoragePath.reduced.value}"
            f"/{self.band.name}"
            f"/{self.integration.seconds}"
            f"/{self.extractor.index}"
            f"/{reducer.index}"
        )

    @staticmethod
    def reconstruct(
        bands: List[BandConfig],
        integrations: List[IntegrationConfig],
        nn_extractors: List[ExtractorConfig],
    ) -> List["AggregatedReduceable"]:
        aggregated_reduceables: List[AggregatedReduceable] = []

        for nn_ex in nn_extractors:
            for band, integration in walk_bands_integrations(bands, integrations):
                aggregated_reduceable = AggregatedReduceable(
                    extractor=nn_ex,
                    band=band,
                    integration=integration,
                )

                aggregated_reduceables.append(aggregated_reduceable)

        return aggregated_reduceables
