from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class IndexPath(Enum):
    indices = register_path("indices", "indices")
    impls = register_path("indices", "impls")
    offsets = register_path("indices", "offsets")
    steps = register_path("indices", "steps")
    is_persists = register_path("indices", "is_persists")


class IndexManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(IndexPath.indices.value)
        context.storage.delete(IndexPath.impls.value)
        context.storage.delete(IndexPath.offsets.value)
        context.storage.delete(IndexPath.steps.value)
        context.storage.delete(IndexPath.is_persists.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(IndexPath.indices.value)
            and context.storage.exists(IndexPath.impls.value)
            and context.storage.exists(IndexPath.offsets.value)
            and context.storage.exists(IndexPath.steps.value)
            and context.storage.exists(IndexPath.is_persists.value)
        )

    @staticmethod
    def to_storage(context: Context):
        IndexManager._delete(context)

        indices_objects = context.config.indices
        storage = context.storage

        indices = [i.index for i in indices_objects]
        impls = [i.impl.name for i in indices_objects]
        offsets = [i.offset for i in indices_objects]
        steps = [i.step for i in indices_objects]
        is_persists = [i.is_persist for i in indices_objects]

        storage.write(path=IndexPath.indices.value, data=indices)
        storage.write(path=IndexPath.impls.value, data=impls)
        storage.write(path=IndexPath.offsets.value, data=offsets)
        storage.write(path=IndexPath.steps.value, data=steps)
        storage.write(path=IndexPath.is_persists.value, data=is_persists)
