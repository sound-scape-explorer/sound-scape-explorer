from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import List, Optional, Union

import pandas
from pandas import DataFrame, Series, Timestamp

from processing.common.SingletonMeta import SingletonMeta
from processing.config.ConfigAutocluster import ConfigAutocluster
from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigFile import ConfigFile
from processing.config.ConfigIndicator import ConfigIndicator
from processing.config.ConfigIntegration import ConfigIntegration
from processing.config.ConfigMatrix import ConfigMatrix
from processing.config.ConfigMeta import ConfigMeta
from processing.config.ConfigPairing import ConfigPairing
from processing.config.ConfigRange import ConfigRange
from processing.config.ConfigReducer import ConfigReducer
from processing.config.ConfigTrajectory import ConfigTrajectory
from processing.config.ConfigVolume import ConfigVolume
from processing.config.ExcelAutocluster import ExcelAutocluster
from processing.config.ExcelBand import ExcelBand
from processing.config.ExcelFile import ExcelFile
from processing.config.ExcelIndicator import ExcelIndicator
from processing.config.ExcelIntegration import ExcelIntegration
from processing.config.ExcelMatrices import ExcelMatrices
from processing.config.ExcelPairings import ExcelPairings
from processing.config.ExcelRange import ExcelRange
from processing.config.ExcelReducer import ExcelReducer
from processing.config.ExcelSetting import ExcelSetting
from processing.config.ExcelSheet import ExcelSheet
from processing.config.ExcelTrajectory import ExcelTrajectory
from processing.config.ExcelVolume import ExcelVolume
from processing.config.SiteConfig import SiteConfig
from processing.config.SiteStorage import SiteStorage
from processing.settings.ConfigSetting import ConfigSettings
from processing.settings.DefaultSetting import DefaultSetting
from processing.settings.StorageSetting import StorageSetting
from processing.storage.Storage import Storage
from processing.storage.StorageCompression import StorageCompression
from processing.storage.StoragePath import StoragePath
from processing.utils.convert_date_to_timestamp import convert_date_to_timestamp
from processing.utils.is_nan import is_nan
from processing.utils.print_new_line import print_new_line
from processing.utils.read_files_durations import read_files_durations


class Config(metaclass=SingletonMeta):
    __path: str
    __excel: pandas.ExcelFile
    __settings: ConfigSettings = {}  # type: ignore
    __files: List[ConfigFile] = []
    __metas: List[ConfigMeta] = []
    __bands: List[ConfigBand] = []
    __integrations: List[ConfigIntegration] = []
    __ranges: List[ConfigRange] = []
    __autoclusters: List[ConfigAutocluster] = []
    __trajectories: List[ConfigTrajectory] = []
    __reducers: List[ConfigReducer] = []
    __indicators: List[ConfigIndicator] = []
    __volumes: List[ConfigVolume] = []
    __matrices: List[ConfigMatrix] = []
    __pairings: List[ConfigPairing] = []
    sites: List[SiteConfig] = []

    def __init__(
        self,
        path: str,
    ) -> None:
        self.__path = path

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

    def __parse_sheet(
        self,
        sheet: ExcelSheet,
    ) -> DataFrame:
        return self.__excel.parse(sheet.value)  # type: ignore

    @staticmethod
    def __parse_column(
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

        self.__read_metas()
        self.__read_files()
        self.sites = SiteStorage.generate_from_config(self.__files)

        self.__read_bands()
        self.__read_integrations()
        self.__read_ranges()

        self.__read_autoclusters()
        self.__read_trajectories()
        self.__read_reducers()

        self.__read_indicators()
        self.__read_volumes()
        self.__read_matrices()
        self.__read_pairings()

    def __clean_storage(self, storage: Storage) -> None:
        storage.delete(StoragePath.configuration)

        storage.delete(StoragePath.files_names)
        storage.delete(StoragePath.files_timestamps)
        storage.delete(StoragePath.files_sites)
        storage.delete(StoragePath.files_labels)
        storage.delete(StoragePath.files_durations)

        storage.delete(StoragePath.meta_properties)
        storage.delete(StoragePath.meta_sets)
        storage.delete(StoragePath.bands_names)
        storage.delete(StoragePath.bands_lows)
        storage.delete(StoragePath.bands_highs)
        storage.delete(StoragePath.integrations_names)
        storage.delete(StoragePath.integrations_milliseconds)
        storage.delete(StoragePath.reducers_names)
        storage.delete(StoragePath.reducers_dimensions)
        storage.delete(StoragePath.reducers_bands)
        storage.delete(StoragePath.reducers_integrations)
        storage.delete(StoragePath.reducers_ranges)
        storage.delete(StoragePath.indicators_names)
        storage.delete(StoragePath.volumes_names)
        SiteStorage.delete(storage)

    def write(
        self,
        storage: Storage,
    ) -> None:
        self.__clean_storage(storage)
        self.__store_settings(storage)

        self.__store_files(storage)
        self.__store_metas(storage)
        self.__store_sites(storage)

        self.__store_bands(storage)
        self.__store_integrations(storage)
        self.__store_ranges(storage)

        self.__store_autoclusters(storage)
        self.__store_trajectories(storage)
        self.__store_reducers(storage)
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

    def __store_reducers(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_reducers(reducers=self.__reducers)

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

        settings = self.__parse_column(sheet, ExcelSetting.setting)
        values = self.__parse_column(sheet, ExcelSetting.value_)

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

            values = self.__parse_column(
                sheet,
                ExcelFile.meta_prefix,
                suffix=meta.property,
            )

            meta.load_values(values)
            metas.append(meta)
            index += 1

        self.__metas = metas
        return self.__metas

    def __get_audio_path(self) -> str:
        return self.__settings["audio_path"]

    def __read_files(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.files)

        names = self.__parse_column(sheet, ExcelFile.name_)

        dates = self.__parse_column(sheet, ExcelFile.date)
        timestamps = [convert_date_to_timestamp(d) for d in dates]

        sites = self.__parse_column(sheet, ExcelFile.site)

        labels = ConfigMeta.convert_to_values_by_file(self.__metas)

        audio_path = self.__get_audio_path()
        durations = read_files_durations(names, audio_path)

        files = ConfigFile.reconstruct(
            names=names,
            timestamps=timestamps,
            sites=sites,
            labels=labels,
            durations=durations,
            audio_path=audio_path,
        )

        self.__files = files

    def __store_settings(
        self,
        storage: Storage,
    ) -> None:
        storage.create_configuration()

        for setting, value in self.__settings.items():
            if value is None:
                continue

            storage.create_configuration_setting(setting, value)

    def __store_files(
        self,
        storage: Storage,
    ) -> None:
        (
            names,
            timestamps,
            sites,
            labels,
            durations,
        ) = ConfigFile.flatten(files=self.__files)

        storage.write(
            path=StoragePath.files_names,
            data=names,
        )

        storage.write(
            path=StoragePath.files_timestamps,
            data=timestamps,
            compression=StorageCompression.gzip,
            attributes={"unit": "milliseconds"},
        )

        storage.write(
            path=StoragePath.files_sites,
            data=sites,
        )

        storage.write(
            path=StoragePath.files_labels,
            data=labels,
        )

        storage.write(
            path=StoragePath.files_durations,
            data=durations,
            attributes={"unit": "milliseconds"},
        )

    def __store_sites(self, storage: Storage) -> None:
        SiteStorage.write_to_storage(self.sites, storage)

    def __store_metas(
        self,
        storage: Storage,
    ) -> None:
        storage.write_metas(self.__metas)

    def __read_ranges(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.ranges)

        names: List[str] = self.__parse_column(sheet, ExcelRange.name_)
        starts: List[Timestamp] = self.__parse_column(sheet, ExcelRange.start)
        ends: List[Timestamp] = self.__parse_column(sheet, ExcelRange.end)

        starts_timestamps = [convert_date_to_timestamp(start) for start in starts]
        ends_timestamps = [convert_date_to_timestamp(end) for end in ends]

        ranges = ConfigRange.reconstruct(
            names=names,
            starts=starts_timestamps,
            ends=ends_timestamps,
        )

        self.__ranges = ranges

    def __store_ranges(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_ranges(ranges=self.__ranges)

    def __read_bands(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.bands)

        names: List[str] = self.__parse_column(sheet, ExcelBand.name_)
        lows: List[int] = self.__parse_column(sheet, ExcelBand.low)
        highs: List[int] = self.__parse_column(sheet, ExcelBand.high)

        bands = ConfigBand.reconstruct(
            names=names,
            lows=lows,
            highs=highs,
        )

        self.__bands = bands

    def __read_integrations(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.integrations)

        names = self.__parse_column(sheet, ExcelIntegration.name_)
        durations = self.__parse_column(sheet, ExcelIntegration.duration)

        integrations = ConfigIntegration.reconstruct(
            names=names,
            durations=durations,
        )

        self.__integrations = integrations

    def __store_bands(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_bands(bands=self.__bands)

    def __store_integrations(
        self,
        storage: Storage,
    ) -> None:
        storage.write_config_integrations(integrations=self.__integrations)

    def __read_autoclusters(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.autoclusters)

        names: List[str] = self.__parse_column(
            sheet,
            ExcelAutocluster.name_,
        )

        min_cluster_sizes: List[int] = self.__parse_column(
            sheet,
            ExcelAutocluster.min_cluster_size,
        )

        min_samples: List[int] = self.__parse_column(
            sheet,
            ExcelAutocluster.min_samples,
        )

        alphas: List[float] = self.__parse_column(sheet, ExcelAutocluster.alpha)
        epsilons: List[float] = self.__parse_column(sheet, ExcelAutocluster.epsilon)

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

        names: List[str] = self.__parse_column(sheet, ExcelTrajectory.name_)
        starts: List[Timestamp] = self.__parse_column(sheet, ExcelTrajectory.start)
        ends: List[Timestamp] = self.__parse_column(sheet, ExcelTrajectory.end)

        starts_timestamps = [convert_date_to_timestamp(start) for start in starts]
        ends_timestamps = [convert_date_to_timestamp(end) for end in ends]

        trajectories = ConfigTrajectory.reconstruct(
            names=names,
            starts=starts_timestamps,
            ends=ends_timestamps,
        )

        self.__trajectories = trajectories

    def __read_reducers(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.reducers)

        names = self.__parse_column(sheet, ExcelReducer.name_)
        dimensions = self.__parse_column(sheet, ExcelReducer.dimensions)

        bands_names_string = self.__parse_column(sheet, ExcelReducer.bands)

        integrations_names_string = self.__parse_column(
            sheet,
            ExcelReducer.integrations,
        )

        ranges_names_strings = self.__parse_column(sheet, ExcelReducer.ranges)

        reducers = ConfigReducer.reconstruct(
            names=names,
            dimensions=dimensions,
            bands_names_strings=bands_names_string,
            integrations_names_strings=integrations_names_string,
            ranges_names_strings=ranges_names_strings,
            bands=self.__bands,
            integrations=self.__integrations,
            ranges=self.__ranges,
        )

        self.__reducers = reducers

    def __read_indicators(self) -> List[ConfigIndicator]:
        sheet = self.__parse_sheet(ExcelSheet.indicators)
        names = self.__parse_column(sheet, ExcelIndicator.indicator)
        self.__indicators = ConfigIndicator.reconstruct(names=names)
        return self.__indicators

    def __read_volumes(self) -> List[ConfigVolume]:
        sheet = self.__parse_sheet(ExcelSheet.volumes)
        names = self.__parse_column(sheet, ExcelVolume.volume)
        self.__volumes = ConfigVolume.reconstruct(names=names)
        return self.__volumes

    def __read_matrices(self) -> List[ConfigMatrix]:
        sheet = self.__parse_sheet(ExcelSheet.matrices)
        names = self.__parse_column(sheet, ExcelMatrices.name_)
        self.__matrices = ConfigMatrix.reconstruct(names=names)
        return self.__matrices

    def __read_pairings(self) -> List[ConfigPairing]:
        sheet = self.__parse_sheet(ExcelSheet.pairings)
        names = self.__parse_column(sheet, ExcelPairings.name_)
        self.__pairings = ConfigPairing.reconstruct(names=names)
        return self.__pairings
