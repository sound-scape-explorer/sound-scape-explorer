from dataclasses import dataclass
from typing import List


@dataclass
class SoundSlice:
    sound: List[float]
    start: int
    end: int
