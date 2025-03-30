from rich import print
from rich.progress import track

from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.ReducedManager import ReducedManager
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.utils.print_action import print_action
from processing.utils.print_reducers import print_reducers
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_configuration import validate_configuration


def _iterate_reducers(reducers: list[ReducerConfigNew]):
    for reducer in reducers:
        for band in reducer.bands:
            for integration in reducer.integrations:
                for extractor in reducer.extractors:
                    yield reducer, band, integration, extractor


def _count_iterations(reducers: list[ReducerConfigNew]):
    count = 0
    for _ in _iterate_reducers(reducers):
        count += 1

    return count


@validate_configuration
@validate_aggregated
def reduce(context: Context):
    print_action("Reductions started!", "start")

    ReducedManager.delete(context)

    settings = context.config.settings
    reducers = context.config.reducers
    iterations = _count_iterations(reducers)

    print(f"Total reductions {iterations}")
    print_reducers(context)

    for reducer, band, integration, extractor in track(
        _iterate_reducers(reducers),
        "Reducing...",
        total=iterations,
    ):
        aggregated = AggregatedManager.from_storage(
            context,
            band,
            integration,
            extractor,
        )

        reducer.start(band, integration)
        reducer.instance.load(
            dimensions=reducer.dimensions,
            seed=settings.display_seed,
            features=aggregated["data"][:],
        )

        reducer.instance.calculate()

        ReducedManager.to_storage(
            context=context,
            band=band,
            integration=integration,
            extractor=extractor,
            reducer=reducer,
        )

    print_action("Reductions completed!", "end")
