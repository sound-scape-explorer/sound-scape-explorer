from enum import Enum

import numpy as np

from processing.context import Context
from processing.config.AutoclusterConfig import AutoclusterConfig
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.paths.path_registry import register_path, build_path
from processing.types import Autoclustered


class AutoclusteredPath(Enum):
    AUTOCLUSTERED = register_path("autoclustered")


class AutoclusteredRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(AutoclusteredPath.AUTOCLUSTERED.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(AutoclusteredPath.AUTOCLUSTERED.value)

    @staticmethod
    def _get_path(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        autocluster: AutoclusterConfig,
    ):
        return build_path(
            AutoclusteredPath.AUTOCLUSTERED.value,
            extraction.index,
            band.index,
            integration.index,
            autocluster.index,
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        autocluster: AutoclusterConfig,
        autoclustered: Autoclustered,
    ):
        path = AutoclusteredRepository._get_path(
            extraction,
            band,
            integration,
            autocluster,
        )

        attributes = {
            "min_cluster_size": autocluster.min_cluster_size,
            "min_samples": autocluster.min_samples,
            "alpha": autocluster.alpha,
            "epsilon": autocluster.epsilon,
            "impl": autocluster.impl.name,
            "index": autocluster.index,
        }

        context.storage.write(
            path=path,
            data=np.stack(autoclustered),
            attributes=attributes,
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        autocluster: AutoclusterConfig,
    ):
        path = AutoclusteredRepository._get_path(
            extraction,
            band,
            integration,
            autocluster,
        )

        labels: list[int] = context.storage.read(path)[:]

        return labels
