from typing import List

from processing.common.SingletonMeta import SingletonMeta
from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig
from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandConfig import BandConfig
from processing.config.bands.BandStorage import BandStorage
from processing.config.ConfigPairing import ConfigPairing
from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelPairings import ExcelPairings
from processing.config.ExcelSheet import ExcelSheet
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.files.FileConfig import FileConfig
from processing.config.files.FileStorage import FileStorage
from processing.config.indicators.IndicatorConfig import IndicatorConfig
from processing.config.indicators.IndicatorStorage import IndicatorStorage
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.labels.LabelConfig import LabelConfig
from processing.config.labels.LabelStorage import LabelStorage
from processing.config.matrices.MatrixConfig import MatrixConfig
from processing.config.matrices.MatrixSheet import MatrixSheet
from processing.config.matrices.MatrixStorage import MatrixStorage
from processing.config.ranges.RangeConfig import RangeConfig
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.config.settings.SettingsStorage import SettingsStorage
from processing.config.sites.SiteConfig import SiteConfig
from processing.config.sites.SiteStorage import SiteStorage
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.config.volumes.VolumeConfig import VolumeConfig
from processing.config.volumes.VolumeStorage import VolumeStorage
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


class Config(metaclass=SingletonMeta):
    __pairings: List[ConfigPairing] = []

    def __init__(
        self,
        path: str,
    ) -> None:
        self.parser = ConfigParser(path)

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
        self.indicators: List[IndicatorConfig] = []
        self.volumes: List[VolumeConfig] = []
        self.matrices: List[MatrixConfig] = []

        self.__read()
        self.__succeed()

    def __succeed(self) -> None:
        print_new_line()
        print(f"Config loaded: {self.parser.path}")
        self.__print_settings()

    def __read(self) -> None:
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
        self.trajectories = TrajectoryStorage.read_from_config(self.parser)

        self.reducers = ReducerStorage.read_from_config(
            parser=self.parser,
            bands=self.bands,
            integrations=self.integrations,
            ranges=self.ranges,
        )

        self.indicators = IndicatorStorage.read_from_config(self.parser)
        self.volumes = VolumeStorage.read_from_config(self.parser)
        self.matrices = MatrixStorage.read_from_config(self.parser)
        self.__read_pairings()

    def delete_from_storage(self, storage: Storage) -> None:
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
        IndicatorStorage.delete_from_storage(storage)
        VolumeStorage.delete_from_storage(storage)

    def write(self, storage: Storage) -> None:
        self.delete_from_storage(storage)

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
        IndicatorStorage.write_to_storage(self.indicators, storage)
        VolumeStorage.write_to_storage(self.volumes, storage)
        MatrixStorage.write_to_storage(self.matrices, storage)

        self.__store_pairings(storage)

    def __store_pairings(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_pairings(self.__pairings)

    def __print_settings(self) -> None:
        print_new_line()
        print("Settings")
        print_new_line()

        for k, v in vars(self.settings).items():
            print(f"{k}: {v}")

    def __read_pairings(self) -> List[ConfigPairing]:
        sheet = ExcelSheet.pairings
        names = self.parser.get(sheet, ExcelPairings.name_)
        self.__pairings = ConfigPairing.reconstruct(names=names)
        return self.__pairings
