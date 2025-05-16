from enum import Enum

import numpy as np

from processing.config.AutoclusterConfig import AutoclusterConfig
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.context import Context
from processing.enums import StorageDomain
from processing.paths.PathRegistry import PathRegistry
from processing.types import Autoclustered


class AutoclusterPath(Enum):
    DATA = PathRegistry.register(StorageDomain.autoclusters)


class AutoclusterRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(AutoclusterPath.DATA.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(AutoclusterPath.DATA.value)

    @staticmethod
    def _get_path(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        autocluster: AutoclusterConfig,
    ):
        return PathRegistry.build(
            AutoclusterPath.DATA.value,
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
        path = AutoclusterRepository._get_path(
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
        path = AutoclusterRepository._get_path(
            extraction,
            band,
            integration,
            autocluster,
        )

        labels: list[int] = context.storage.read(path)[:]

        return labels
