from datetime import datetime


def convert_timestamp_to_date(timestamp: int) -> str:
    seconds = timestamp / 1000
    return datetime.fromtimestamp(seconds).strftime("%Y-%m-%d %H:%M:%S")
