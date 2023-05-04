from typing import List

from h5py import Dataset

from processing.volumes.MeanSpreadingVolume import MeanSpreadingVolume
from processing.volumes.MeanStandardDeviationVolume import MeanStandardDeviationVolume
from processing.volumes.SumStandardDeviationVolume import SumStandardDeviationVolume
from processing.volumes.SumVarianceVolume import SumVarianceVolume
from processing.volumes.VolumeName import VolumeName


class Volume:
    def __new__(
        cls,
        name: str,
        band: str,
        integration: int,
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
        raise KeyError(f"Volume {name} not found!")

    @staticmethod
    def validate_name(name: str) -> None:
        names = set(name.value for name in VolumeName)

        if name in names:
            return

        Volume.fail(name)
