from rich import print
from rich.progress import track

from processing.context import Context
from processing.factories.ReducerFactory import ReducerFactory
from processing.printers.print_action import print_action
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.ReductionRepository import ReductionRepository
from processing.validators.validate_aggregations import validate_aggregations


@validate_aggregations
def run_reductions(context: Context):
    print_action("Reductions started!", "start")

    ReductionRepository.delete(context)

    for extraction in context.config.extractions:
        for band in extraction.bands:
            for integration in extraction.integrations:
                print(
                    f"Extraction: [b]#{extraction.index} {extraction.name}[/b]."
                    f" Band: [b]#{band.index} {band.name}[/b]."
                    f" Integration: [b]#{integration.index} {integration.name}[/b]."
                )

                embeddings = AggregationRepository.from_storage_embeddings(
                    context,
                    extraction,
                    band,
                    integration,
                )

                for reducer in track(extraction.reducers):
                    r = ReducerFactory.create(reducer)

                    reductions = r.reduce(
                        embeddings=embeddings,
                        dimensions=reducer.dimensions,
                        seed=context.config.settings.display_seed,
                    )

                    ReductionRepository.to_storage(
                        context=context,
                        extraction=extraction,
                        band=band,
                        integration=integration,
                        reducer=reducer,
                        reductions=reductions,
                    )

    print_action("Reductions completed!", "end")
