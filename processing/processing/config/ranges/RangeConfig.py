from typing import List, Tuple

from processing.utils.validate_int import validate_int


class RangeConfig:
    index: int
    name: str
    start: int
    end: int

    def __init__(
        self,
        index: int,
        name: str,
        start: int,
        end: int,
    ) -> None:
        validate_int(start)
        validate_int(end)

        self.index = index
        self.name = name
        self.start = start
        self.end = end

    @staticmethod
    def flatten(
        ranges: List["RangeConfig"],
    ) -> Tuple[List[str], List[int], List[int]]:
        names = [r.name for r in ranges]
        starts = [r.start for r in ranges]
        ends = [r.end for r in ranges]

        return names, starts, ends

    @staticmethod
    def reconstruct(
        names: List[str],
        starts: List[int],
        ends: List[int],
    ) -> List["RangeConfig"]:
        ranges = []

        for index, name in enumerate(names):
            range_ = RangeConfig(
                index=index,
                name=name,
                start=starts[index],
                end=ends[index],
            )

            ranges.append(range_)

        return ranges
