from rich import print
from rich.progress import track

from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.ReducedManager import ReducedManager
from processing.new.iterate_reducers import iterate_reducers
from processing.printers.print_action import print_action
from processing.printers.print_reducers import print_reducers
from processing.validators.validate_aggregated import validate_aggregated
from processing.validators.validate_configuration import validate_configuration


def _count_iterations(context: Context):
    count = 0

    reducers = context.config.reducers
    for _ in iterate_reducers(reducers):
        count += 1

    return count


@validate_configuration
@validate_aggregated
def run_reductions(context: Context):
    print_action("Reductions started!", "start")

    ReducedManager.delete(context)

    iterations = _count_iterations(context)

    print(f"Total reductions {iterations}")
    print_reducers(context)

    reducers = context.config.reducers
    for r in track(
        iterate_reducers(reducers),
        "Reducing...",
        total=iterations,
    ):
        aggregated = AggregatedManager.from_storage(
            context,
            r.band,
            r.integration,
            r.extractor,
        )

        r.reducer.start(r.band, r.integration)
        r.reducer.instance.load(
            dimensions=r.reducer.dimensions,
            seed=context.config.settings.display_seed,
            features=aggregated.data[:],
        )

        r.reducer.instance.calculate()

        ReducedManager.to_storage(
            context=context,
            band=r.band,
            integration=r.integration,
            extractor=r.extractor,
            reducer=r.reducer,
        )

    print_action("Reductions completed!", "end")
