from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class IntegrationPath(Enum):
    indices = register_path("integrations", "indices")
    names = register_path("integrations", "names")
    durations = register_path("integrations", "durations")


class IntegrationManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(IntegrationPath.indices.value)
        context.storage.delete(IntegrationPath.names.value)
        context.storage.delete(IntegrationPath.durations.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(IntegrationPath.indices.value)
            and context.storage.exists(IntegrationPath.names.value)
            and context.storage.exists(IntegrationPath.durations.value)
        )

    @staticmethod
    def to_storage(context: Context):
        IntegrationManager._delete(context)

        integrations = context.config.integrations
        storage = context.storage

        indices = [i.index for i in integrations]
        names = [i.name for i in integrations]
        durations = [i.duration for i in integrations]

        storage.write(path=IntegrationPath.indices.value, data=indices)
        storage.write(path=IntegrationPath.names.value, data=names)
        storage.write(path=IntegrationPath.durations.value, data=durations)
