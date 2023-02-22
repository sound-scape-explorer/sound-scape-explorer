from typing import TypedDict


class ConfigRange(TypedDict):
    """Configuration range interface.

    Attributes:
        start: The start timestamp.
        end: The end timestamp.
    """
    start: int
    end: int
