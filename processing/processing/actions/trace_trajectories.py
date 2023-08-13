from rich import print
from rich.progress import track

from processing.config.bands.BandStorage import BandStorage
from processing.config.Config import Config
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import IMain
from processing.storage.AggregatedReduceableStorage import AggregatedReduceableStorage
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.print_no_configuration import print_no_configuration
from processing.utils.print_trajectories import print_trajectories


def trace_trajectories(
    storage: Storage,
    callback: IMain,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        callback(storage)
        return

    storage.delete(StoragePath.traced)

    trajectories = TrajectoryStorage.read_from_storage(storage)
    print_trajectories(trajectories)

    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    ranges = RangeStorage.read_from_storage(storage)
    reducers = ReducerStorage.read_from_storage(storage, bands, integrations, ranges)
    aggregated_reduceables = AggregatedReduceableStorage.read_from_storage(
        storage,
        bands,
        integrations,
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

    print("[bold green]:rocket: Trajectories completed![/bold green]")
    callback(storage)
