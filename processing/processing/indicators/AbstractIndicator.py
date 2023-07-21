from abc import ABC, abstractmethod
from typing import List

import numpy

from processing.audio.Audio import Audio


class AbstractIndicator(ABC):
    values: List[float]

    def __init__(
        self,
    ) -> None:
        self.values = []

    @abstractmethod
    def calculate(
        self,
        audio: Audio,
    ) -> None:
        pass

    def add_value(
        self,
        value: float,
    ) -> None:
        self.values.append(value)

    def add_nan(self) -> None:
        self.values.append(numpy.nan)
