from processing.context import Context
from processing.interfaces import TrajectoryData
from processing.lib.console import Console
from processing.managers.ReductionManager import ReductionManager
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.ComputationRepository import ComputationRepository
from processing.repositories.RelativeTrajectoryRepository import (
    RelativeTrajectoryRepository,
)
from processing.services.IntervalService import IntervalService
from processing.services.RelativeTrajectoryService import RelativeTrajectoryService
from processing.services.TrajectoryService import TrajectoryService
from processing.trajectories.SingleTrajectory import SingleTrajectory
from processing.validators.validate_computations import validate_computations


@validate_computations
def run_relative_trajectories(context: Context):
    Console.print_header("Relative trajectories started")

    RelativeTrajectoryRepository.delete(context)

    for ri in ReductionManager.iterate_all(context):
        trajectories = ri.extraction.trajectories
        groups = TrajectoryService.group_by_tags(trajectories)
        Console.print_trajectory_groups(groups)

        aggregations = AggregationRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
        )

        intervals = IntervalService.build_intervals(aggregations)

        computations = ComputationRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
        )

        for ti in TrajectoryService.iterate_groups(groups):
            # all trajectories inside the iteration are now relating
            # to the same pair of tag name and value

            # prepare collections by trajectory to gather data from all computations
            distances_by_trajectory = [[] for _ in ti.trajectories]
            timestamps_by_trajectory = [[] for _ in ti.trajectories]

            # loop over computations to get the end relative distances and timestamps
            for computation in computations:
                trajectory_data: list[TrajectoryData] = []

                # iterate over trajectories within for that group
                for trajectory in ti.trajectories:
                    t = SingleTrajectory(
                        trajectory=trajectory,
                        embeddings=computation,
                        intervals=intervals,
                    )

                    data = t.run()
                    trajectory_data.append(data)

                reference_point = RelativeTrajectoryService.compute_reference_point(
                    trajectory_data=trajectory_data,
                )

                normalization_factor = (
                    RelativeTrajectoryService.compute_normalization_factor(
                        embeddings=computation,
                        reference_point=reference_point,
                    )
                )

                for t, _ in enumerate(ti.trajectories):
                    distances = RelativeTrajectoryService.compute_relative_distances(
                        path=trajectory_data[t].path,
                        reference_point=reference_point,
                        normalization_factor=normalization_factor,
                    )

                    distances_by_trajectory[t].append(distances)
                    timestamps_by_trajectory[t].append(trajectory_data[t].timestamps)

            # we have now our collections filled for this particular group
            # run the statistics for each trajectory
            for t, trajectory in enumerate(ti.trajectories):
                distances = distances_by_trajectory[t]
                timestamps = timestamps_by_trajectory[t]

                statistics = RelativeTrajectoryService.compute_statistics(
                    distances=distances,
                    timestamps=timestamps,
                )

                # store
                RelativeTrajectoryRepository.to_storage(
                    context=context,
                    extraction=ri.extraction,
                    band=ri.band,
                    integration=ri.integration,
                    reducer=ri.reducer,
                    trajectory=trajectory,
                    statistics=statistics,
                )

    Console.print_footer("Relative trajectories completed")
