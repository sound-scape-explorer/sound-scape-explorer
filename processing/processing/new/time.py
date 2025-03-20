from datetime import datetime


def convert_date_string_to_timestamp(date_string: str) -> int:
    date = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
    return int(date.timestamp() * 1000)
