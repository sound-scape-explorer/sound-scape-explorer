from typing import List, Tuple

from processing.utils.validate_int import validate_int


class BandConfig:
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
    def flatten(
        bands: List["BandConfig"],
    ) -> Tuple[List[str], List[int], List[int]]:
        names = [b.name for b in bands]
        lows = [b.low for b in bands]
        highs = [b.high for b in bands]

        return names, lows, highs

    @staticmethod
    def reconstruct(
        names: List[str],
        lows: List[int],
        highs: List[int],
    ) -> List["BandConfig"]:
        bands = []

        for index, name in enumerate(names):
            band = BandConfig(
                index=index,
                name=name,
                low=lows[index],
                high=highs[index],
            )

            bands.append(band)

        return bands
