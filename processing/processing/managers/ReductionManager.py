from typing import NamedTuple

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.context import Context


class _ReductionIteration(NamedTuple):
    extraction: ExtractionConfig
    band: BandConfig
    integration: IntegrationConfig
    reducer: ReducerConfig


class ReductionManager:
    @staticmethod
    def iterate(extraction: ExtractionConfig):
        for band in extraction.bands:
            for integration in extraction.integrations:
                for reducer in extraction.reducers:
                    yield _ReductionIteration(
                        extraction=extraction,
                        band=band,
                        integration=integration,
                        reducer=reducer,
                    )

    @staticmethod
    def iterate_all(context: Context):
        for extraction in context.config.extractions:
            yield from ReductionManager.iterate(extraction)
