from typing import Optional

from rich.progress import track

from processing.common.AggregatedReduceable import AggregatedReduceable
from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.filter_nn_extractors import filter_nn_extractors
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.print_trajectories import print_trajectories
from processing.utils.print_trajectories_end import print_trajectories_end
from processing.utils.print_trajectories_start import print_trajectories_start


def trace_trajectories(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    print_trajectories_start()

    storage.delete(StoragePath.traced)

    trajectories = TrajectoryStorage.read_from_storage(storage)
    print_trajectories(trajectories)

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

    for ar in track(aggregated_reduceables):
        aggregated_timestamps = storage.read(ar.get_timestamps_path())

        for reducer in reducers:
            reducer.load(ar.band, ar.integration)

            if not reducer.should_calculate():
                continue

            reduced_features = storage.read(ar.get_reduced_path(reducer))

            for trajectory in trajectories:
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
                )

                trajectory.instance.calculate()

                path = (
                    f"{StoragePath.traced.value}"
                    f"/{ar.band.name}"
                    f"/{ar.integration.seconds}"
                    f"/{ar.extractor.index}"
                    f"/{reducer.index}"
                    f"/{trajectory.index}"
                )

                storage.write(
                    path=path,
                    data=trajectory.instance.values,
                    compression=True,
                    attributes={
                        "extractor_index": str(ar.extractor.index),
                        "reducer_index": str(reducer.index),
                        "trajectory_index": str(trajectory.index),
                    },
                )

    print_trajectories_end()

    if callback is not None:
        callback(storage)
