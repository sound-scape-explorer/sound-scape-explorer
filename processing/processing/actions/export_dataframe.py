from pandas import DataFrame

from processing.common.AggregatedLabelStorage import AggregatedLabelStorage
from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.files.FileSheet import FileSheet
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.ask_band import ask_band
from processing.utils.ask_csv_path import ask_csv_path
from processing.utils.ask_integration import ask_integration
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.validate_configuration_with_config import (
    validate_configuration_with_config,
)


@validate_configuration_with_config
def export_dataframe(
    config: Config,
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Export started", "start")

    payload = {}

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    extractors = ExtractorStorage.read_from_storage(storage)
    nn_extractors = filter_nn_extractors(extractors)

    band = ask_band(bands)
    integration = ask_integration(integrations)
    csv_path = ask_csv_path(config)

    timestamps_path = (
        f"{StoragePath.aggregated_timestamps.value}"
        f"/{band.name}"
        f"/{integration.seconds}"
        f"/{extractors[0].index}"
    )
    aggregated_timestamps = storage.read(timestamps_path)

    # Interval indexes
    payload["interval_index"] = []
    interval_index = 0
    for _ in aggregated_timestamps:
        payload["interval_index"].append(str(interval_index))
        interval_index += 1

    aggregated_sites_path = (
        f"{StoragePath.aggregated_sites.value}"
        f"/{band.name}"
        f"/{integration.seconds}"
        f"/{extractors[0].index}"
    )
    aggregated_sites = storage.read(aggregated_sites_path)
    payload["site"] = [s[0].decode("utf-8") for s in aggregated_sites]

    # Timestamps
    payload["timestamp"] = [at[0] for at in aggregated_timestamps]

    # Labels
    aggregated_labels = AggregatedLabelStorage.read_from_storage(
        storage=storage,
        band=band,
        integration=integration,
        extractor=extractors[0],
    )
    for al in aggregated_labels:
        key = f"{FileSheet.label_prefix.value}{al.property}"
        payload[key] = al.values

    # Reduced features
    ranges = RangeStorage.read_from_storage(storage)
    reducers = ReducerStorage.read_from_storage(storage, bands, integrations, ranges)

    aggregated_reduceables = AggregatedReduceable.reconstruct(
        bands=bands,
        integrations=integrations,
        nn_extractors=nn_extractors,
    )

    ars = list(
        filter(
            lambda ar_: ar_.band == band and ar_.integration == integration,
            aggregated_reduceables,
        )
    )

    for reducer in reducers:
        reducer.load(band, integration)

        if not reducer.should_calculate():
            continue

        for ar in ars:
            aggregated_features = storage.read(ar.get_reduced_path(reducer))
            for d in range(reducer.dimensions):
                key = f"{reducer.index}_{reducer.name}_{reducer.dimensions}d_{d+1}"
                payload[key] = [af[d] for af in aggregated_features]

    # Aggregated data
    for extractor in extractors:
        path = (
            f"{StoragePath.aggregated.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )
        data = storage.read(path)
        for index in range(data.shape[1]):
            key = f"{extractor.index}_{extractor.name}_{index+1}"
            payload[key] = [d[index] for d in data]

    df = DataFrame(payload)
    df.to_csv(csv_path, index=False)

    print_action("Export completed!", "end")
    invoke_menu(storage, callback)
