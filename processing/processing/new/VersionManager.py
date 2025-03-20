from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class VersionPath(Enum):
    version = register_path("version")


class VersionManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(VersionPath.version.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(VersionPath.version.value)

    @staticmethod
    def to_storage(context: Context):
        VersionManager._delete(context)

        context.storage.write(
            path=VersionPath.version.value,
            data=[context.config.version],
        )
