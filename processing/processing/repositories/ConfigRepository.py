from enum import Enum

from processing.context import Context
from processing.enums import StorageDomain
from processing.paths.PathRegistry import PathRegistry


class ConfigPath(Enum):
    DATA = PathRegistry.register(StorageDomain.config)


class ConfigRepository:
    @staticmethod
    def to_storage(context: Context):
        context.storage.delete(ConfigPath.DATA.value)

        string = context.config.json.model_dump_json()

        context.storage.write(
            path=ConfigPath.DATA.value,
            data=[string],  # type: ignore
        )
