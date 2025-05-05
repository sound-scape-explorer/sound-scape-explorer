import numpy as np

from processing.context import Context
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.paths.ReducedPath import ReducedPath
from processing.config.ReducerConfig import ReducerConfig
from processing.paths.path_registry import build_path


class ReducedRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ReducedPath.REDUCED.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(ReducedPath.REDUCED.value)

    @staticmethod
    def _get_path(
        extraction: ExtractionConfig,
        reducer: ReducerConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        return build_path(
            ReducedPath.REDUCED.value,
            extraction.index,
            reducer.index,
            band.index,
            integration.index,
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
        reduced: np.ndarray,
    ):
        path = ReducedRepository._get_path(extraction, reducer, band, integration)

        context.storage.write(
            path=path,
            data=reduced,  # type: ignore
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
    ):
        path = ReducedRepository._get_path(extraction, reducer, band, integration)
        return context.storage.read(path)
