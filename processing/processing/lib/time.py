from datetime import datetime

_TIME_FORMAT = "%Y-%m-%d %H:%M:%S"


def convert_date_string_to_timestamp(date_string: str) -> int:
    date = datetime.strptime(date_string, _TIME_FORMAT)
    return int(date.timestamp() * 1000)


def convert_timestamp_to_date_string(timestamp: int) -> str:
    seconds = timestamp / 1000
    return datetime.fromtimestamp(seconds).strftime(_TIME_FORMAT)
