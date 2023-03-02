from typing import Dict

from processing.utils.validate_int import validate_int


class ConfigRange:
    name: str
    start: int
    end: int

    def __init__(
        self,
        name: str,
        start: int,
        end: int,
    ) -> None:
        self.name = name

        validate_int(start)
        validate_int(end)

        self.start = start
        self.end = end


Range = str
ConfigRanges = Dict[Range, ConfigRange]
