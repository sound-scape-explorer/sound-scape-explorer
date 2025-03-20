from enum import Enum

from processing.common.AggregatedReducible import AggregatedReducible
from processing.context import Context
from processing.new.paths import register_path, build_path


class ComputedPath(Enum):
    computed = register_path("computed")


class ComputedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ComputedPath.computed.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(ComputedPath.computed.value)

    @staticmethod
    def to_storage(
        context: Context,
        ar: AggregatedReducible,
        data: list[list[float]],
        index: int,
    ):
        path = build_path(
            ComputedPath.computed.value,
            ar.band.index,
            ar.integration.index,
            index,
        )

        context.storage.write(
            path=path,
            data=data,
        )
