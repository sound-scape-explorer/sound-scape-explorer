def is_within_interval(
    interval_start: int,
    interval_end: int,
    data_start: int,
    data_end: int,
) -> bool:
    """Check if data timestamps fall within the specified interval.

    Determines whether the given data's start and end timestamps are contained
    within the specified interval. The function will return `True` even if the
    data partially overlaps with the interval.

    It is essential to use the same time unit for all timestamps for consistent results.

    Note:
        - The interval is defined by the `interval_start` (inclusive) and
          `interval_end` (exclusive).
        - The function will return `True` if the data spans across the interval
          boundaries.

    Args:
        interval_start (int): The start timestamp of the interval.
        interval_end (int): The end timestamp of the interval.
        data_start (int): The start timestamp of the data.
        data_end (int): The end timestamp of the data.

    Returns:
        `True` if any part of the data falls within the interval, `False` otherwise.
    """
    if (
        (interval_start <= data_start < interval_end)
        or (interval_start < data_end < interval_end)
        or (data_start <= interval_start and data_end >= interval_end)
    ):
        return True

    return False
