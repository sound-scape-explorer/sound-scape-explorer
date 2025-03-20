from typing import List

from h5py import Dataset

from processing.new.AggregatedManager import AggregatedPath
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.ReducedPath import ReducedPath
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.new.StorageNew import StorageNew
from processing.new.paths import build_path
from processing.utils.walk_bands_integrations import walk_bands_integrations


# TODO: refactor me
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

    def read_features_from_storage(self, storage: StorageNew) -> Dataset:
        return storage.read(self.path)

    # TODO: refactor me
    def read_timestamps_from_storage(self, storage: StorageNew) -> Dataset:
        path = self.get_timestamps_path()
        return storage.read(path)

    # TODO: refactor me
    def read_labels_from_storage(self, storage: StorageNew) -> Dataset:
        path = self.get_labels_path()
        return storage.read(path, as_strings=True)

    # TODO: refactor me
    def read_reduced_from_storage(
        self,
        storage: StorageNew,
        reducer: ReducerConfigNew,
    ) -> Dataset:
        path = self.get_reduced_path(reducer)
        return storage.read(path)

    def exists_in_storage(self, storage: StorageNew) -> bool:
        return storage.exists(self.path)

    def get_timestamps_path(self) -> str:
        return build_path(
            AggregatedPath.timestamps.value,
            *self._path_suffix,
        )

    def get_labels_path(self) -> str:
        return build_path(
            AggregatedPath.labels.value,
            *self._path_suffix,
        )

    # TODO: refactor me
    def get_reduced_path(self, reducer: ReducerConfigNew) -> str:
        return build_path(
            ReducedPath.reduced.value,
            *self._path_suffix,
            reducer.index,
        )

    # TODO: refactor me
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
