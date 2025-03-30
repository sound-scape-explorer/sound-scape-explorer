from processing.context import Context
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.ReducedPath import ReducedPath
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.new.paths import build_path


class ReducedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ReducedPath.reduced.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(ReducedPath.reduced.value)

    @staticmethod
    def _get_path(
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        reducer: ReducerConfigNew,
    ):
        return build_path(
            ReducedPath.reduced.value,
            band.index,
            integration.index,
            extractor.index,
            reducer.index,
        )

    @staticmethod
    def to_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        reducer: ReducerConfigNew,
    ):
        path = ReducedManager._get_path(band, integration, extractor, reducer)

        context.storage.append(
            path=path,
            data=reducer.instance.values,
            attributes={
                "extractor": extractor.impl.name,
                "extractor_index": str(extractor.index),
                "reducer": reducer.impl.name,
                "reducer_index": str(reducer.index),
                "reducer_dimensions": str(reducer.dimensions),
            },
        )

    @staticmethod
    def from_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        reducer: ReducerConfigNew,
    ):
        path = ReducedManager._get_path(band, integration, extractor, reducer)
        return context.storage.read(path)
