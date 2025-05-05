from typing import Optional

import numpy as np

from processing.config.MetricConfig import MetricConfig
from processing.constants import MDM_EMPTY
from processing.enums import MetricImplEnum
from processing.metrics.ContingencyMetric import ContingencyMetric
from processing.metrics.MeanDeviationMetric import MeanDeviationMetric
from processing.metrics.MeanSpreadingMetric import MeanSpreadingMetric
from processing.metrics.Metric import Metric
from processing.metrics.OverlapMetric import OverlapMetric
from processing.metrics.SilhouetteMetric import SilhouetteMetric
from processing.common.AggregatedTag import AggregatedTag
from processing.types import Mdm


class MetricFactory:
    @staticmethod
    def create(
        metric: MetricConfig,
        embeddings: np.ndarray,
        tags: list[AggregatedTag],
        mdm: Optional[Mdm] = MDM_EMPTY,
    ) -> Metric:
        if metric.impl is MetricImplEnum.MEAN_STD:
            instance = MeanDeviationMetric(
                embeddings=embeddings,
                tags=tags,
            )
        elif metric.impl is MetricImplEnum.MEAN_SPREADING:
            instance = MeanSpreadingMetric(
                embeddings=embeddings,
                tags=tags,
            )
        elif metric.impl is MetricImplEnum.CONTINGENCY:
            instance = ContingencyMetric(
                embeddings=embeddings,
                tags=tags,
            )
        elif metric.impl is MetricImplEnum.SILHOUETTE:
            if mdm is None:
                raise RuntimeError("Silhouette metric requires a distance matrix")

            instance = SilhouetteMetric(
                embeddings=embeddings,
                tags=tags,
                mdm=mdm,
            )
        elif metric.impl is MetricImplEnum.OVERLAP:
            instance = OverlapMetric(
                embeddings=embeddings,
                tags=tags,
            )
        else:
            raise RuntimeError(f"Could not load metric {metric.impl}")

        return instance
