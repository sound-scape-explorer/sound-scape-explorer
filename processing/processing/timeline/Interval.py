from dataclasses import dataclass, field
from typing import List

from processing.config.ConfigFile import ConfigFile


@dataclass(frozen=True, order=True)
class Block:  # aka Slice / EnrichedAudio
    start: int
    end: int
    file: ConfigFile


@dataclass(frozen=True, order=True)
class Interval:
    start: int
    end: int
    blocks: List[Block] = field(default_factory=list)
