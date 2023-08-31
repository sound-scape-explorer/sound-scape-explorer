from abc import ABC, abstractmethod
from typing import Any, Iterable, List, Optional

from processing.config.bands.BandConfig import BandConfig
from processing.loaders.Loader import Loader
from processing.loaders.SoundSlice import SoundSlice
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath

Extracted = List[List[Any]]


class Extractor(ABC):
    index: int
    __expected_sample_rate: Optional[int] = None
    __band: Optional[BandConfig] = None
    __offset: Optional[int] = None
    __step: Optional[int] = None
    is_persist: bool = False

    @property
    def path(self):
        assert self.index is not None, "Please add an extractor index"
        return f"{StoragePath.extracted.value}/{self.band.name}/{self.index}"

    @property
    def expected_sample_rate(self) -> int:
        assert (
            self.__expected_sample_rate is not None
        ), "Please define expected sample rate"
        return self.__expected_sample_rate

    @expected_sample_rate.setter
    def expected_sample_rate(self, expected_sample_rate: int) -> int:
        self.__expected_sample_rate = expected_sample_rate
        return self.__expected_sample_rate

    @property
    def band(self) -> BandConfig:
        assert self.__band is not None, "Please define band"
        return self.__band

    @band.setter
    def band(self, band: BandConfig) -> BandConfig:
        self.__band = band
        return self.__band

    @property
    def offset(self) -> int:
        assert self.__offset is not None, "Please define offset"
        return self.__offset

    @offset.setter
    def offset(self, offset: int) -> int:
        self.__offset = offset
        return self.__offset

    @property
    def step(self) -> int:
        assert self.__step is not None, "Please define step"
        return self.__step

    @step.setter
    def step(self, step: int) -> int:
        self.__step = step
        return self.__step

    @abstractmethod
    def extract(self, loader: Loader) -> Extracted:
        pass

    def persist(self):
        self.is_persist = True

    def store(self, data: Extracted, storage: Storage):
        storage.append(
            path=self.path,
            data=data,
            compression=True,
            attributes={
                "extractor": self.__class__.__name__,
                "offset": str(self.offset),
                "step": str(self.step),
                "method": "for step in file in site",
            },
        )

    def sound_walk(self, loader: Loader) -> Iterable[SoundSlice]:
        sample_rate = loader.sound.sample_rate
        filtered = loader.sound.get_filtered(self.band)

        t = int(self.offset / 1000 * sample_rate)
        step = int(self.step / 1000 * sample_rate)

        while t < len(filtered):
            start = t
            end = start + step

            slice_ = filtered[start:end]

            # skipping for incomplete step
            if len(slice_) < step:
                t += step
                continue

            t += step

            yield SoundSlice(slice_, start, end)
