from datetime import datetime, timedelta

_TIME_FORMAT = "%Y-%m-%d %H:%M:%S"


def convert_date_string_to_timestamp(date_string: str) -> int:
    date = datetime.strptime(date_string, _TIME_FORMAT)
    return int(date.timestamp() * 1000)


def convert_timestamp_to_date_string(timestamp: int) -> str:
    seconds = timestamp / 1000
    return datetime.fromtimestamp(seconds).strftime(_TIME_FORMAT)


def format_milliseconds(ms: int) -> str:
    td = timedelta(milliseconds=ms)
    days = td.days
    hours, remainder = divmod(td.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    milliseconds = td.microseconds // 1000

    parts: list[str] = []

    if days > 0:
        parts.append(f"{days}d")
    if hours > 0:
        parts.append(f"{hours}h")
    if minutes > 0:
        parts.append(f"{minutes}m")
    if seconds > 0:
        parts.append(f"{seconds}s")
    if milliseconds > 0:
        parts.append(f"{milliseconds}ms")

    return " ".join(parts) or "0ms"
