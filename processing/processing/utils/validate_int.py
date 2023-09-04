import numpy


def validate_int(value: int) -> None:
    if isinstance(value, int):
        return

    if type(value) is numpy.int64 or numpy.int32:
        return

    raise TypeError(f"Unable to validate int for {value}")
