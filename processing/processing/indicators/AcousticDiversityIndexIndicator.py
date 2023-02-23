from typing import List

import maad.features
import numpy

from processing.indicators.AbstractIndicator import AbstractIndicator
from processing.storage.Storage import Storage


class AcousticDiversityIndexIndicator(AbstractIndicator):
    def __init__(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        super().__init__(band, integration, file_index)

    def store(
        self,
        storage: Storage,
    ) -> None:
        storage.create_group_indicator_adi(
            band=self._band,
            integration=self._integration,
            file_index=self._file_index,
            values=self._values,
        )

    def calculate(
        self,
        spectrogram_amplitude: List[List[float]],
        spectrogram_amplitude_fn: List[float],
    ) -> None:
        if spectrogram_amplitude is None \
                or spectrogram_amplitude_fn is None:
            self._values.append(numpy.nan)
            return

        adi = maad.features.acoustic_diversity_index(
            Sxx=spectrogram_amplitude,
            fn=spectrogram_amplitude_fn,
            fmax=10000,
            dB_threshold=-30,
        )

        self._values.append(adi)
