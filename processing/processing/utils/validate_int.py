import numpy


def validate_int(value: int) -> None:
    if type(value) is int:
        return

    if type(value) is numpy.int64:
        return

    raise TypeError(f"Unable to validate int for {value}")
