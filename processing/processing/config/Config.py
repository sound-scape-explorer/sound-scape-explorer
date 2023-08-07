from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import List, Optional, Union

import pandas
from pandas import DataFrame, Series, Timestamp

from processing.common.SingletonMeta import SingletonMeta
from processing.config.BandConfig import BandConfig
from processing.config.BandStorage import BandStorage
from processing.config.ConfigAutocluster import ConfigAutocluster
from processing.config.ConfigIndicator import ConfigIndicator
from processing.config.ConfigMatrix import ConfigMatrix
from processing.config.ConfigMeta import ConfigMeta
from processing.config.ConfigPairing import ConfigPairing
from processing.config.ConfigParser import ConfigParser
from processing.config.ConfigTrajectory import ConfigTrajectory
from processing.config.ConfigVolume import ConfigVolume
from processing.config.ExcelAutocluster import ExcelAutocluster
from processing.config.ExcelIndicator import ExcelIndicator
from processing.config.ExcelMatrices import ExcelMatrices
from processing.config.ExcelPairings import ExcelPairings
from processing.config.ExcelSetting import ExcelSetting
from processing.config.ExcelSheet import ExcelSheet
from processing.config.ExcelTrajectory import ExcelTrajectory
from processing.config.ExcelVolume import ExcelVolume
from processing.config.ExtractorConfig import ExtractorConfig
from processing.config.ExtractorStorage import ExtractorStorage
from processing.config.FileConfig import FileConfig
from processing.config.FileExcel import FileExcel
from processing.config.FileStorage import FileStorage
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.IntegrationStorage import IntegrationStorage
from processing.config.RangeConfig import RangeConfig
from processing.config.RangeStorage import RangeStorage
from processing.config.ReducerConfig import ReducerConfig
from processing.config.ReducerStorage import ReducerStorage
from processing.config.SiteConfig import SiteConfig
from processing.config.SiteStorage import SiteStorage
from processing.settings.ConfigSetting import ConfigSettings
from processing.settings.DefaultSetting import DefaultSetting
from processing.settings.StorageSetting import StorageSetting
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.convert_date_to_timestamp import convert_date_to_timestamp
from processing.utils.is_nan import is_nan
from processing.utils.print_new_line import print_new_line


class Config(metaclass=SingletonMeta):
    __path: str
    __excel: pandas.ExcelFile
    __settings: ConfigSettings = {}  # type: ignore
    __metas: List[ConfigMeta] = []
    __autoclusters: List[ConfigAutocluster] = []
    __trajectories: List[ConfigTrajectory] = []
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
        self.files: List[FileConfig] = []
        self.sites: List[SiteConfig] = []
        self.bands: List[BandConfig] = []
        self.integrations: List[IntegrationConfig] = []
        self.ranges: List[RangeConfig] = []
        self.extractors: List[ExtractorConfig] = []
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

        self.__read_metas()

        self.files = FileStorage.read_from_config(
            parser=self.parser,
            labels=self.__metas,
            audio_path=audio_path,
        )

        self.sites = SiteStorage.parse_from_config(self.files)
        self.bands = BandStorage.read_from_config(self.parser)
        self.integrations = IntegrationStorage.read_from_config(self.parser)
        self.ranges = RangeStorage.read_from_config(self.parser)
        self.extractors = ExtractorStorage.read_from_config(self.parser)

        self.__read_autoclusters()
        self.__read_trajectories()
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

        FileStorage.delete_from_storage(storage)
        BandStorage.delete_from_storage(storage)
        IntegrationStorage.delete_from_storage(storage)
        RangeStorage.delete_from_storage(storage)

        storage.delete(StoragePath.meta_properties)
        storage.delete(StoragePath.meta_sets)
        ReducerStorage.delete_from_storage(storage)
        storage.delete(StoragePath.indicators_names)
        storage.delete(StoragePath.volumes_names)
        SiteStorage.delete_from_storage(storage)

    def write(self, storage: Storage) -> None:
        self.__clean_storage(storage)
        self.__store_settings(storage)

        FileStorage.write_to_storage(self.files, storage)
        self.__store_metas(storage)
        SiteStorage.write_to_storage(self.sites, storage)
        BandStorage.write_to_storage(self.bands, storage)
        IntegrationStorage.write_to_storage(self.integrations, storage)
        RangeStorage.write_to_storage(self.ranges, storage)
        ExtractorStorage.write_to_storage(self.extractors, storage)

        self.__store_autoclusters(storage)
        self.__store_trajectories(storage)
        ReducerStorage.write_to_storage(self.reducers, storage)
        self.__store_indicators(storage)
        self.__store_volumes(storage)
        self.__store_matrices(storage)
        self.__store_pairings(storage)

    def __store_autoclusters(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_autoclusters(autoclusters=self.__autoclusters)

    def __store_trajectories(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_trajectories(trajectories=self.__trajectories)

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

    def __read_metas(self) -> List[ConfigMeta]:
        sheet = self.__parse_sheet(ExcelSheet.files)

        metas: List[ConfigMeta] = []
        index = 0

        for column in sheet:
            if not ConfigMeta.is_meta_property(column):
                continue

            meta: ConfigMeta = ConfigMeta(
                index=index,
                string=column,
            )

            values = self.parse_column(
                sheet,
                FileExcel.label_prefix,
                suffix=meta.property,
            )

            meta.load_values(values)
            metas.append(meta)
            index += 1

        self.__metas = metas
        return self.__metas

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

    def __store_metas(
        self,
        storage: Storage,
    ) -> None:
        storage.write_metas(self.__metas)

    def __read_autoclusters(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.autoclusters)

        names: List[str] = self.parse_column(
            sheet,
            ExcelAutocluster.name_,
        )

        min_cluster_sizes: List[int] = self.parse_column(
            sheet,
            ExcelAutocluster.min_cluster_size,
        )

        min_samples: List[int] = self.parse_column(
            sheet,
            ExcelAutocluster.min_samples,
        )

        alphas: List[float] = self.parse_column(sheet, ExcelAutocluster.alpha)
        epsilons: List[float] = self.parse_column(sheet, ExcelAutocluster.epsilon)

        autoclusters = ConfigAutocluster.reconstruct(
            names=names,
            min_cluster_sizes=min_cluster_sizes,
            min_samples=min_samples,
            alphas=alphas,
            epsilons=epsilons,
        )

        self.__autoclusters = autoclusters

    def __read_trajectories(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.trajectories)

        names: List[str] = self.parse_column(sheet, ExcelTrajectory.name_)
        starts: List[Timestamp] = self.parse_column(sheet, ExcelTrajectory.start)
        ends: List[Timestamp] = self.parse_column(sheet, ExcelTrajectory.end)

        starts_timestamps = [convert_date_to_timestamp(start) for start in starts]
        ends_timestamps = [convert_date_to_timestamp(end) for end in ends]

        trajectories = ConfigTrajectory.reconstruct(
            names=names,
            starts=starts_timestamps,
            ends=ends_timestamps,
        )

        self.__trajectories = trajectories

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
