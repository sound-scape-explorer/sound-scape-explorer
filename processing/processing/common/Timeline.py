from typing import Dict, List

from processing.common.FileLoader import FileLoader
from processing.common.FileWalker import FileWalker
from processing.common.Interval import Block, Interval
from processing.config.files.FileConfig import FileConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.sites.SiteConfig import SiteConfig
from processing.storage.Storage import Storage

TimelineMap = Dict[int, Interval]
FileIndex = int


# One timeline per site
class Timeline:
    def __init__(
        self,
        site: SiteConfig,
        integration: IntegrationConfig,
        storage: Storage,
        origin: int,
        debug: bool = False,
    ) -> None:
        self.site = site
        self.integration = integration
        self.storage = storage
        self.origin = origin
        self.debug = debug

        self.map: TimelineMap = {}
        self.step = integration.milliseconds
        self.loaded_files: List[FileConfig] = []
        self.efs: Dict[FileIndex, FileLoader] = {}

        self.load()
        self.print_debug()

    def get_interval_count_in_file(self, file: FileConfig) -> int:
        count = (file.end - file.start) // self.step

        if file.duration < self.step:
            count += 1

        before_remainder = (file.start - self.origin) % self.step

        before = file.start - before_remainder
        after = before + count * self.step

        if file.end > after:
            count += 1

        return count

    def verify_overlaps(
        self,
        interval: Interval,
        block: Block,
    ) -> None:
        """Return true if overlap"""
        existing_interval = self.map[interval.start]
        for existing_block in existing_interval.blocks:
            if block.start <= existing_block.end or block.end <= existing_block.start:
                raise ValueError(
                    f"Unable to add duplicate file {block.file.index}"
                    f" overlaping with file {existing_block.file.index}"
                )

    def add_interval(self, interval: Interval) -> TimelineMap:
        self.map[interval.start] = interval
        self.map = dict(sorted(self.map.items()))
        return self.map

    def load(self):
        for file in self.site.files:
            fw = FileWalker(
                file=file,
                origin=self.origin,
                step=self.step,
                debug=self.debug,
            )

            for interval, block in fw.walk():
                # create in map if not present
                if interval.start not in self.map:
                    self.add_interval(interval)

                # verify overlaps if present
                if interval.start in self.map:
                    self.verify_overlaps(interval, block)

                self.map[interval.start].blocks.append(block)

    def print_debug(self):
        if self.debug is False:
            return

        for interval_start, interval in self.map.items():
            print(
                interval_start,
                [f"{b.file.index}-{b.start}-{b.end}" for b in interval.blocks],
            )

    @property
    def intervals(self):
        return self.map.values()
