import datetime
from typing import Union

from pandas import Timestamp


def convert_date_to_timestamp(date_string: Union[Timestamp, str]) -> int:
    """Converts a date to timestamp.

    The resulting timestamp is in UNIX format and milliseconds.

    Args:
        date: A pandas Timestamp object.

    Returns:
        The timestamp in milliseconds as an integer.
    """

    if isinstance(date_string, str):
        date = datetime.datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
        return int(date.timestamp() * 1000)

    timestamp_seconds = datetime.datetime.timestamp(date_string)
    timestamp_milliseconds = timestamp_seconds * 1000

    return int(timestamp_milliseconds)
