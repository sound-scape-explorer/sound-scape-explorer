from rich.progress import track

from processing.context import Context
from processing.lib.console import Console
from processing.managers.ReductionManager import ReductionManager
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.ReductionRepository import ReductionRepository
from processing.repositories.TrajectoryRepository import TrajectoryRepository
from processing.services.IntervalService import IntervalService
from processing.trajectories.SingleTrajectory import SingleTrajectory
from processing.validators.validate_aggregations import validate_aggregations
from processing.validators.validate_reductions import validate_reductions


@validate_aggregations
@validate_reductions
def run_trajectories(context: Context):
    Console.print_header("Trajectories started")

    TrajectoryRepository.delete(context)

    for ri in ReductionManager.iterate_all(context):
        Console.print_trajectories(ri.extraction.trajectories)

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

    Console.print_footer("Trajectories completed")
