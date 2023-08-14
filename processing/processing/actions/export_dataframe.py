from typing import Optional

from pandas import DataFrame

from processing.common.AggregatedLabelStorage import AggregatedLabelStorage
from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.common.YamlEnv import YamlEnv
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.files.FileSheet import FileSheet
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.ask_band import ask_band
from processing.utils.ask_csv_path import ask_csv_path
from processing.utils.ask_extractor import ask_extractor
from processing.utils.ask_integration import ask_integration
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.print_action import print_action
from processing.utils.print_no_configuration import print_no_configuration


def export_dataframe(
    env: YamlEnv,
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    print_action("Export started", "start")

    payload = {}

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    extractors = ExtractorStorage.read_from_storage(storage)
    nn_extractors = filter_nn_extractors(extractors)

    band = ask_band(bands)
    integration = ask_integration(integrations)
    extractor = ask_extractor(nn_extractors)
    csv_path = ask_csv_path(env)

    aggregated_reduceables = AggregatedReduceable.reconstruct(
        bands=bands,
        integrations=integrations,
        nn_extractors=nn_extractors,
    )

    ar_results = list(
        filter(
            lambda ar: ar.band == band
            and ar.integration == integration
            and ar.extractor == extractor,
            aggregated_reduceables,
        )
    )

    assert len(ar_results) == 1, f"Expected 1 result, got {len(ar_results)}"

    ar = ar_results[0]
    aggregated_timestamps = storage.read(ar.get_timestamps_path())

    # Interval indexes
    payload["interval_index"] = []
    interval_index = 0
    for _ in aggregated_timestamps:
        payload["interval_index"].append(interval_index)
        interval_index += 1

    # TODO: Sites
    # TODO: File indexes

    # Timestamps
    payload["aggregated_timestamps"] = [at[0] for at in aggregated_timestamps]

    # Labels
    aggregated_labels = AggregatedLabelStorage.read_from_storage(
        storage=storage,
        band=band,
        integration=integration,
    )
    for al in aggregated_labels:
        key = f"{FileSheet.label_prefix.value}{al.property}"
        payload[key] = al.values

    # Reduced features
    ranges = RangeStorage.read_from_storage(storage)
    reducers = ReducerStorage.read_from_storage(storage, bands, integrations, ranges)

    for reducer in reducers:
        reducer.load(band, integration)

        if not reducer.should_calculate():
            continue

        aggregated_features = storage.read(ar.get_reduced_path(reducer))
        for d in range(reducer.dimensions):
            key = f"{reducer.name}{reducer.index}_{d+1}"
            payload[key] = [af[d] for af in aggregated_features]

    # Aggregated features
    aggregated_features = storage.read(ar.path)
    for f in range(aggregated_features.shape[1]):
        key = f"af_{f+1}"
        payload[key] = [af[f] for af in aggregated_features]

    df = DataFrame(payload)
    df.to_csv(csv_path, index=False)

    print_action("Export completed!", "end")

    if callback is not None:
        callback(storage)
