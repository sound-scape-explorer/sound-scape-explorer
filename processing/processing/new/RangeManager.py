from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class RangePath(Enum):
    indices = register_path("ranges", "indices")
    names = register_path("ranges", "names")
    starts = register_path("ranges", "starts")
    ends = register_path("ranges", "ends")


class RangeManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(RangePath.indices.value)
        context.storage.delete(RangePath.names.value)
        context.storage.delete(RangePath.starts.value)
        context.storage.delete(RangePath.ends.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(RangePath.indices.value)
            and context.storage.exists(RangePath.names.value)
            and context.storage.exists(RangePath.starts.value)
            and context.storage.exists(RangePath.ends.value)
        )

    @staticmethod
    def to_storage(context: Context):
        RangeManager._delete(context)

        ranges = context.config.ranges
        storage = context.storage

        indices = [r.index for r in ranges]
        names = [r.name for r in ranges]
        starts = [r.start for r in ranges]
        ends = [r.end for r in ranges]

        storage.write(path=RangePath.indices.value, data=indices)
        storage.write(path=RangePath.names.value, data=names)
        storage.write(path=RangePath.starts.value, data=starts)
        storage.write(path=RangePath.ends.value, data=ends)
