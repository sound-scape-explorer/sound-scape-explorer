from abc import abstractmethod
from typing import List

from h5py import Dataset

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.storage.Storage import Storage
from processing.volumes.MeanSpreadingVolume import MeanSpreadingVolume
from processing.volumes.MeanStandardDeviationVolume import MeanStandardDeviationVolume
from processing.volumes.SumStandardDeviationVolume import SumStandardDeviationVolume
from processing.volumes.SumVarianceVolume import SumVarianceVolume
from processing.volumes.VolumeName import VolumeName


class Volume:
    def __new__(
        cls,
        name: str,
        band: ConfigBand,
        integration: ConfigIntegration,
        volume_index: int,
        meta_index: int,
        features: List[Dataset],
        labels: List[str],
    ):
        if name == VolumeName.sum_var.value:
            return SumVarianceVolume(
                band=band,
                integration=integration,
                volume_index=volume_index,
                meta_index=meta_index,
                features=features,
                labels=labels,
            )
        elif name == VolumeName.sum_std.value:
            return SumStandardDeviationVolume(
                band=band,
                integration=integration,
                volume_index=volume_index,
                meta_index=meta_index,
                features=features,
                labels=labels,
            )
        elif name == VolumeName.mean_std.value:
            return MeanStandardDeviationVolume(
                band=band,
                integration=integration,
                volume_index=volume_index,
                meta_index=meta_index,
                features=features,
                labels=labels,
            )
        elif name == VolumeName.mean_spreading.value:
            return MeanSpreadingVolume(
                band=band,
                integration=integration,
                volume_index=volume_index,
                meta_index=meta_index,
                features=features,
                labels=labels,
            )
        else:
            cls.fail(name)

    @staticmethod
    def fail(name: str) -> None:
        raise KeyError(f"Unable to find volume name {name}.")

    @staticmethod
    def validate_name(name: str) -> None:
        names = set(name.value for name in VolumeName)

        if name in names:
            return

        Volume.fail(name)

    @abstractmethod
    def calculate(self) -> None:
        pass

    @abstractmethod
    def store(self, storage: Storage) -> None:
        pass
