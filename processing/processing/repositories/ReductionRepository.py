import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.context import Context
from processing.paths.PathRegistry import PathRegistry
from processing.paths.ReductionPath import ReductionPath


class ReductionRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ReductionPath.REDUCTIONS.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(ReductionPath.REDUCTIONS.value)

    @staticmethod
    def _get_path(
        extraction: ExtractionConfig,
        reducer: ReducerConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        return PathRegistry.build(
            ReductionPath.REDUCTIONS.value,
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
        reductions: np.ndarray,
    ):
        path = ReductionRepository._get_path(extraction, reducer, band, integration)

        context.storage.write(
            path=path,
            data=reductions,  # type: ignore
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        reducer: ReducerConfig,
    ):
        path = ReductionRepository._get_path(extraction, reducer, band, integration)
        return context.storage.read(path)
