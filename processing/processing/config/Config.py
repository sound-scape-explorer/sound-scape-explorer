from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import List, Optional, Union

import pandas
from pandas import DataFrame, Series

from processing.common.SingletonMeta import SingletonMeta
from processing.config.AutoclusterConfig import AutoclusterConfig
from processing.config.AutoclusterStorage import AutoclusterStorage
from processing.config.BandConfig import BandConfig
from processing.config.BandStorage import BandStorage
from processing.config.ConfigIndicator import ConfigIndicator
from processing.config.ConfigMatrix import ConfigMatrix
from processing.config.ConfigPairing import ConfigPairing
from processing.config.ConfigParser import ConfigParser
from processing.config.ConfigVolume import ConfigVolume
from processing.config.ExcelIndicator import ExcelIndicator
from processing.config.ExcelMatrices import ExcelMatrices
from processing.config.ExcelPairings import ExcelPairings
from processing.config.ExcelSetting import ExcelSetting
from processing.config.ExcelSheet import ExcelSheet
from processing.config.ExcelVolume import ExcelVolume
from processing.config.ExtractorConfig import ExtractorConfig
from processing.config.ExtractorStorage import ExtractorStorage
from processing.config.FileConfig import FileConfig
from processing.config.FileStorage import FileStorage
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.IntegrationStorage import IntegrationStorage
from processing.config.LabelConfig import LabelConfig
from processing.config.LabelStorage import LabelStorage
from processing.config.RangeConfig import RangeConfig
from processing.config.RangeStorage import RangeStorage
from processing.config.ReducerConfig import ReducerConfig
from processing.config.ReducerStorage import ReducerStorage
from processing.config.SiteConfig import SiteConfig
from processing.config.SiteStorage import SiteStorage
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.config.TrajectoryStorage import TrajectoryStorage
from processing.settings.ConfigSetting import ConfigSettings
from processing.settings.DefaultSetting import DefaultSetting
from processing.settings.StorageSetting import StorageSetting
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.is_nan import is_nan
from processing.utils.print_new_line import print_new_line


class Config(metaclass=SingletonMeta):
    __path: str
    __excel: pandas.ExcelFile
    __settings: ConfigSettings = {}  # type: ignore
    __indicators: List[ConfigIndicator] = []
    __volumes: List[ConfigVolume] = []
    __matrices: List[ConfigMatrix] = []
    __pairings: List[ConfigPairing] = []

    def __init__(
        self,
        path: str,
    ) -> None:
        self.__path = path
        self.parser = ConfigParser(self.__path)

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

        self.__validate_path()

        self.__load_file()
        self.__read()
        self.__succeed()

    def __succeed(self) -> None:
        print_new_line()
        print(f"Config loaded: {self.__path}")
        self.__print_settings()

    def __fail(self) -> None:
        raise FileNotFoundError(
            f"Unable to find Excel configuration file {self.__path}."
        )

    def __validate_path(self) -> None:
        if self.__path is None:
            self.__fail()

        path = Path(self.__path)

        if not path.exists():
            self.__fail()

    def __load_file(self) -> None:
        self.__excel = pandas.ExcelFile(self.__path)

    def __parse_sheet(self, sheet: ExcelSheet) -> DataFrame:
        return self.__excel.parse(sheet.value)  # type: ignore

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

        self.__read_indicators()
        self.__read_volumes()
        self.__read_matrices()
        self.__read_pairings()

    def __clean_storage(self, storage: Storage) -> None:
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

        storage.delete(StoragePath.labels_properties)
        storage.delete(StoragePath.labels_sets)
        storage.delete(StoragePath.indicators_names)
        storage.delete(StoragePath.volumes_names)

    def write(self, storage: Storage) -> None:
        self.__clean_storage(storage)
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
        self.__store_indicators(storage)
        self.__store_volumes(storage)
        self.__store_matrices(storage)
        self.__store_pairings(storage)

    def __store_indicators(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_indicators(self.__indicators)

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
        sheet = self.__parse_sheet(ExcelSheet.settings)

        settings = self.parse_column(sheet, ExcelSetting.setting)
        values = self.parse_column(sheet, ExcelSetting.value_)

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

    def __read_indicators(self) -> List[ConfigIndicator]:
        sheet = self.__parse_sheet(ExcelSheet.indicators)
        names = self.parse_column(sheet, ExcelIndicator.indicator)
        self.__indicators = ConfigIndicator.reconstruct(names=names)
        return self.__indicators

    def __read_volumes(self) -> List[ConfigVolume]:
        sheet = self.__parse_sheet(ExcelSheet.volumes)
        names = self.parse_column(sheet, ExcelVolume.volume)
        self.__volumes = ConfigVolume.reconstruct(names=names)
        return self.__volumes

    def __read_matrices(self) -> List[ConfigMatrix]:
        sheet = self.__parse_sheet(ExcelSheet.matrices)
        names = self.parse_column(sheet, ExcelMatrices.name_)
        self.__matrices = ConfigMatrix.reconstruct(names=names)
        return self.__matrices

    def __read_pairings(self) -> List[ConfigPairing]:
        sheet = self.__parse_sheet(ExcelSheet.pairings)
        names = self.parse_column(sheet, ExcelPairings.name_)
        self.__pairings = ConfigPairing.reconstruct(names=names)
        return self.__pairings
