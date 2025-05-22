from collections import defaultdict

from processing.constants import STRING_DELIMITER
from processing.interfaces import AggregationData, Interval


class IntervalService:
    @staticmethod
    def build_intervals(aggregations: list[AggregationData]):
        intervals: list[Interval] = []

        for a, agg in enumerate(aggregations):
            sites: list[str] = []
            tags: dict[str, list[str]] = defaultdict(list)

            for file in agg.files:
                if file.site not in sites:
                    sites.append(file.site)

                for tag_name, tag_value in file.tags.items():
                    if tag_value not in tags[tag_name]:
                        tags[tag_name].append(tag_value)

            joined_site = STRING_DELIMITER.join(sites)
            joined_tags: dict[str, str] = {}

            for tag_name, tag_values in tags.items():
                joined_tags[tag_name] = STRING_DELIMITER.join(tag_values)

            interval = Interval(
                i=a,
                aggregations=agg,
                joined_site=joined_site,
                sites=sites,
                joined_tags=joined_tags,
                tags=tags,
            )

            intervals.append(interval)

        return intervals
