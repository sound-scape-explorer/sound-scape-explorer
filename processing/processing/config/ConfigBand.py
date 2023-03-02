from typing import Dict

from processing.utils.validate_int import validate_int


class ConfigBand:
    name: str
    low: int
    high: int

    def __init__(
        self,
        name: str,
        low: int,
        high: int,
    ) -> None:
        self.name = name

        validate_int(low)
        validate_int(high)

        self.low = low
        self.high = high


Band = str
ConfigBands = Dict[Band, ConfigBand]
