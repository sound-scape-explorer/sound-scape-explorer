from typing import Dict


class Band:
    low: int
    high: int

    def __init__(
        self,
        low: int,
        high: int,
    ) -> None:
        self.low = low
        self.high = high


BandName = str
Bands = Dict[BandName, Band]
