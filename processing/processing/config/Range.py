from typing import Dict


class Range:
    start: int
    end: int

    def __init__(
        self,
        start: int,
        end: int,
    ) -> None:
        self.start = start
        self.end = end


RangeName = str
Ranges = Dict[RangeName, Range]
