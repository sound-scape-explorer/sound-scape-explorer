import numpy as np
from rich.progress import track
from sklearn.neighbors import NearestNeighbors

from processing.common.ComputationUmapStorage import ComputationUmapStorage
from processing.common.RelativeTracedStorage import RelativeTracedStorage
from processing.config.labels.LabelStorage import LabelStorage
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.utils.build_aggregated_reduceables import build_aggregated_reduceables
from processing.utils.compute_relative_distances import compute_relative_distances
from processing.utils.compute_starting_point import compute_starting_point
from processing.utils.invoke_menu import invoke_menu
from processing.utils.pack_trajectories import pack_trajectories
from processing.utils.print_action import print_action
from processing.utils.print_aggregated_reduceables import print_aggregated_reduceables
from processing.utils.print_packed_trajectories import print_packed_trajectories
from processing.utils.read_trajectory_path_and_relative_timestamps import (
    read_trajectory_path_and_relative_timestamps,
)
from processing.utils.validate_computation_umap import validate_computation_umap
from processing.utils.validate_configuration import validate_configuration
from processing.utils.walk_packed_trajectories import walk_packed_trajectories


@validate_configuration
@validate_computation_umap
def trace_relative_trajectories(
    storage: Storage,
    callback: MenuCallback,
) -> None:
    print_action("Tracing relative trajectories started!", "start")

    RelativeTracedStorage.delete(storage)

    trajectories = TrajectoryStorage.read_from_storage(storage)
    packs = pack_trajectories(trajectories)
    print_packed_trajectories(packs)

    ars = build_aggregated_reduceables(storage)
    print_aggregated_reduceables(ars, storage)

    labels_properties = LabelStorage.read_properties_from_storage(storage)
    knner = NearestNeighbors(n_neighbors=100)

    for ar in ars:
        ar_timestamps = ar.read_timestamps_from_storage(storage)
        ar_labels = ar.read_labels_from_storage(storage)

        computation_umaps = ComputationUmapStorage.read_from_storage(
            storage=storage,
            band=ar.band,
            integration=ar.integration,
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
                computation_umaps,
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
                relative_distances_median = np.median(
                    relative_distances_pack[t],
                    axis=0,
                )
                relative_timestamps_median = np.median(
                    relative_timestamps_pack[t],
                    axis=0,
                )

                RelativeTracedStorage.write_distances(
                    storage=storage,
                    trajectory=trajectory,
                    ar=ar,
                    relative_distances=relative_distances_median,
                    label_property=label_property,
                    label_value=label_value,
                )

                RelativeTracedStorage.write_timestamps(
                    storage=storage,
                    trajectory=trajectory,
                    ar=ar,
                    relative_timestamps=relative_timestamps_median,
                )

                # compute deciles for deviation display
                lower_deciles: np.ndarray[np.float64] = np.percentile(
                    relative_distances_pack[t],
                    10,
                    axis=0,
                )

                upper_deciles: np.ndarray[np.float64] = np.percentile(
                    relative_distances_pack[t],
                    90,
                    axis=0,
                )

                RelativeTracedStorage.write_deciles(
                    storage=storage,
                    trajectory=trajectory,
                    ar=ar,
                    lower_deciles=lower_deciles,
                    upper_deciles=upper_deciles,
                )

    print_action("Tracing relative trajectories completed!", "end")
    invoke_menu(storage, callback)
