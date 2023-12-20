from rich.progress import track

from processing.common.TracedStorage import TracedStorage
from processing.config.labels.LabelStorage import LabelStorage
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.build_aggregated_reduceables import build_aggregated_reduceables
from processing.utils.build_reducers import read_reducers
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.print_trajectories import print_trajectories
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_configuration import validate_configuration
from processing.utils.validate_reduced import validate_reduced


@validate_configuration
@validate_aggregated
@validate_reduced
def trace_trajectories(
    storage: Storage,
    callback: MenuCallback,
):
    print_action("Tracing trajectories started!", "start")

    TracedStorage.delete(storage)

    trajectories = TrajectoryStorage.read_from_storage(storage)
    print_trajectories(trajectories)

    reducers = read_reducers(storage)
    ars = build_aggregated_reduceables(storage)
    labels_properties = LabelStorage.read_properties_from_storage(storage)

    for ar in ars:
        aggregated_timestamps = ar.read_timestamps_from_storage(storage)
        aggregated_labels = ar.read_labels_from_storage(storage)

        for reducer in reducers:
            reducer.load(ar.band, ar.integration)

            if not reducer.should_calculate():
                continue

            reduced_features = ar.read_reduced_from_storage(storage, reducer)

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
    invoke_menu(storage, callback)
