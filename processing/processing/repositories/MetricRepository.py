from enum import Enum

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.MetricConfig import MetricConfig
from processing.context import Context
from processing.metrics.Metric import MetricData
from processing.paths.path_registry import register_path, build_path


class MetricPath(Enum):
    DATA = register_path("metric", "data")


class MetricRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(MetricPath.DATA.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(MetricPath.DATA.value)

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
                path = build_path(MetricPath.DATA.value, *path_suffix, *label_index)
            else:
                path = build_path(MetricPath.DATA.value, *path_suffix, label_index)

            context.storage.write(
                path=path,
                data=values,
            )
