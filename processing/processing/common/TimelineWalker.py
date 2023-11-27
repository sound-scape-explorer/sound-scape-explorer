from typing import Dict, List, Optional

from rich import print
from rich.progress import track

from processing.common.FileLoader import FileLoader
from processing.common.Interval import Block, Interval
from processing.common.Timeline import Timeline
from processing.config.bands.BandConfig import BandConfig
from processing.config.files.FileConfig import FileConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.extractors.Extractor import Extracted, Extractor
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line
from processing.utils.print_timeline_progress import print_timeline_progress

FileIndex = int
BandIndex = int
ExtractorIndex = int
BlockIndex = int


class TimelineWalker:
    """The walker for timelines

    Feed multiple timelines to enumerate their intervals.

    The name can be misleading as this class takes multiple timelines as input.
    This behaviour allows keeping track of loaded files and extracted data (in
    order to do it once per file and extractor).
    """

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
            loader.loader.sound.print_leftovers()

    def __enumerate(self):
        for timeline in track(self.timelines, description=("Extracting...")):
            for interval in timeline.intervals:
                print_timeline_progress(timeline, interval)
                for band_index, band in enumerate(self.bands):
                    for extractor in self.extractors:
                        yield (
                            timeline,
                            interval,
                            band_index,
                            band,
                            extractor,
                        )

    def load_file(self, file: FileConfig) -> FileLoader:
        if file.index in self.loaders.keys():
            return self.loaders[file.index]

        loader = FileLoader(file)
        loader.load()
        self.loaders[file.index] = loader
        return self.loaders[file.index]

    def prepare_extracted(self, file: FileConfig) -> None:
        if file.index in self.extracted.keys():
            return

        self.extracted[file.index] = {}

    def load_band(self, band: BandConfig, file: FileConfig):
        if band.index in self.extracted[file.index].keys():
            return

        self.extracted[file.index][band.index] = {}

    def run_extraction(
        self,
        extractor: Extractor,
        band: BandConfig,
        file: FileConfig,
        timeline: Timeline,
    ):
        if extractor.index in self.extracted[file.index][band.index].keys():
            return

        extractor.band = band

        loader = self.loaders[file.index]

        self.extracted[file.index][band.index][extractor.index] = extractor.extract(
            loader.loader
        )

        if extractor.is_persist:
            # Store only for first integration
            # this could be above
            if timeline.integration.index == 0:
                extractor.store(
                    self.extracted[file.index][band.index][extractor.index],
                    self.storage,
                )

    def get_block_data(
        self,
        block: Block,
        band: BandConfig,
        extractor: Extractor,
    ):
        offset = extractor.offset / 1000  # seconds floats
        step = extractor.step / 1000  # seconds float

        start = (block.start - block.file.start) // 1000  # seconds
        duration = (block.end - block.start) // 1000  # seconds

        start = int((start + offset) / step)
        duration = int(duration / step)

        end = start + duration

        file_data = self.extracted[block.file.index][band.index][extractor.index]

        block_data = file_data[start:end]

        return block_data

    def get_block_details(
        self,
        block: Block,
    ) -> str:
        file_relative_start = block.start - block.file.start
        block_details = f"{block.start}/{file_relative_start}/{block.file.path}"
        return block_details

    def purge(
        self,
        f: FileIndex,
        b: BandIndex,
        extractor: Extractor,
        b_: BlockIndex,
        interval: Interval,
        timeline: Timeline,
    ):
        # Removing extracted data
        # INFO: this lefts over the last operation in memory
        if self.cfi is not None and f != self.cfi:
            del self.extracted[self.cfi]

        # Unloading file
        is_last_integration = timeline.integration.index == len(self.integrations) - 1
        is_last_band = b == len(self.bands) - 1
        is_last_extractor = extractor.index == len(self.extractors) - 1
        is_last_block = b_ == len(interval.blocks) - 1

        is_last_op = (
            is_last_integration and is_last_band and is_last_extractor and is_last_block
        )

        if self.cfi is not None and is_last_op:
            self.loaders[self.cfi].release()

    def walk(self):
        for timeline, interval, b, band, extractor in self.__enumerate():
            interval_data = []
            labels: List[str] = []
            interval_details: List[str] = []

            for b_, block in enumerate(interval.blocks):
                f = block.file.index

                self.load_file(file=block.file)
                self.prepare_extracted(file=block.file)
                self.load_band(band=band, file=block.file)

                self.run_extraction(
                    extractor=extractor,
                    band=band,
                    file=block.file,
                    timeline=timeline,
                )

                block_data = self.get_block_data(
                    block=block,
                    band=band,
                    extractor=extractor,
                )

                interval_data = [*interval_data, *block_data]
                labels = [*labels, *block.file.labels]

                block_details = self.get_block_details(block=block)
                if block_details not in interval_details:
                    interval_details.append(block_details)

                self.purge(f, b, extractor, b_, interval, timeline)

                self.cfi = f

            yield (
                interval_data,
                labels,
                interval_details,
                interval,
                band,
                extractor,
                timeline,
            )
