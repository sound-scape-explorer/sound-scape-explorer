from dataclasses import dataclass, field
from typing import List

from processing.new.FileConfigNew import FileConfigNew


@dataclass(frozen=True, order=True)
class Block:  # aka Slice / EnrichedAudio
    start: int
    end: int
    file: FileConfigNew


@dataclass(frozen=True, order=True)
class Interval:
    start: int
    end: int
    blocks: List[Block] = field(default_factory=list)
