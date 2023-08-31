import math
from typing import Any

import numpy


def is_nan(payload: Any) -> bool:
    return (type(payload) is float or type(payload) is numpy.float64) and math.isnan(
        payload
    )
