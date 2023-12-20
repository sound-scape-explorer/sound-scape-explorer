from rich.progress import track

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.bands.BandStorage import BandStorage
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.print_aggregated_reduceables import print_aggregated_reduceables
from processing.utils.print_no_aggregated_reduceables import (
    print_no_aggregated_reduceables,
)
from processing.utils.print_reducers import print_reducers
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_configuration import validate_configuration


@validate_configuration
@validate_aggregated
def reduce(
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Reductions started!", "start")

    storage.delete(StoragePath.reduced)

    settings = SettingsStorage.read_from_storage(storage)
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    ranges = RangeStorage.read_from_storage(storage)
    reducers = ReducerStorage.read_from_storage(storage, bands, integrations, ranges)
    extractors = ExtractorStorage.read_from_storage(storage)
    nn_extractors = filter_nn_extractors(extractors)

    aggregated_reduceables = AggregatedReduceable.reconstruct(
        bands=bands,
        integrations=integrations,
        nn_extractors=nn_extractors,
    )

    if len(aggregated_reduceables) == 0:
        print_no_aggregated_reduceables()
        if callback is not None:
            callback(storage)
        return

    print_reducers(reducers)
    print_aggregated_reduceables(aggregated_reduceables, storage)

    for ar in track(aggregated_reduceables, description="Reducing..."):
        if not ar.exists_in_storage(storage):
            continue

        features = ar.read_features_from_storage(storage)

        for reducer in reducers:
            reducer.create_instance(ar.band, ar.integration)

            if not reducer.should_calculate():
                continue

            reducer.instance.load(
                dimensions=reducer.dimensions,
                seed=settings.display_umap_seed,
                features=features[:],
            )

            reducer.instance.calculate()

            storage.append(
                path=ar.get_reduced_path(reducer),
                data=reducer.instance.values,
                compression=True,
                attributes={
                    "extractor": ar.extractor.name,
                    "extractor_index": str(ar.extractor.index),
                    "reducer": reducer.name,
                    "reducer_index": str(reducer.index),
                    "reducer_dimensions": str(reducer.dimensions),
                },
            )

    print_action("Reductions completed!", "end")
    invoke_menu(storage, callback)
