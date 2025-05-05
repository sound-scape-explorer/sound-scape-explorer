from typing import NamedTuple

from processing.context import Context
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig


class _AggregationIteration(NamedTuple):
    extraction: ExtractionConfig
    band: BandConfig
    integration: IntegrationConfig


class AggregationManager:
    @staticmethod
    def iterate(context: Context):
        """iterate extractions, bands and integrations representing data after aggregation"""
        for extraction in context.config.extractions:
            for band in extraction.bands:
                for integration in extraction.integrations:
                    yield _AggregationIteration(
                        extraction=extraction,
                        band=band,
                        integration=integration,
                    )
