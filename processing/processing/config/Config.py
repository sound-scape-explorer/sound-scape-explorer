import os
from typing import List

from rich import print
from rich.console import Console
from rich.table import Table

from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig
from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandConfig import BandConfig
from processing.config.bands.BandStorage import BandStorage
from processing.config.binary.BinaryStorage import BinaryStorage
from processing.config.ConfigParser import ConfigParser
from processing.config.digesters.DigesterConfig import DigesterConfig
from processing.config.digesters.DigesterStorage import DigesterStorage
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.files.FileConfig import FileConfig
from processing.config.files.FileStorage import FileStorage
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.labels.LabelConfig import LabelConfig
from processing.config.labels.LabelStorage import LabelStorage
from processing.config.ranges.RangeConfig import RangeConfig
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.config.settings.SettingsRow import SettingsRow
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.config.sites.SiteConfig import SiteConfig
from processing.config.sites.SiteStorage import SiteStorage
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.storage.Storage import Storage
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date


class Config:
    def __init__(
        self,
        path: str,
    ) -> None:
        self.__print_load()
        self.path = os.path.abspath(path)
        self.folder = os.path.dirname(self.path)
        self.parser = ConfigParser(self.path, self.folder)

        self.settings: SettingsConfig

        self.bands: List[BandConfig] = []
        self.integrations: List[IntegrationConfig] = []
        self.ranges: List[RangeConfig] = []

        self.labels: List[LabelConfig] = []
        self.files: List[FileConfig] = []
        self.sites: List[SiteConfig] = []
        self.extractors: List[ExtractorConfig] = []

        self.autoclusters: List[AutoclusterConfig] = []
        self.trajectories: List[TrajectoryConfig] = []

        self.reducers: List[ReducerConfig] = []
        self.digesters: List[DigesterConfig] = []

        self.parse()
        self.__print_success()

    def __print_load(self) -> None:
        print("Loading configuration...")

    def __print_success(self) -> None:
        print(f"Config loaded: {self.parser.path}")
        self.print_settings()

    def print_settings(self) -> None:
        console = Console()

        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Setting")
        table.add_column("Value")

        for k, v in vars(self.settings).items():
            if k == SettingsRow.timeline_origin.value:
                v = convert_timestamp_to_date(v)

            table.add_row(str(k), str(v))

        console.print(table)

    def parse(self) -> None:
        self.settings = SettingsStorage.read_from_config(self.parser)

        self.bands = BandStorage.read_from_config(self.parser)
        self.integrations = IntegrationStorage.read_from_config(self.parser)
        self.ranges = RangeStorage.read_from_config(self.parser)

        self.labels = LabelStorage.read_from_config(self.parser)
        self.files = FileStorage.read_from_config(
            parser=self.parser,
            labels=self.labels,
            settings=self.settings,
        )

        self.sites = SiteStorage.parse_from_config(self.files)
        self.extractors = ExtractorStorage.read_from_config(self.parser)

        self.autoclusters = AutoclusterStorage.read_from_config(self.parser)
        self.trajectories = TrajectoryStorage.read_from_config(
            parser=self.parser,
            labels=self.labels,
        )

        self.reducers = ReducerStorage.read_from_config(
            parser=self.parser,
            bands=self.bands,
            integrations=self.integrations,
            ranges=self.ranges,
        )

        self.digesters = DigesterStorage.read_from_config(self.parser)

    def delete_from_storage(self, storage: Storage) -> None:
        BinaryStorage.delete_from_storage(storage)
        SettingsStorage.delete_from_storage(storage)

        BandStorage.delete_from_storage(storage)
        IntegrationStorage.delete_from_storage(storage)
        RangeStorage.delete_from_storage(storage)

        LabelStorage.delete_from_storage(storage)
        FileStorage.delete_from_storage(storage)
        SiteStorage.delete_from_storage(storage)

        ExtractorStorage.delete_from_storage(storage)

        AutoclusterStorage.delete_from_storage(storage)
        TrajectoryStorage.delete_from_storage(storage)

        ReducerStorage.delete_from_storage(storage)
        DigesterStorage.delete_from_storage(storage)

    def write(self, storage: Storage) -> None:
        self.delete_from_storage(storage)

        BinaryStorage.write_to_storage(self.path, storage)
        SettingsStorage.write_to_storage(self.settings, storage)

        BandStorage.write_to_storage(self.bands, storage)
        IntegrationStorage.write_to_storage(self.integrations, storage)
        RangeStorage.write_to_storage(self.ranges, storage)

        LabelStorage.write_to_storage(self.labels, storage)
        FileStorage.write_to_storage(self.files, storage)
        SiteStorage.write_to_storage(self.sites, storage)

        ExtractorStorage.write_to_storage(self.extractors, storage)

        AutoclusterStorage.write_to_storage(self.autoclusters, storage)
        TrajectoryStorage.write_to_storage(self.trajectories, storage)

        ReducerStorage.write_to_storage(self.reducers, storage)
        DigesterStorage.write_to_storage(self.digesters, storage)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return (
            BinaryStorage.exists_in_storage(storage)
            and SettingsStorage.exists_in_storage(storage)
            and BandStorage.exists_in_storage(storage)
            and IntegrationStorage.exists_in_storage(storage)
            and RangeStorage.exists_in_storage(storage)
            and LabelStorage.exists_in_storage(storage)
            and FileStorage.exists_in_storage(storage)
            and SiteStorage.exists_in_storage(storage)
            and ExtractorStorage.exists_in_storage(storage)
            and AutoclusterStorage.exists_in_storage(storage)
            and TrajectoryStorage.exists_in_storage(storage)
            and ReducerStorage.exists_in_storage(storage)
            and DigesterStorage.exists_in_storage(storage)
        )
