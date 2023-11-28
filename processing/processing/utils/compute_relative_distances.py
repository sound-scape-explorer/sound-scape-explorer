from typing import List

import scipy
from numpy import ndarray
from pandas import DataFrame

from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig


def compute_relative_distances(
    pack: List[TrajectoryConfig],
    paths: List[DataFrame],
    starting_point: ndarray,
    mean_distance: float,
) -> List[List[float]]:
    relative_distances = []

    for t, _ in enumerate(pack):
        relative_distance = (
            scipy.spatial.distance.cdist(
                paths[t],
                starting_point,
                metric="euclidean",
            )
            / mean_distance
        )

        relative_distances.append(relative_distance[:, 0])

    return relative_distances
