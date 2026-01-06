from typing import Any

import numpy as np


def assert_shape(
    array: np.ndarray,
    shape: tuple[Any] | tuple[Any, Any],
):
    assert array.shape == shape, f"shape {array.shape} should be {shape}"
