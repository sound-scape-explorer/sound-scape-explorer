from dataclasses import dataclass
from typing import List


@dataclass
class Spectrogram:
    s: List[List[float]]
    tn: List[float]
    fn: List[float]
    ext: List[float]
