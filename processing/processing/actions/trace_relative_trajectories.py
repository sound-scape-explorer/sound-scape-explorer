import numpy
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
            pack_relative_distances = []
            pack_relative_timestamps = []

            # building arrays to populate
            for _ in enumerate(trajectories):
                pack_relative_distances.append([])
                pack_relative_timestamps.append([])

            # iterating through computation UMAPs
            for computation_umap in track(
                computation_umaps,
                description=f"Tracing {label_property}: {label_value}",
            ):
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
                    pack_relative_timestamps[t].append(relative_timestamps)

                starting_point = compute_starting_point(paths)

                knner.fit(computation_umap)
                dknn, _ = knner.kneighbors(starting_point)
                mean_distance = numpy.mean(dknn)

                for t, _ in enumerate(trajectories):
                    relative_distances = compute_relative_distances(
                        path=paths[t],
                        starting_point=starting_point,
                        mean_distance=mean_distance,
                    )

                    pack_relative_distances[t].append(relative_distances)

            # median arrays and write to storage
            for t, trajectory in enumerate(trajectories):
                to_store = numpy.median(pack_relative_distances[t], axis=0)
                to_store2 = numpy.median(pack_relative_timestamps[t], axis=0)

                RelativeTracedStorage.write_distances(
                    storage=storage,
                    trajectory=trajectory,
                    ar=ar,
                    relative_distances=to_store,
                    label_property=label_property,
                    label_value=label_value,
                )

                RelativeTracedStorage.write_timestamps(
                    storage=storage,
                    trajectory=trajectory,
                    ar=ar,
                    relative_timestamps=to_store2,
                )

    print_action("Tracing relative trajectories completed!", "end")
    invoke_menu(storage, callback)
