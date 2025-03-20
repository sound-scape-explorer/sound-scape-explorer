from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class ExtractorPath(Enum):
    indices = register_path("extractors", "indices")
    names = register_path("extractors", "names")
    impls = register_path("extractors", "impls")
    offsets = register_path("extractors", "offsets")
    steps = register_path("extractors", "steps")
    is_persists = register_path("extractors", "is_persists")


class ExtractorManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(ExtractorPath.indices.value)
        context.storage.delete(ExtractorPath.names.value)
        context.storage.delete(ExtractorPath.impls.value)
        context.storage.delete(ExtractorPath.offsets.value)
        context.storage.delete(ExtractorPath.steps.value)
        context.storage.delete(ExtractorPath.is_persists.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(ExtractorPath.indices.value)
            and context.storage.exists(ExtractorPath.names.value)
            and context.storage.exists(ExtractorPath.impls.value)
            and context.storage.exists(ExtractorPath.offsets.value)
            and context.storage.exists(ExtractorPath.steps.value)
            and context.storage.exists(ExtractorPath.is_persists.value)
        )

    @staticmethod
    def to_storage(context: Context):
        ExtractorManager._delete(context)

        extractors = context.config.extractors
        storage = context.storage

        indices = [e.index for e in extractors]
        names = [e.name for e in extractors]
        impls = [e.impl.name for e in extractors]
        offsets = [e.offset for e in extractors]
        steps = [e.step for e in extractors]
        is_persists = [e.is_persist for e in extractors]

        storage.write(path=ExtractorPath.indices.value, data=indices)
        storage.write(path=ExtractorPath.names.value, data=names)
        storage.write(path=ExtractorPath.impls.value, data=impls)
        storage.write(path=ExtractorPath.offsets.value, data=offsets)
        storage.write(path=ExtractorPath.steps.value, data=steps)
        storage.write(path=ExtractorPath.is_persists.value, data=is_persists)
