from processing.common.AggregatedReducible import AggregatedReducible
from processing.context import Context
from processing.new.ReducedPath import ReducedPath
from processing.new.ReducerConfigNew import ReducerConfigNew


class ReducedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ReducedPath.reduced.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(ReducedPath.reduced.value)

    @staticmethod
    def to_storage(
        context: Context,
        ar: AggregatedReducible,
        reducer: ReducerConfigNew,
    ):
        storage = context.storage

        storage.append(
            path=ar.get_reduced_path(reducer),
            data=reducer.instance.values,
            attributes={
                "extractor": ar.extractor.name,
                "extractor_index": str(ar.extractor.index),
                "reducer": reducer.impl.name,
                "reducer_index": str(reducer.index),
                "reducer_dimensions": str(reducer.dimensions),
            },
        )
