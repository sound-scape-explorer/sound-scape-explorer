from typing import NamedTuple

from processing.common.FileTags import FileTags
from processing.context import Context
from processing.interfaces import AggregationData


# todo: to remove
class AggregatedDataLegacy(NamedTuple):
    timestamps: list[int]
    tag_names: list[str]
    tag_values: list[list[str]]


# todo:
#  adapting to old code for now but this has to be simplified
#  after trajectory refactor
def convert_aggregated_to_legacy_flat(
    context: Context,
    aggregations: list[AggregationData],
):
    timestamps: list[int] = []
    tag_names = FileTags.get_names(context)
    tag_values: list[list[str]] = []

    for agg in aggregations:
        timestamps.append(agg.start)

        for file in agg.files:
            file_tag_values = []

            for tag_name in tag_names:
                file_tag_values.append(file.tags[tag_name])

            tag_values.append(file_tag_values)

    return AggregatedDataLegacy(
        timestamps=timestamps,
        tag_names=tag_names,
        tag_values=tag_values,
    )
