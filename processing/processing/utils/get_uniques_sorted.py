from typing import Any, List

import numpy as np


def get_uniques_sorted(array: List[Any]) -> List[str]:
    return [str(v) for v in np.unique(array)]
