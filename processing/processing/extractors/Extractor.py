from abc import ABC, abstractmethod
from typing import NamedTuple

import numpy as np

from processing.lib.utils import use_or_default


class ExtractionDataRaw(NamedTuple):
    embeddings: np.ndarray
    starts: list[int]  # relative timestamps in ms
    ends: list[int]  # relative timestamps in ms


class _Window(NamedTuple):
    samples: np.ndarray
    start: int
    end: int


# todo: add optional flags for aggregation strategies
class Extractor(ABC):
    def __init__(
        self,
        window_ms: int,
        hop_ms: int | None = None,
    ):
        self.window_ms = window_ms
        self.hop_ms = use_or_default(hop_ms, window_ms)

    @abstractmethod
    def extract(
        self,
        path: str,
    ) -> ExtractionDataRaw:
        pass

    @staticmethod
    def _validate_extracted(extracted: ExtractionDataRaw):
        if len(extracted.embeddings) == len(extracted.starts) == len(extracted.ends):
            return

        raise ValueError("Extracted shape is invalid")

    @staticmethod
    def _filter(
        samples: np.ndarray,
        sample_rate: int | float,
        freq_low: int,
        freq_high: int,
    ):
        from maad import sound

        filtered: np.ndarray = sound.select_bandwidth(
            x=samples,
            fs=sample_rate,
            fcut=[freq_low, freq_high],
            forder=6,
            fname="butter",
            ftype="bandpass",
        )

        return filtered

    def _iterate_samples(
        self,
        samples: np.ndarray,
        sample_rate: int | float,
    ):
        window_samples = int(self.window_ms / 1000 * sample_rate)
        hop_samples = int(self.hop_ms / 1000 * sample_rate)

        position = 0

        while position + window_samples <= len(samples):
            end_samples = position + window_samples

            yield _Window(
                samples=samples[position:end_samples],
                start=int(position / sample_rate * 1000),
                end=int(end_samples / sample_rate * 1000),
            )

            # move to next
            position += hop_samples
