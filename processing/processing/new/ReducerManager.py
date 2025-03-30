from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class ReducerPath(Enum):
    indices = register_path("reducers", "indices")
    impls = register_path("reducers", "impls")
    dimensions = register_path("reducers", "dimensions")
    bands = register_path("reducers", "bands")  # indices
    integrations = register_path("reducers", "integrations")  # indices
    extractors = register_path("reducers", "extractors")  # indices


class ReducerManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(ReducerPath.indices.value)
        context.storage.delete(ReducerPath.impls.value)
        context.storage.delete(ReducerPath.dimensions.value)
        context.storage.delete(ReducerPath.bands.value)
        context.storage.delete(ReducerPath.integrations.value)
        context.storage.delete(ReducerPath.extractors.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(ReducerPath.indices.value)
            and context.storage.exists(ReducerPath.impls.value)
            and context.storage.exists(ReducerPath.dimensions.value)
            and context.storage.exists(ReducerPath.bands.value)
            and context.storage.exists(ReducerPath.integrations.value)
            and context.storage.exists(ReducerPath.extractors.value)
        )

    @staticmethod
    def to_storage(context: Context):
        ReducerManager._delete(context)

        reducers = context.config.reducers
        storage = context.storage

        indices = [r.index for r in reducers]
        impls = [r.impl.name for r in reducers]
        dimensions = [r.dimensions for r in reducers]

        all_bands = []
        all_integrations = []
        all_extractors = []

        for reducer in reducers:
            bands = [b.index for b in reducer.bands]
            integrations = [i.index for i in reducer.integrations]
            extractors = [e.index for e in reducer.extractors]

            all_bands.append(bands)
            all_integrations.append(integrations)
            all_extractors.append(extractors)

        storage.write(path=ReducerPath.indices.value, data=indices)
        storage.write(path=ReducerPath.impls.value, data=impls)
        storage.write(path=ReducerPath.dimensions.value, data=dimensions)
        storage.write(path=ReducerPath.bands.value, data=all_bands)
        storage.write(path=ReducerPath.integrations.value, data=all_integrations)
        storage.write(path=ReducerPath.extractors.value, data=all_extractors)
