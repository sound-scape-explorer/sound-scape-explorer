from enum import Enum

from processing.context import Context
from processing.new.AutoclusterConfigNew import AutoclusterConfigNew
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.paths import register_path, build_path


class AutoclusteredPath(Enum):
    autoclustered = register_path("autoclustered")


class AutoclusteredManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(AutoclusteredPath.autoclustered.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(AutoclusteredPath.autoclustered.value)

    @staticmethod
    def _get_path(
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        autocluster: AutoclusterConfigNew,
    ):
        return build_path(
            AutoclusteredPath.autoclustered.value,
            band.index,
            integration.index,
            extractor.index,
            autocluster.index,
        )

    @staticmethod
    def to_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        autocluster: AutoclusterConfigNew,
    ) -> None:
        path = AutoclusteredManager._get_path(band, integration, extractor, autocluster)

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
            data=autocluster.values,
            attributes=attributes,
        )

    @staticmethod
    def from_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        autocluster: AutoclusterConfigNew,
    ):
        path = AutoclusteredManager._get_path(band, integration, extractor, autocluster)
        labels: list[int] = context.storage.read(path)
        return labels
