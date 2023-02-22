from typing import TypedDict


class ConfigBand(TypedDict):
    """Configuration band interface.

    Attributes:
        low: The min frequency in Hz.
        high: The max frequency in Hz.
    """
    low: int
    high: int
