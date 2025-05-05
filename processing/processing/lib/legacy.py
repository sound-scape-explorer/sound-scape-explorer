from typing import NamedTuple

from processing.context import Context
from processing.interfaces import AggregatedData
from processing.common.FileTags import FileTags


class AggregatedDataLegacy(NamedTuple):
    timestamps: list[int]
    tag_names: list[str]
    tag_values: list[list[str]]


# todo:
#  adapting to old code for now but this has to be simplified
#  after trajectory refactor
def convert_aggregated_to_legacy_flat(
    context: Context,
    all_aggregated: list[AggregatedData],
):
    timestamps: list[int] = []
    tag_names = FileTags.get_names(context)
    tag_values: list[list[str]] = []

    for aggregated in all_aggregated:
        timestamps.append(aggregated.start)

        for file in aggregated.files:
            file_tag_values = []

            for tag_name in tag_names:
                file_tag_values.append(file.tags[tag_name])

            tag_values.append(file_tag_values)

    return AggregatedDataLegacy(
        timestamps=timestamps,
        tag_names=tag_names,
        tag_values=tag_values,
    )
