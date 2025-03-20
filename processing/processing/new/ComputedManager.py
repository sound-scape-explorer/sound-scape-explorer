from enum import Enum
from typing import Optional

from h5py import Group, Dataset

from processing.context import Context
from processing.new.BandConfigNew import BandConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.paths import register_path, build_path


class ComputedPath(Enum):
    computed = register_path("computed")


class ComputedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ComputedPath.computed.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(ComputedPath.computed.value)

    @staticmethod
    def _get_path(
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        iteration: Optional[int] = None,
    ):
        if iteration is None:
            return build_path(
                ComputedPath.computed.value,
                band.index,
                integration.index,
            )

        return build_path(
            ComputedPath.computed.value,
            band.index,
            integration.index,
            iteration,
        )

    @staticmethod
    def to_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        iteration: int,
        data: list[list[float]],
    ):
        path = ComputedManager._get_path(band, integration, iteration)

        context.storage.write(
            path=path,
            data=data,
        )

    @staticmethod
    def from_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
    ):
        """Read all iterations from storage"""

        group_path = ComputedManager._get_path(band, integration)
        group: Group = context.storage.read(group_path)

        datasets: list[Dataset] = []

        for i in range(len(group) - 1):
            path = ComputedManager._get_path(band, integration, i)
            dataset: Dataset = context.storage.read(path)
            datasets.append(dataset)

        return datasets
