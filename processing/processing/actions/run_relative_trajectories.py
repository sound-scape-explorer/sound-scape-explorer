import numpy as np
from rich.progress import track
from sklearn.neighbors import NearestNeighbors

from processing.context import Context
from processing.lib.legacy import convert_aggregated_to_legacy_flat
from processing.managers.ReductionManager import ReductionManager
from processing.printers.print_action import print_action
from processing.printers.print_packed_trajectories import print_packed_trajectories
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.repositories.ComputedRepository import ComputedRepository
from processing.repositories.RelativeTracedRepository import RelativeTracedRepository
from processing.utils.compute_relative_distances import compute_relative_distances
from processing.utils.compute_starting_point import compute_starting_point
from processing.utils.pack_trajectories import pack_trajectories
from processing.utils.read_trajectory_path_and_relative_timestamps import (
    read_trajectory_path_and_relative_timestamps,
)
from processing.utils.walk_packed_trajectories import walk_packed_trajectories
from processing.validators.validate_computations import validate_computations


@validate_computations
def run_relative_trajectories(context: Context):
    print_action("Tracing relative trajectories started!", "start")

    RelativeTracedRepository.delete(context)

    knner = NearestNeighbors(n_neighbors=100)

    for ri in ReductionManager.iterate_all(context):
        trajectories = ri.extraction.trajectories
        packs = pack_trajectories(trajectories)
        print_packed_trajectories(packs)

        all_aggregated = AggregatedRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
        )

        all_computed = ComputedRepository.from_storage(
            context=context,
            extraction=ri.extraction,
            band=ri.band,
            integration=ri.integration,
        )

        legacy = convert_aggregated_to_legacy_flat(context, all_aggregated)

        # a pack is a list of trajectories linked by the same label
        for tag_name, tag_value, trajectories in walk_packed_trajectories(packs):
            # TODO: Add typings
            relative_distances_pack = []
            relative_timestamps_pack = []

            # building arrays to populate
            for _ in enumerate(trajectories):
                relative_distances_pack.append([])
                relative_timestamps_pack.append([])

            # iterating through computation UMAPs
            for computed in track(
                all_computed,
                description=f"Tracing {tag_name}: {tag_value}",
            ):
                # TODO: Add typings
                paths = []

                # reading path for each trajectory because all are needed to compute
                # the starting point
                for t, trajectory in enumerate(trajectories):
                    (
                        path,
                        relative_timestamps,
                    ) = read_trajectory_path_and_relative_timestamps(
                        trajectory=trajectory,
                        features=computed,
                        timestamps=legacy.timestamps,
                        all_tag_names=legacy.tag_names,
                        all_tag_values=legacy.tag_values,
                        tag_name=tag_name,
                        tag_value=tag_value,
                    )

                    paths.append(path)
                    relative_timestamps_pack[t].append(relative_timestamps)

                starting_point = compute_starting_point(paths)

                knner.fit(computed)
                dknn, _ = knner.kneighbors(starting_point)
                mean_distance = float(np.mean(dknn))

                for t, _ in enumerate(trajectories):
                    relative_distances = compute_relative_distances(
                        path=paths[t],
                        starting_point=starting_point,
                        mean_distance=mean_distance,
                    )

                    relative_distances_pack[t].append(relative_distances)

            # median arrays and write to storage
            for t, trajectory in enumerate(trajectories):
                relative_distances_median: list[float] = np.median(
                    relative_distances_pack[t],
                    axis=0,
                )

                relative_timestamps_median: list[list[float]] = np.median(
                    relative_timestamps_pack[t],
                    axis=0,
                )

                # compute deciles for deviation display
                lower_deciles: list[float] = np.percentile(
                    relative_distances_pack[t],
                    10,
                    axis=0,
                )

                upper_deciles: list[float] = np.percentile(
                    relative_distances_pack[t],
                    90,
                    axis=0,
                )

                RelativeTracedRepository.to_storage(
                    context=context,
                    extraction=ri.extraction,
                    band=ri.band,
                    integration=ri.integration,
                    reducer=ri.reducer,
                    trajectory=trajectory,
                    tag_name=tag_name,
                    tag_value=tag_value,
                    distance_medians=relative_distances_median,
                    timestamp_medians=relative_timestamps_median,
                    lower_deciles=lower_deciles,
                    upper_deciles=upper_deciles,
                )

    print_action("Tracing relative trajectories completed!", "end")
