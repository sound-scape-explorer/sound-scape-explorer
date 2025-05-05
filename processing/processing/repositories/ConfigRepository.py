from enum import Enum

from processing.context import Context
from processing.paths.path_registry import register_path


class ConfigPath(Enum):
    DATA = register_path("configs")


class ConfigRepository:
    @staticmethod
    def to_storage(context: Context):
        context.storage.delete(ConfigPath.DATA.value)

        string = context.config.json.model_dump_json()

        context.storage.write(
            path=ConfigPath.DATA.value,
            data=[string],  # type: ignore
        )
