from processing.common.AggregatedTag import AggregatedTag
from processing.common.FileTags import FileTags
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.constants import AUTOCLUSTER_PREFIX
from processing.context import Context
from processing.lib.legacy import convert_aggregated_to_legacy_flat
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.repositories.AutoclusteredRepository import AutoclusteredRepository
from processing.utils.get_uniques_sorted import get_uniques_sorted
from processing.utils.get_uniques_unsorted import get_uniques_unsorted


class AggregatedTagService:
    @staticmethod
    def _read_flat(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        names: list[str] = FileTags.get_names(context)

        aggregated = AggregatedRepository.from_storage(
            context=context,
            extraction=extraction,
            band=band,
            integration=integration,
        )

        legacy = convert_aggregated_to_legacy_flat(context, aggregated)
        values = legacy.tag_values

        for autocluster in reversed(extraction.autoclusters):
            autoclustered = AutoclusteredRepository.from_storage(
                context=context,
                extraction=extraction,
                band=band,
                integration=integration,
                autocluster=autocluster,
            )

            names.insert(0, f"{AUTOCLUSTER_PREFIX}{autocluster.index}")

            for i in range(len(values)):
                values[i] = [str(autoclustered[i]), *values[i]]

        return names, values

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        names, values = AggregatedTagService._read_flat(
            context=context,
            extraction=extraction,
            band=band,
            integration=integration,
        )

        aggregated_tags: list[AggregatedTag] = []

        for i in range(len(names)):
            aggregated_name = names[i]
            aggregated_values = []

            for v in values:
                aggregated_values.append(v[i])

            aggregated_tag = AggregatedTag(
                i=i,
                name=aggregated_name,
                values=aggregated_values,
                uniques_sorted=get_uniques_sorted(aggregated_values),
                uniques_occurrence=get_uniques_unsorted(aggregated_values),
            )

            aggregated_tags.append(aggregated_tag)

        return aggregated_tags
