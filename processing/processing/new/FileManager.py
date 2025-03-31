from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class FilePath(Enum):
    indices = register_path("files", "indices")
    relative_paths = register_path("files", "relative_paths")
    absolute_paths = register_path("files", "absolute_paths")
    timestamps = register_path("files", "timestamps")
    sites = register_path("files", "sites")
    durations = register_path("files", "durations")
    label_properties = register_path("files", "label_properties")
    label_values = register_path("files", "label_values")


class FileManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(FilePath.indices.value)
        context.storage.delete(FilePath.relative_paths.value)
        context.storage.delete(FilePath.absolute_paths.value)
        context.storage.delete(FilePath.timestamps.value)
        context.storage.delete(FilePath.sites.value)
        context.storage.delete(FilePath.durations.value)
        context.storage.delete(FilePath.label_properties.value)
        context.storage.delete(FilePath.label_values.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(FilePath.indices.value)
            and context.storage.exists(FilePath.relative_paths.value)
            and context.storage.exists(FilePath.absolute_paths.value)
            and context.storage.exists(FilePath.timestamps.value)
            and context.storage.exists(FilePath.sites.value)
            and context.storage.exists(FilePath.durations.value)
            and context.storage.exists(FilePath.label_properties.value)
            and context.storage.exists(FilePath.label_values.value)
        )

    @staticmethod
    def to_storage(context: Context):
        FileManager._delete(context)

        files = context.config.files
        storage = context.storage

        indices = [f.index for f in files]
        relative_paths = [f.relative_path for f in files]
        absolute_paths = [f.absolute_path for f in files]
        timestamps = [f.timestamp for f in files]
        sites = [f.site for f in files]
        durations = [f.duration for f in files]

        label_properties = []
        label_values = []

        for file in files:
            file_properties = list(file.labels.keys())
            file_values = list(file.labels.values())

            label_properties.append(file_properties)
            label_values.append(file_values)

        storage.write(path=FilePath.indices.value, data=indices)
        storage.write(path=FilePath.relative_paths.value, data=relative_paths)
        storage.write(path=FilePath.absolute_paths.value, data=absolute_paths)
        storage.write(path=FilePath.timestamps.value, data=timestamps)
        storage.write(path=FilePath.sites.value, data=sites)
        storage.write(path=FilePath.durations.value, data=durations)
        storage.write(path=FilePath.label_properties.value, data=label_properties)
        storage.write(path=FilePath.label_values.value, data=label_values)
