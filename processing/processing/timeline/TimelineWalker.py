from typing import Dict, List, Optional

from tqdm import tqdm

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.extractors.Extractor import Extracted, Extractor
from processing.storage.Storage import Storage
from processing.timeline.FileLoader import FileLoader
from processing.timeline.Timeline import Timeline
from processing.utils.print_new_line import print_new_line

FileIndex = int
BandIndex = int
ExtractorIndex = int


class TimelineWalker:
    def __init__(self) -> None:
        self.__timelines: Optional[List[Timeline]] = None
        self.__bands: Optional[List[BandConfig]] = None
        self.__integrations: Optional[List[IntegrationConfig]] = None
        self.__extractors: Optional[List[Extractor]] = None
        self.__storage: Optional[Storage] = None

        self.loaders: Dict[FileIndex, FileLoader] = {}
        self.extracted: Dict[
            FileIndex, Dict[BandIndex, Dict[ExtractorIndex, Extracted]]
        ] = {}

        # Current file index
        self.cfi = None

    @property
    def timelines(self) -> List[Timeline]:
        assert self.__timelines is not None, "Please attach timelines"
        return self.__timelines

    @timelines.setter
    def timelines(self, timelines: List[Timeline]) -> List[Timeline]:
        self.__timelines = timelines
        return self.__timelines

    @property
    def bands(self) -> List[BandConfig]:
        assert self.__bands is not None, "Please attach bands"
        return self.__bands

    @bands.setter
    def bands(self, bands: List[BandConfig]) -> List[BandConfig]:
        self.__bands = bands
        return self.__bands

    @property
    def integrations(self) -> List[IntegrationConfig]:
        assert self.__integrations is not None, "Please attach integrations"
        return self.__integrations

    @integrations.setter
    def integrations(
        self, integrations: List[IntegrationConfig]
    ) -> List[IntegrationConfig]:
        self.__integrations = integrations
        return self.__integrations

    @property
    def extractors(self) -> List[Extractor]:
        assert self.__extractors is not None, "Please attach extractors"
        return self.__extractors

    @extractors.setter
    def extractors(self, extractors: List[Extractor]) -> List[Extractor]:
        self.__extractors = extractors
        return self.__extractors

    @property
    def storage(self) -> Storage:
        assert self.__storage is not None, "Please attach storage"
        return self.__storage

    @storage.setter
    def storage(self, storage: Storage) -> Storage:
        self.__storage = storage
        return self.__storage

    def print(self, timeline: Timeline):
        print_new_line()
        print(
            f"Walking intervals in site {timeline.site.name}"
            f" with integration {timeline.integration.seconds}"
        )

    def print_leftovers(self):
        print_new_line()
        print("Memory leftovers")
        # show extracted data
        for k, v in self.extracted.items():
            for kk, vv in v.items():
                for kkk, vvv in vv.items():
                    print(k, kk, kkk, len(vvv[0]))

        # show loaded files
        for _, loader in self.loaders.items():
            print(type(loader.loader.torch.audio))
            print(type(loader.loader.sound.audio))

    def __enumerate(self):
        for timeline in self.timelines:
            self.print(timeline)
            for interval in tqdm(timeline.intervals):
                for band_index, band in enumerate(self.bands):
                    for extractor_index, extractor in enumerate(self.extractors):
                        yield (
                            timeline,
                            interval,
                            band_index,
                            band,
                            extractor_index,
                            extractor,
                        )

    def walk(self):
        for timeline, interval, b, band, e, extractor in self.__enumerate():
            interval_data = []

            for b_, block in enumerate(interval.blocks):
                f = block.file.index

                # Load file
                if f not in self.loaders.keys():
                    loader = FileLoader(block.file)
                    loader.load()

                    self.loaders[f] = loader

                if f not in self.extracted.keys():
                    self.extracted[f] = {}

                # Load band
                if b not in self.extracted[f].keys():
                    self.extracted[f][band.index] = {}

                # Load extractor
                if e not in self.extracted[f][b].keys():
                    extractor.index = e
                    extractor.band = band

                    loader = self.loaders[f]
                    self.extracted[f][b][e] = extractor.extract(loader.loader)

                    if extractor.is_persist:
                        # Store only for first integration
                        # this could be above
                        if timeline.integration.index == 0:
                            extractor.store(self.extracted[f][b][e], self.storage)

                duration = (block.end - block.start) // 1000  # seconds
                start = (block.start - interval.start) // 1000  # seconds
                end = start + duration

                file_data = self.extracted[f][b][e]
                block_data = file_data[start:end]
                interval_data = [*interval_data, *block_data]

                is_last_integration = (
                    timeline.integration.index == len(self.integrations) - 1
                )
                is_last_band = b == len(self.bands) - 1
                is_last_extractor = e == len(self.extractors) - 1
                is_last_block = b_ == len(interval.blocks) - 1

                is_last_op = (
                    is_last_integration
                    and is_last_band
                    and is_last_extractor
                    and is_last_block
                )

                # Purge
                # TODO: this lefts over the last operation in memory
                if self.cfi is not None and f != self.cfi:
                    del self.extracted[self.cfi]
                    # loaded[cfi].destroy()

                if self.cfi is not None and is_last_op:
                    self.loaders[self.cfi].release()

                self.cfi = f

            yield interval_data, band, timeline.integration, extractor
