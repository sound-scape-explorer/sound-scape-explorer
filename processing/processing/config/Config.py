from datetime import datetime
from enum import Enum
from typing import List, Optional, Union

from pandas import DataFrame, Series

from processing.common.SingletonMeta import SingletonMeta
from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig
from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandConfig import BandConfig
from processing.config.bands.BandStorage import BandStorage
from processing.config.ConfigMatrix import ConfigMatrix
from processing.config.ConfigPairing import ConfigPairing
from processing.config.ConfigParser import ConfigParser
from processing.config.ConfigVolume import ConfigVolume
from processing.config.ExcelMatrices import ExcelMatrices
from processing.config.ExcelPairings import ExcelPairings
from processing.config.ExcelSetting import ExcelSetting
from processing.config.ExcelSheet import ExcelSheet
from processing.config.ExcelVolume import ExcelVolume
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
from processing.config.ranges.RangeConfig import RangeConfig
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.sites.SiteConfig import SiteConfig
from processing.config.sites.SiteStorage import SiteStorage
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.settings.ConfigSetting import ConfigSettings
from processing.settings.DefaultSetting import DefaultSetting
from processing.settings.StorageSetting import StorageSetting
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.is_nan import is_nan
from processing.utils.print_new_line import print_new_line


class Config(metaclass=SingletonMeta):
    __settings: ConfigSettings = {}  # type: ignore
    __volumes: List[ConfigVolume] = []
    __matrices: List[ConfigMatrix] = []
    __pairings: List[ConfigPairing] = []

    def __init__(
        self,
        path: str,
    ) -> None:
        self.parser = ConfigParser(path)

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

        self.__read()
        self.__succeed()

    def __succeed(self) -> None:
        print_new_line()
        print(f"Config loaded: {self.parser.path}")
        self.__print_settings()

    @staticmethod
    def parse_column(
        sheet: DataFrame,
        column: Enum,
        suffix: Optional[str] = None,
    ) -> List:
        if suffix is not None:
            path = f"{column.value}{suffix}"
        else:
            path = column.value

        series = sheet[path]
        list_ = [value for value in series]
        return list_

    def __read(self) -> None:
        self.__read_settings()
        audio_path = self.__get_audio_path()

        self.bands = BandStorage.read_from_config(self.parser)
        self.integrations = IntegrationStorage.read_from_config(self.parser)
        self.ranges = RangeStorage.read_from_config(self.parser)

        self.labels = LabelStorage.read_from_config(self.parser)
        self.files = FileStorage.read_from_config(
            parser=self.parser,
            labels=self.labels,
            audio_path=audio_path,
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
        self.__read_volumes()
        self.__read_matrices()
        self.__read_pairings()

    def delete_from_storage(self, storage: Storage) -> None:
        storage.delete(StoragePath.configuration)

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

        storage.delete(StoragePath.labels_properties)
        storage.delete(StoragePath.labels_sets)
        storage.delete(StoragePath.indicators_names)
        storage.delete(StoragePath.volumes_names)

    def write(self, storage: Storage) -> None:
        self.delete_from_storage(storage)

        self.__store_settings(storage)

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

        self.__store_volumes(storage)
        self.__store_matrices(storage)
        self.__store_pairings(storage)

    def __store_volumes(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_volumes(self.__volumes)

    def __store_matrices(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_matrices(self.__matrices)

    def __store_pairings(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_pairings(self.__pairings)

    def __read_settings(self) -> None:
        settings = self.parser.get(ExcelSheet.settings, ExcelSetting.setting)
        values = self.parser.get(ExcelSheet.settings, ExcelSetting.value_)

        for index, setting in enumerate(settings):
            value = self.__digest_setting(setting, values[index])
            self.__settings[setting] = value  # type: ignore

    def __digest_setting(
        self,
        setting: str,
        value: Union[Series, DataFrame, datetime],
    ):
        payload = value

        if type(value) is datetime:
            payload = int(value.timestamp()) * 1000  # milliseconds

        if is_nan(value):
            payload = None

        if setting == StorageSetting.timezone.value and value is None:
            payload = DefaultSetting.timezone

        elif (
            setting == StorageSetting.computation_umap_dimensions.value
            and value is None
        ):
            payload = DefaultSetting.computation_umap_dimensions

        elif (
            setting == StorageSetting.computation_umap_iterations.value
            and value is None
        ):
            payload = DefaultSetting.computation_umap_iterations

        elif setting == StorageSetting.display_umap_seed.value and value is None:
            payload = DefaultSetting.display_umap_seed

        return payload

    def __print_settings(self) -> None:
        print_new_line()
        print("Settings")
        print_new_line()

        for setting_name, setting in self.__settings.items():
            print(f"{setting_name}: {setting}")

    def __get_audio_path(self) -> str:
        return self.__settings["audio_path"]

    def __store_settings(
        self,
        storage: Storage,
    ) -> None:
        storage.create_configuration()

        for setting, value in self.__settings.items():
            if value is None:
                continue

            storage.create_configuration_setting(setting, value)

    def __read_volumes(self) -> List[ConfigVolume]:
        sheet = ExcelSheet.volumes
        names = self.parser.get(sheet, ExcelVolume.volume)
        self.__volumes = ConfigVolume.reconstruct(names=names)
        return self.__volumes

    def __read_matrices(self) -> List[ConfigMatrix]:
        sheet = ExcelSheet.matrices
        names = self.parser.get(sheet, ExcelMatrices.name_)
        self.__matrices = ConfigMatrix.reconstruct(names=names)
        return self.__matrices

    def __read_pairings(self) -> List[ConfigPairing]:
        sheet = ExcelSheet.pairings
        names = self.parser.get(sheet, ExcelPairings.name_)
        self.__pairings = ConfigPairing.reconstruct(names=names)
        return self.__pairings
