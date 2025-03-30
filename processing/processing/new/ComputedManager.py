from enum import Enum

from h5py import Dataset

from processing.context import Context
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
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
        extractor: ExtractorConfigNew,
        iteration: int,
    ):
        return build_path(
            ComputedPath.computed.value,
            band.index,
            integration.index,
            extractor.index,
            iteration,
        )

    @staticmethod
    def to_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        iteration: int,
        data: list[list[float]],
    ):
        path = ComputedManager._get_path(band, integration, extractor, iteration)
        print("path", path)

        context.storage.write(
            path=path,
            data=data,
        )

    @staticmethod
    def from_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ):
        datasets: list[Dataset] = []

        for iteration in range(context.config.settings.computation_iterations):
            path = ComputedManager._get_path(band, integration, extractor, iteration)
            dataset = context.storage.read(path)
            datasets.append(dataset)

        return datasets
