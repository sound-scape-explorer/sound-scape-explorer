from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class AutoclusterPath(Enum):
    indices = register_path("autoclusters", "indices")
    impls = register_path("autoclusters", "impls")
    min_cluster_sizes = register_path("autoclusters", "min_cluster_sizes")
    min_samples = register_path("autoclusters", "min_samples")
    alphas = register_path("autoclusters", "alphas")
    epsilons = register_path("autoclusters", "epsilons")


class AutoclusterManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(AutoclusterPath.indices.value)
        context.storage.delete(AutoclusterPath.impls.value)
        context.storage.delete(AutoclusterPath.min_cluster_sizes.value)
        context.storage.delete(AutoclusterPath.min_samples.value)
        context.storage.delete(AutoclusterPath.alphas.value)
        context.storage.delete(AutoclusterPath.epsilons.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(AutoclusterPath.indices.value)
            and context.storage.exists(AutoclusterPath.impls.value)
            and context.storage.exists(AutoclusterPath.min_cluster_sizes.value)
            and context.storage.exists(AutoclusterPath.min_samples.value)
            and context.storage.exists(AutoclusterPath.alphas.value)
            and context.storage.exists(AutoclusterPath.epsilons.value)
        )

    @staticmethod
    def to_storage(context: Context):
        AutoclusterManager._delete(context)

        autoclusters = context.config.autoclusters
        storage = context.storage

        indices = [ac.index for ac in autoclusters]
        impls = [ac.impl.name for ac in autoclusters]
        min_cluster_sizes = [ac.min_cluster_size for ac in autoclusters]
        min_samples = [ac.min_samples for ac in autoclusters]
        alphas = [ac.alpha for ac in autoclusters]
        epsilons = [ac.epsilon for ac in autoclusters]

        storage.write(path=AutoclusterPath.indices.value, data=indices)
        storage.write(path=AutoclusterPath.impls.value, data=impls)
        storage.write(
            path=AutoclusterPath.min_cluster_sizes.value,
            data=min_cluster_sizes,
        )
        storage.write(path=AutoclusterPath.min_samples.value, data=min_samples)
        storage.write(path=AutoclusterPath.alphas.value, data=alphas)
        storage.write(path=AutoclusterPath.epsilons.value, data=epsilons)
