from collections import defaultdict

from pandas import DataFrame

from processing.constants import STRING_DELIMITER
from processing.context import Context
from processing.managers.ReductionManager import ReductionManager
from processing.printers.print_action import print_action
from processing.prompts.prompt_band import prompt_band
from processing.prompts.prompt_csv_path import prompt_csv_path
from processing.prompts.prompt_extraction import prompt_extraction
from processing.prompts.prompt_integration import prompt_integration
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.repositories.ReducedRepository import ReducedRepository
from processing.services.AggregatedTagService import AggregatedTagService
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date


def run_dataframe_export(context: Context):
    print_action("Export started", "start")

    raw: dict[str, list[str]] = defaultdict(list)

    extraction = prompt_extraction(context)
    band = prompt_band(extraction)
    integration = prompt_integration(extraction)
    csv_path = prompt_csv_path(context)

    all_aggregated = AggregatedRepository.from_storage(
        context=context,
        extraction=extraction,
        band=band,
        integration=integration,
    )

    all_tags = AggregatedTagService.from_storage(
        context=context,
        extraction=extraction,
        band=band,
        integration=integration,
    )

    # intervals
    for i, agg in enumerate(all_aggregated):
        raw["indices"].append(str(i))
        raw["timestamps"].append(convert_timestamp_to_date(agg.start))

        site = []
        for file in agg.files:
            site.append(file.site)

        raw["sites"].append(STRING_DELIMITER.join(site))

    # tags
    for tag in all_tags:
        raw[tag.name] = tag.values

    # reduced embeddings
    for ri in ReductionManager.iterate(extraction):
        reduced = ReducedRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
            reducer=ri.reducer,
        )

        for d in range(ri.reducer.dimensions):
            parts = [
                str(ri.reducer.index),
                ri.reducer.impl.name,
                f"{ri.reducer.dimensions}d",
                f"{d+1}",
            ]

            key = "_".join(parts)
            raw[key] = [embedding[d] for embedding in reduced]

    # interval embeddings
    for d in range(all_aggregated[0].embeddings.shape[0]):
        parts = [str(extraction.index), extraction.name, f"{d}"]
        key = "_".join(parts)
        raw[key] = [agg.embeddings[d] for agg in all_aggregated]

    df = DataFrame(raw)
    df.to_csv(csv_path, index=False)

    print_action("Export completed!", "end")
