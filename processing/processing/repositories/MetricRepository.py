from enum import Enum

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.MetricConfig import MetricConfig
from processing.context import Context
from processing.enums import StorageDomain
from processing.metrics.Metric import MetricData
from processing.paths.PathRegistry import PathRegistry


class MetricPath(Enum):
    METRICS = PathRegistry.register(StorageDomain.metrics)


class MetricRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(MetricPath.METRICS.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(MetricPath.METRICS.value)

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        metric: MetricConfig,
        data: MetricData,
    ):
        path_suffix = [
            extraction.index,
            band.index,
            integration.index,
            metric.index,
        ]

        for label_index in data:
            values = data[label_index]

            if isinstance(label_index, tuple):  # pairwise
                path = PathRegistry.build(
                    MetricPath.METRICS.value,
                    *path_suffix,
                    *label_index,
                )
            else:
                path = PathRegistry.build(
                    MetricPath.METRICS.value,
                    *path_suffix,
                    label_index,
                )

            context.storage.write(
                path=path,
                data=values,
            )
