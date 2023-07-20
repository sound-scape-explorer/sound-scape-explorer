from typing import List

from processing.utils.validate_int import validate_int


class ConfigBand:
    index: int
    name: str
    low: int
    high: int

    def __init__(
        self,
        index: int,
        name: str,
        low: int,
        high: int,
    ) -> None:
        validate_int(low)
        validate_int(high)

        self.index = index
        self.name = name
        self.low = low
        self.high = high

    @staticmethod
    def flatten(bands: List["ConfigBand"]):
        names = [b.name for b in bands]
        lows = [b.low for b in bands]
        highs = [b.high for b in bands]

        return names, lows, highs

    @staticmethod
    def reconstruct(
        names: List[str],
        lows: List[int],
        highs: List[int],
    ) -> List["ConfigBand"]:
        bands = []

        for index, name in enumerate(names):
            band = ConfigBand(
                index=index,
                name=name,
                low=lows[index],
                high=highs[index],
            )

            bands.append(band)

        return bands
