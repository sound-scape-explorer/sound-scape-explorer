from rich.progress import track

from processing.context import Context
from processing.managers.ReductionManager import ReductionManager
from processing.printers.print_action import print_action
from processing.printers.print_trajectories import print_trajectories
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.repositories.ReducedRepository import ReducedRepository
from processing.repositories.TracedRepository import TracedRepository
from processing.services.IntervalService import IntervalService
from processing.trajectories.SingleTrajectory import SingleTrajectory
from processing.validators.validate_aggregated import validate_aggregated
from processing.validators.validate_reduced import validate_reduced


@validate_aggregated
@validate_reduced
def run_trajectories(context: Context):
    print_action("Tracing trajectories started!", "start")

    TracedRepository.delete(context)

    for ri in ReductionManager.iterate_all(context):
        print_trajectories(ri.extraction.trajectories)

        all_aggregated = AggregatedRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
        )

        reduced = ReducedRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
            reducer=ri.reducer,
        )

        intervals = IntervalService.build_intervals(all_aggregated)

        for trajectory in track(
            ri.extraction.trajectories,
            description=(
                f"Extraction {ri.extraction.name}"
                f", band {ri.band.name}"
                f", integration {ri.integration.name}"
                f", reducer {ri.reducer.impl.name}{ri.reducer.dimensions}"
            ),
        ):
            t = SingleTrajectory(
                trajectory=trajectory,
                embeddings=reduced,
                intervals=intervals,
            )

            data = t.run()

            TracedRepository.to_storage(
                context=context,
                extraction=ri.extraction,
                band=ri.band,
                integration=ri.integration,
                reducer=ri.reducer,
                trajectory=trajectory,
                data=data,
            )

    print_action("Tracing trajectories completed!", "end")
