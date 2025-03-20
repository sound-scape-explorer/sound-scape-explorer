from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class BandPath(Enum):
    indices = register_path("bands", "indices")
    names = register_path("bands", "names")
    lows = register_path("bands", "lows")
    highs = register_path("bands", "highs")


class BandManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(BandPath.indices.value)
        context.storage.delete(BandPath.names.value)
        context.storage.delete(BandPath.lows.value)
        context.storage.delete(BandPath.highs.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(BandPath.indices.value)
            and context.storage.exists(BandPath.names.value)
            and context.storage.exists(BandPath.lows.value)
            and context.storage.exists(BandPath.highs.value)
        )

    @staticmethod
    def to_storage(context: Context):
        BandManager._delete(context)

        bands = context.config.bands
        storage = context.storage

        indices = [b.index for b in bands]
        names = [b.name for b in bands]
        lows = [b.low for b in bands]
        highs = [b.high for b in bands]

        storage.write(path=BandPath.indices.value, data=indices)
        storage.write(path=BandPath.names.value, data=names)
        storage.write(path=BandPath.lows.value, data=lows)
        storage.write(path=BandPath.highs.value, data=highs)
