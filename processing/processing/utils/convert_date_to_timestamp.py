import datetime

from pandas import Timestamp


def convert_date_to_timestamp(date: Timestamp) -> int:
    """Converts a date to timestamp.

    The resulting timestamp is in UNIX format and milliseconds.

    Args:
        date: A pandas Timestamp object.

    Returns:
        The timestamp in milliseconds as an integer.
    """

    timestamp_seconds = datetime.datetime.timestamp(date)
    timestamp_milliseconds = timestamp_seconds * 1000

    return int(timestamp_milliseconds)
