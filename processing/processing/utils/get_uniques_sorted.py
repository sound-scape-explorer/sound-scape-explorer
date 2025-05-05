from typing import Any

import numpy as np


def get_uniques_sorted(array: list[Any]) -> list[str]:
    return [str(v) for v in np.unique(array)]
