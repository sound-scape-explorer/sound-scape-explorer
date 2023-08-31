from typing import Optional

from rich.progress import track

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.common.TracedStorage import TracedStorage
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.labels.LabelStorage import LabelStorage
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.print_action import print_action
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.print_trajectories import print_trajectories


def trace_trajectories(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    print_action("Tracing trajectories started!", "start")

    TracedStorage.delete(storage)

    trajectories = TrajectoryStorage.read_from_storage(storage)
    print_trajectories(trajectories)

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    ranges = RangeStorage.read_from_storage(storage)
    reducers = ReducerStorage.read_from_storage(storage, bands, integrations, ranges)
    labels_properties = LabelStorage.read_properties_from_storage(storage)
    extractors = ExtractorStorage.read_from_storage(storage)
    nn_extractors = filter_nn_extractors(extractors)
    aggregated_reduceables = AggregatedReduceable.reconstruct(
        bands=bands,
        integrations=integrations,
        nn_extractors=nn_extractors,
    )

    for ar in aggregated_reduceables:
        aggregated_timestamps = storage.read(ar.get_timestamps_path())
        aggregated_labels = storage.read(ar.get_labels_path())

        for reducer in reducers:
            reducer.load(ar.band, ar.integration)

            if not reducer.should_calculate():
                continue

            reduced_features = storage.read(ar.get_reduced_path(reducer))

            for trajectory in track(
                trajectories,
                description=(
                    f"Band {ar.band.name}"
                    f", integration {ar.integration.name}"
                    f", reducer {reducer.name}{reducer.dimensions}"
                ),
            ):
                trajectory.create_instance(
                    band=ar.band,
                    integration=ar.integration,
                    reducer=reducer,
                )

                trajectory.instance.load(
                    features=reduced_features,
                    timestamps=aggregated_timestamps,
                    timestamp_start=trajectory.start,
                    timestamp_end=trajectory.end,
                    labels_properties=labels_properties,
                    labels_values=aggregated_labels,
                    step=trajectory.step,
                )

                trajectory.instance.calculate(
                    trajectory_label_property=trajectory.label_property,
                    trajectory_label_value=trajectory.label_value,
                )

                TracedStorage.write_data(storage, trajectory, reducer, ar)
                TracedStorage.write_timestamps(storage, trajectory, reducer, ar)
                TracedStorage.write_relative_timestamps(
                    storage,
                    trajectory,
                    reducer,
                    ar,
                )

    print_action("Tracing trajectories completed!", "end")

    if callback is not None:
        callback(storage)
