from rich.progress import track

from processing.context import Context
from processing.managers.ReductionManager import ReductionManager
from processing.printers.print_action import print_action
from processing.printers.print_trajectories import print_trajectories
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.ReductionRepository import ReductionRepository
from processing.repositories.TrajectoryRepository import TrajectoryRepository
from processing.services.IntervalService import IntervalService
from processing.trajectories.SingleTrajectory import SingleTrajectory
from processing.validators.validate_aggregated import validate_aggregated
from processing.validators.validate_reductions import validate_reductions


@validate_aggregated
@validate_reductions
def run_trajectories(context: Context):
    print_action("Tracing trajectories started!", "start")

    TrajectoryRepository.delete(context)

    for ri in ReductionManager.iterate_all(context):
        print_trajectories(ri.extraction.trajectories)

        aggregations = AggregationRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
        )

        reductions = ReductionRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
            reducer=ri.reducer,
        )

        intervals = IntervalService.build_intervals(aggregations)

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
                embeddings=reductions,
                intervals=intervals,
            )

            data = t.run()

            TrajectoryRepository.to_storage(
                context=context,
                extraction=ri.extraction,
                band=ri.band,
                integration=ri.integration,
                reducer=ri.reducer,
                trajectory=trajectory,
                data=data,
            )

    print_action("Tracing trajectories completed!", "end")
