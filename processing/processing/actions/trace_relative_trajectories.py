import numpy as np
from rich.progress import track
from sklearn.neighbors import NearestNeighbors

from processing.common.AggregatedReducible import AggregatedReducible
from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.context import Context
from processing.new.LabelManager import LabelManager
from processing.new.RelativeTracedManager import RelativeTracedManager
from processing.utils.compute_relative_distances import compute_relative_distances
from processing.utils.compute_starting_point import compute_starting_point
from processing.utils.pack_trajectories import pack_trajectories
from processing.utils.print_action import print_action
from processing.utils.print_packed_trajectories import print_packed_trajectories
from processing.utils.read_trajectory_path_and_relative_timestamps import (
    read_trajectory_path_and_relative_timestamps,
)
from processing.utils.validate_computation_umap import validate_computation_umap
from processing.utils.validate_configuration import validate_configuration
from processing.utils.walk_packed_trajectories import walk_packed_trajectories


@validate_configuration
@validate_computation_umap
def trace_relative_trajectories(context: Context):
    print_action("Tracing relative trajectories started!", "start")

    RelativeTracedManager.delete(context)

    trajectories = context.config.trajectories
    packs = pack_trajectories(trajectories)
    print_packed_trajectories(packs)

    storage = context.storage
    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors

    reducibles = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        extractors=extractors,
    )

    labels_properties = LabelManager.get_properties(context)
    knner = NearestNeighbors(n_neighbors=100)

    for reducible in reducibles:
        ar_timestamps = reducible.read_timestamps_from_storage(storage)
        ar_labels = reducible.read_labels_from_storage(storage)

        computed = ComputationUmapStorage.read_from_storage(
            storage=storage,
            band=reducible.band,
            integration=reducible.integration,
        )

        # a pack is a list of trajectories linked by the same label
        for label_property, label_value, trajectories in walk_packed_trajectories(
            packs
        ):
            # TODO: Add typings
            relative_distances_pack = []
            relative_timestamps_pack = []

            # building arrays to populate
            for _ in enumerate(trajectories):
                relative_distances_pack.append([])
                relative_timestamps_pack.append([])

            # iterating through computation UMAPs
            for computation_umap in track(
                computed,
                description=f"Tracing {label_property}: {label_value}",
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
                        features=computation_umap,
                        timestamps=ar_timestamps,
                        labels_properties=labels_properties,
                        labels_values=ar_labels,
                        label_property=label_property,
                        label_value=label_value,
                    )

                    paths.append(path)
                    relative_timestamps_pack[t].append(relative_timestamps)

                starting_point = compute_starting_point(paths)

                knner.fit(computation_umap)
                dknn, _ = knner.kneighbors(starting_point)
                mean_distance = np.mean(dknn)

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

                RelativeTracedManager.to_storage(
                    context=context,
                    trajectory=trajectory,
                    reducible=reducible,
                    label_property=label_property,
                    label_value=label_value,
                    distance_medians=relative_distances_median,
                    timestamp_medians=relative_timestamps_median,
                    lower_deciles=lower_deciles,
                    upper_deciles=upper_deciles,
                )

    print_action("Tracing relative trajectories completed!", "end")
