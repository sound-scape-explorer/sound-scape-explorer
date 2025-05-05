import numpy as np

import scipy
from pandas import DataFrame


def compute_relative_distances(
    path: DataFrame,
    starting_point: np.ndarray,
    mean_distance: float,
):
    relative_distance = (
        scipy.spatial.distance.cdist(
            path,
            starting_point,
            metric="euclidean",
        )
        / mean_distance
    )

    return relative_distance[:, 0]
