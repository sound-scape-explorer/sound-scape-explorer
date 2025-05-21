from collections import defaultdict
from enum import Enum

import numpy as np

from processing.config.AutoclusterConfig import AutoclusterConfig
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.constants import AUTOCLUSTER_PREFIX
from processing.context import Context
from processing.enums import StorageDomain
from processing.paths.PathRegistry import PathRegistry
from processing.types import AutoclusterLabels, AutoclusterTagMapping


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
        labels: AutoclusterLabels,
    ):
        path = AutoclusterRepository._get_path(
            extraction,
            band,
            integration,
            autocluster,
        )

        # todo: remove me
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
            data=np.stack(labels),
            attributes=attributes,
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        autocluster: AutoclusterConfig,
    ) -> AutoclusterLabels:
        path = AutoclusterRepository._get_path(
            extraction,
            band,
            integration,
            autocluster,
        )

        labels: AutoclusterLabels = context.storage.read(path)[:]
        return labels

    @staticmethod
    def read_all_as_tags(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> AutoclusterTagMapping:
        tag_mapping: AutoclusterTagMapping = defaultdict(list)

        for autocluster in extraction.autoclusters:
            data = AutoclusterRepository.from_storage(
                context=context,
                extraction=extraction,
                band=band,
                integration=integration,
                autocluster=autocluster,
            )

            tag_name = f"{AUTOCLUSTER_PREFIX}{autocluster.index}"
            tag_mapping[tag_name] = [str(v) for v in data]

        return tag_mapping
