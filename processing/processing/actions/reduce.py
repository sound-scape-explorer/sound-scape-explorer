from rich.progress import track

from processing.common.AggregatedReducible import AggregatedReducible
from processing.context import Context
from processing.new.ReducedManager import ReducedManager
from processing.utils.print_action import print_action
from processing.utils.print_aggregated_reduceables import print_reducibles
from processing.utils.print_no_aggregated_reduceables import (
    print_no_aggregated_reduceables,
)
from processing.utils.print_reducers import print_reducers
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_configuration import validate_configuration


@validate_configuration
@validate_aggregated
def reduce(context: Context):
    print_action("Reductions started!", "start")

    ReducedManager.delete(context)

    storage = context.storage
    settings = context.config.settings
    bands = context.config.bands
    integrations = context.config.integrations
    reducers = context.config.reducers
    extractors = context.config.extractors

    reducibles = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        extractors=extractors,
    )

    if len(reducibles) == 0:
        print_no_aggregated_reduceables()
        return

    print_reducers(reducers)
    print_reducibles(reducibles, storage)

    for ar in track(reducibles, description="Reducing..."):
        if not ar.exists_in_storage(storage):
            continue

        features = ar.read_features_from_storage(storage)

        for reducer in reducers:
            reducer.start(ar.band, ar.integration)

            reducer.instance.load(
                dimensions=reducer.dimensions,
                seed=settings.display_seed,
                features=features[:],
            )

            reducer.instance.calculate()

            ReducedManager.to_storage(
                context=context,
                reducible=ar,
                reducer=reducer,
            )

    print_action("Reductions completed!", "end")
