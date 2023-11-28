import numpy
from sklearn.neighbors import NearestNeighbors

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
from processing.utils.read_trajectories_paths_and_timestamps import (
    read_trajectories_paths_and_timestamps,
)
from processing.utils.validate_configuration import validate_configuration
from processing.utils.walk_packed_trajectories import walk_packed_trajectories


@validate_configuration
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
        ar_features = ar.read_features_from_storage(storage)
        ar_timestamps = ar.read_timestamps_from_storage(storage)
        ar_labels = ar.read_labels_from_storage(storage)

        for label_property, label_value, pack in walk_packed_trajectories(packs):
            paths, relative_timestamps = read_trajectories_paths_and_timestamps(
                pack,
                features=ar_features,
                timestamps=ar_timestamps,
                labels_properties=labels_properties,
                labels_values=ar_labels,
                label_property=label_property,
                label_value=label_value,
            )

            starting_point = compute_starting_point(paths)

            knner.fit(ar_features)
            dknn, _ = knner.kneighbors(starting_point)
            mean_distance = numpy.mean(dknn)

            relative_distances = compute_relative_distances(
                pack=pack,
                paths=paths,
                starting_point=starting_point,
                mean_distance=mean_distance,
            )

            RelativeTracedStorage.write_distances(
                storage=storage,
                pack=pack,
                ar=ar,
                relative_distances=relative_distances,
            )

            RelativeTracedStorage.write_timestamps(
                storage=storage,
                pack=pack,
                ar=ar,
                relative_timestamps=relative_timestamps,
            )

    print_action("Tracing relative trajectories completed!", "end")
    invoke_menu(storage, callback)
