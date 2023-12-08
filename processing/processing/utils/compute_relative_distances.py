from typing import List

import scipy
from numpy import ndarray
from pandas import DataFrame


def compute_relative_distances(
    path: DataFrame,
    starting_point: ndarray,
    mean_distance: float,
) -> List[List[float]]:
    relative_distance = (
        scipy.spatial.distance.cdist(
            path,
            starting_point,
            metric="euclidean",
        )
        / mean_distance
    )

    return relative_distance[:, 0]
