from processing.utils.config.parse_config import parse_config

_cached_config = None


def get_config():
    global _cached_config

    if _cached_config is None:
        _cached_config = parse_config()

    return _cached_config
