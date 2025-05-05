from rich import print
from rich.progress import track

from processing.context import Context
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.repositories.ReducedRepository import ReducedRepository
from processing.printers.print_action import print_action
from processing.validators.validate_aggregated import validate_aggregated


@validate_aggregated
def run_reductions(context: Context):
    print_action("Reductions started!", "start")

    ReducedRepository.delete(context)

    for extraction in context.config.extractions:
        for band in extraction.bands:
            for integration in extraction.integrations:
                print(
                    f"Extraction: [b]#{extraction.index} {extraction.name}[/b]."
                    f" Band: [b]#{band.index} {band.name}[/b]."
                    f" Integration: [b]#{integration.index} {integration.name}[/b]."
                )

                embeddings = AggregatedRepository.from_storage_embeddings(
                    context,
                    extraction,
                    band,
                    integration,
                )

                for reducer in track(extraction.reducers):
                    r = reducer.create()

                    reduced = r.reduce(
                        embeddings=embeddings,
                        dimensions=reducer.dimensions,
                        seed=context.config.settings.display_seed,
                    )

                    ReducedRepository.to_storage(
                        context=context,
                        extraction=extraction,
                        band=band,
                        integration=integration,
                        reducer=reducer,
                        reduced=reduced,
                    )

    print_action("Reductions completed!", "end")
