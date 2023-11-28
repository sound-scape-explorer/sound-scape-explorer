from typing import List

import pandas
from numpy import ndarray


def compute_starting_point(
    paths: List[pandas.DataFrame],
) -> ndarray:
    sum_ = 0

    for path in paths:
        sum_ += path.to_numpy()[0].reshape(1, -1)

    starting_point: ndarray = sum_ / len(paths)  # type: ignore
    return starting_point
