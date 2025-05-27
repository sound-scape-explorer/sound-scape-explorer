from collections import defaultdict

from pandas import DataFrame

from processing.constants import STRING_DELIMITER
from processing.context import Context
from processing.lib.console import Console
from processing.lib.time import convert_timestamp_to_date_string
from processing.managers.ReductionManager import ReductionManager
from processing.services.TagService import TagService
from processing.prompts.prompt_band import prompt_band
from processing.prompts.prompt_csv_path import prompt_csv_path
from processing.prompts.prompt_extraction import prompt_extraction
from processing.prompts.prompt_integration import prompt_integration
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.ReductionRepository import ReductionRepository


def run_dataframe_export(context: Context):
    Console.print_header("Export started")

    raw: dict[str, list[str]] = defaultdict(list)

    extraction = prompt_extraction(context)
    band = prompt_band(extraction)
    integration = prompt_integration(extraction)
    csv_path = prompt_csv_path(context)

    aggregations = AggregationRepository.from_storage(
        context=context,
        extraction=extraction,
        band=band,
        integration=integration,
    )

    tags = TagService.build_serialized_tags(
        context=context,
        extraction=extraction,
        band=band,
        integration=integration,
        aggregations=aggregations,
    )

    # intervals
    for i, agg in enumerate(aggregations):
        raw["indices"].append(str(i))
        raw["timestamps"].append(convert_timestamp_to_date_string(agg.start))

        site = []
        for file in agg.files:
            site.append(file.site)

        raw["sites"].append(STRING_DELIMITER.join(site))

    # tags
    for tag in tags:
        raw[tag.name] = tag.values

    # reductions
    for ri in ReductionManager.iterate(extraction):
        reductions = ReductionRepository.from_storage(
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
            raw[key] = [embeddings[d] for embeddings in reductions]

    # interval embeddings
    for d in range(aggregations[0].embeddings.shape[0]):
        parts = [str(extraction.index), extraction.name, f"{d}"]
        key = "_".join(parts)
        raw[key] = [agg.embeddings[d] for agg in aggregations]

    df = DataFrame(raw)
    df.to_csv(csv_path, index=False)

    Console.print_footer("Export completed")
