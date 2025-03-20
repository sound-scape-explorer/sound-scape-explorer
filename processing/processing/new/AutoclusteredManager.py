from enum import Enum

from processing.context import Context
from processing.new.AutoclusterConfigNew import AutoclusterConfigNew
from processing.new.BandConfigNew import BandConfigNew
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
    def to_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        ac: AutoclusterConfigNew,
    ) -> None:
        path = build_path(
            AutoclusteredPath.autoclustered.value,
            band.index,
            integration.index,
            ac.index,
        )

        attributes = {
            "min_cluster_size": ac.min_cluster_size,
            "min_samples": ac.min_samples,
            "alpha": ac.alpha,
            "epsilon": ac.epsilon,
            "impl": ac.impl.name,
            "index": ac.index,
        }

        context.storage.write(
            path=path,
            data=ac.values,
            attributes=attributes,
            # compression=True,
        )
