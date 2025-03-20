from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class SettingsPath(Enum):
    settings = register_path("settings")


class SettingsManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(SettingsPath.settings.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(SettingsPath.settings.value)

    @staticmethod
    def to_storage(context: Context):
        SettingsManager._delete(context)

        settings: dict[str, str] = {}

        for k, v in vars(context.config.settings).items():
            if isinstance(v, Enum):
                settings[k] = v.name
                continue

            settings[k] = v

        context.storage.write_group(
            path=SettingsPath.settings.value,
            data=settings,
        )
