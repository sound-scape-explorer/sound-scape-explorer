from typing import List

from h5py import Dataset, Group

from processing.new.BandConfigNew import BandConfigNew
from processing.new.ComputedManager import ComputedPath
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.StorageNew import StorageNew
from processing.new.paths import build_path


# TODO: refactor me
class ComputationUmapStorage:
    @staticmethod
    def read_from_storage(
        storage: StorageNew,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
    ) -> List[Dataset]:
        path = build_path(
            ComputedPath.computed.value,
            band.index,
            integration.index,
        )

        group: Group = storage.read(path)  # type: ignore

        datasets: List[Dataset] = []

        for dataset in group.values():
            datasets.append(dataset)

        return datasets
