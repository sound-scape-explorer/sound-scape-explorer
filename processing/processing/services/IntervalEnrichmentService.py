from processing.interfaces import Interval
from processing.types import AutoclusterTagMapping


class IntervalEnrichmentService:
    @staticmethod
    def add_autocluster_data(
        intervals: list[Interval],
        autocluster_tag_mapping: AutoclusterTagMapping,
    ) -> list[Interval]:
        enriched_intervals: list[Interval] = []

        for i, interval in enumerate(intervals):
            ac_tags = {
                ac_name: [ac_values[i]]
                for ac_name, ac_values in autocluster_tag_mapping.items()
            }

            # an interval can only have one autocluster value per autocluster tag
            ac_joined_tags = {
                ac_name: ac_values[i]
                for ac_name, ac_values in autocluster_tag_mapping.items()
            }

            enriched_interval = Interval(
                i=interval.i,
                aggregations=interval.aggregations,
                sites=interval.sites,
                joined_site=interval.joined_site,
                tags=ac_tags | interval.tags,
                joined_tags=ac_joined_tags | interval.joined_tags,
            )

            enriched_intervals.append(enriched_interval)

        return enriched_intervals
