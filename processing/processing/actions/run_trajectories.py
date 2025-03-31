from rich.progress import track

from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.LabelManager import LabelManager
from processing.new.ReducedManager import ReducedManager
from processing.new.TracedManager import TracedManager
from processing.new.iterate_reducers import iterate_reducers
from processing.printers.print_action import print_action
from processing.printers.print_trajectories import print_trajectories
from processing.validators.validate_aggregated import validate_aggregated
from processing.validators.validate_configuration import validate_configuration
from processing.validators.validate_reduced import validate_reduced


@validate_configuration
@validate_aggregated
@validate_reduced
def run_trajectories(context: Context):
    print_action("Tracing trajectories started!", "start")
    print_trajectories(context)

    TracedManager.delete(context)

    trajectories = context.config.trajectories
    labels_properties = LabelManager.get_properties(context)

    reducers = context.config.reducers
    for r in iterate_reducers(reducers):
        aggregated = AggregatedManager.from_storage(
            context,
            r.band,
            r.integration,
            r.extractor,
        )

        reduced = ReducedManager.from_storage(
            context,
            r.band,
            r.integration,
            r.extractor,
            r.reducer,
        )

        r.reducer.start(r.band, r.integration)

        for trajectory in track(
            trajectories,
            description=(
                f"Band {r.band.name}"
                f", integration {r.integration.name}"
                f", extractor {r.extractor.name}"
                f", reducer {r.reducer.impl.name}{r.reducer.dimensions}"
            ),
        ):
            trajectory.create_instance(
                band=r.band,
                integration=r.integration,
                reducer=r.reducer,
            )

            trajectory.instance.load(
                features=reduced,
                timestamps=aggregated.timestamps,
                timestamp_start=trajectory.start,
                timestamp_end=trajectory.end,
                labels_properties=labels_properties,
                labels_values=aggregated.labels,
                step=trajectory.step,
            )

            trajectory.instance.calculate(
                trajectory_label_property=trajectory.label_property,
                trajectory_label_value=trajectory.label_value,
            )

            TracedManager.to_storage(
                context=context,
                band=r.band,
                integration=r.integration,
                extractor=r.extractor,
                reducer=r.reducer,
                trajectory=trajectory,
            )

    print_action("Tracing trajectories completed!", "end")
