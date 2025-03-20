from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class DigesterPath(Enum):
    indices = register_path("digesters", "indices")
    impls = register_path("digesters", "impls")
    is_pairings = register_path("digesters", "is_pairings")


class DigesterManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(DigesterPath.indices.value)
        context.storage.delete(DigesterPath.impls.value)
        context.storage.delete(DigesterPath.is_pairings.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(DigesterPath.indices.value)
            and context.storage.exists(DigesterPath.impls.value)
            and context.storage.exists(DigesterPath.is_pairings.value)
        )

    @staticmethod
    def to_storage(context: Context):
        DigesterManager._delete(context)

        digesters = context.config.digesters
        storage = context.storage

        indices = [d.index for d in digesters]
        impls = [d.impl.name for d in digesters]
        is_pairings = [d.is_pairing for d in digesters]

        storage.write(path=DigesterPath.indices.value, data=indices)
        storage.write(path=DigesterPath.impls.value, data=impls)
        storage.write(path=DigesterPath.is_pairings.value, data=is_pairings)
