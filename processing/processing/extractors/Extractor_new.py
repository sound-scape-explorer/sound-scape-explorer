from abc import ABC, abstractmethod
from typing import Iterable, Optional

from processing.loaders.SoundSlice import SoundSlice
from processing.new.BandConfigNew import BandConfigNew
from processing.new.SoundLoaderNew import SoundLoaderNew
from processing.new.TorchLoaderNew import TorchLoaderNew
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


RawData = list[list[float]]


class Extractor(ABC):
    index: int
    __expected_sample_rate: Optional[int] = None
    __band: Optional[BandConfigNew] = None
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
    def expected_sample_rate(self, expected_sample_rate: int):
        self.__expected_sample_rate = expected_sample_rate

    @property
    def band(self) -> BandConfigNew:
        assert self.__band is not None, "Please define band"
        return self.__band

    @band.setter
    def band(self, band: BandConfigNew):
        self.__band = band

    @property
    def offset(self) -> int:
        assert self.__offset is not None, "Please define offset"
        return self.__offset

    @offset.setter
    def offset(self, offset: int):
        self.__offset = offset

    @property
    def step(self) -> int:
        assert self.__step is not None, "Please define step"
        return self.__step

    @step.setter
    def step(self, step: int):
        self.__step = step

    @abstractmethod
    def extract(self, loader: TorchLoaderNew) -> RawData:
        pass

    def persist(self):
        self.is_persist = True

    def store(self, data: RawData, storage: Storage):
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

    def sound_walk(self, loader: SoundLoaderNew) -> Iterable[SoundSlice]:
        sample_rate = loader.sample_rate
        filtered = loader.filtered

        t = int(self.offset / 1000 * sample_rate)
        step = int(self.step / 1000 * sample_rate)

        while t < len(filtered):
            start = t
            end = start + step
            t += step

            slice_ = filtered[start:end]

            # skipping for incomplete step
            if len(slice_) < step:
                continue

            yield SoundSlice(slice_, start, end)
