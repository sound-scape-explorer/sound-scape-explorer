from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.context import Context
from processing.interfaces import SerializedTag, AggregationData
from processing.repositories.AutoclusterRepository import AutoclusterRepository
from processing.services.IntervalEnrichmentService import IntervalEnrichmentService
from processing.services.IntervalSerializationService import (
    IntervalSerializationService,
)
from processing.services.IntervalService import IntervalService


class TagService:
    @staticmethod
    def build_serialized_tags(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        aggregations: list[AggregationData],
    ) -> list[SerializedTag]:
        intervals = IntervalService.build_intervals(aggregations)

        autocluster_tag_mapping = AutoclusterRepository.read_all_as_tags(
            context=context,
            extraction=extraction,
            band=band,
            integration=integration,
        )

        enriched = IntervalEnrichmentService.add_autocluster_data(
            intervals=intervals,
            autocluster_tag_mapping=autocluster_tag_mapping,
        )

        serialized_tags = IntervalSerializationService.serialize(enriched)

        return serialized_tags
