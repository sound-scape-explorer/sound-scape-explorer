from rich.progress import track

from processing.common.AggregatedReducible import AggregatedReducible
from processing.context import Context
from processing.new.LabelManager import LabelManager
from processing.new.TracedManager import TracedManager
from processing.utils.print_action import print_action
from processing.utils.print_trajectories import print_trajectories
from processing.utils.validate_aggregated import validate_aggregated
from processing.utils.validate_configuration import validate_configuration
from processing.utils.validate_reduced import validate_reduced


@validate_configuration
@validate_aggregated
@validate_reduced
def trace_trajectories(context: Context):
    print_action("Tracing trajectories started!", "start")
    print_trajectories(context)

    TracedManager.delete(context)

    storage = context.storage
    trajectories = context.config.trajectories
    reducers = context.config.reducers
    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors

    reducibles = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        extractors=extractors,
    )

    labels_properties = LabelManager.get_properties(context)

    for reducible in reducibles:
        aggregated_timestamps = reducible.read_timestamps_from_storage(storage)
        aggregated_labels = reducible.read_labels_from_storage(storage)

        for reducer in reducers:
            reducer.start(reducible.band, reducible.integration)

            # if not reducer.should_calculate():
            #     continue

            reduced_features = reducible.read_reduced_from_storage(storage, reducer)

            for trajectory in track(
                trajectories,
                description=(
                    f"Band {reducible.band.name}"
                    f", integration {reducible.integration.name}"
                    f", reducer {reducer.impl.name}{reducer.dimensions}"
                ),
            ):
                trajectory.create_instance(
                    band=reducible.band,
                    integration=reducible.integration,
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

                TracedManager.to_storage(
                    context=context,
                    trajectory=trajectory,
                    reducer=reducer,
                    ar=reducible,
                )

    print_action("Tracing trajectories completed!", "end")
