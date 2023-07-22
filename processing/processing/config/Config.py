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
from processing.settings.ConfigSetting import ConfigSettings
from processing.settings.DefaultSetting import DefaultSetting
from processing.settings.StorageSetting import StorageSetting
from processing.storage.Storage import Storage
from processing.utils.convert_date_to_timestamp import convert_date_to_timestamp
from processing.utils.get_uniques_from_list import get_uniques_from_list
from processing.utils.is_nan import is_nan
from processing.utils.print_new_line import print_new_line
from processing.utils.reverse_array import reverse_array


class Config(metaclass=SingletonMeta):
    __path: str
    __excel: pandas.ExcelFile
    __settings: ConfigSettings = {}  # type: ignore
    __files: List[ConfigFile] = []
    __files_meta_properties: List[str]
    __bands: List[ConfigBand] = []
    __integrations: List[ConfigIntegration] = []
    __ranges: List[ConfigRange] = []
    __all_sites: List[str] = []
    __autoclusters: List[ConfigAutocluster] = []
    __trajectories: List[ConfigTrajectory] = []
    __reducers: List[ConfigReducer] = []
    __indicators: List[ConfigIndicator] = []
    __volumes: List[ConfigVolume] = []
    __matrices: List[ConfigMatrix] = []
    __pairings: List[ConfigPairing] = []

    def __init__(
        self,
        path: str,
    ) -> None:
        self.__path = path

        self.__validate_path()

        self.__load_file()
        self.__read()
        self.__set()
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

        self.__read_files()

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

    def __set(self) -> None:
        self.__set_all_sites()

    def store(
        self,
        storage: Storage,
    ) -> None:
        self.__store_settings(storage)

        self.__store_files(storage)
        self.__store_metas(storage)

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

    def __set_all_sites(self) -> None:
        for file_ in self.__files:
            if file_.site in self.__all_sites:
                continue

            self.__all_sites.append(file_.site)

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
        value: Union[Series, DataFrame],
    ):
        payload = value

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

    def __read_files_meta_properties(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.files)
        self.__files_meta_properties = []

        for column in sheet:
            if "meta_" not in column:
                continue

            meta_property = column.replace(ExcelFile.meta_prefix.value, "")

            # INFO: Uncomment me to trigger a `KeyError`
            # and notify the user to use uppercase meta_PROPERTIES
            # meta_property = str.upper(meta_property)

            self.__files_meta_properties.append(meta_property)

    def __read_files_meta_values(self) -> List[List[str]]:
        self.__read_files_meta_properties()

        sheet = self.__parse_sheet(ExcelSheet.files)

        meta_values_by_columns = []

        for meta_property in self.__files_meta_properties:
            meta_value = self.__parse_column(
                sheet,
                ExcelFile.meta_prefix,
                suffix=meta_property,
            )

            meta_value = list(meta_value)

            for v, value in enumerate(meta_value):
                if type(value) is not str:
                    meta_value[v] = str(value)

            meta_values_by_columns.append(meta_value)

        return reverse_array(meta_values_by_columns)

    def __read_files(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.files)

        names = self.__parse_column(sheet, ExcelFile.name_)

        dates = self.__parse_column(sheet, ExcelFile.date)
        timestamps = [convert_date_to_timestamp(d) for d in dates]

        sites = self.__parse_column(sheet, ExcelFile.site)

        metas = self.__read_files_meta_values()

        files = ConfigFile.reconstruct(
            names=names,
            timestamps=timestamps,
            sites=sites,
            metas=metas,
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
        storage.write_config_files(files=self.__files)

    # INFO: Meta properties are made uppercase just before writing to h5.
    # This is because it is not a critical error to be notified to the user.
    # Please refer to the commented line in `__read_files_meta_properties()`
    # to impact the actualy `Config` object copy from Excel in order to trigger
    # a `KeyError`.
    def __store_metas(
        self,
        storage: Storage,
    ) -> None:
        meta_properties = self.__files_meta_properties

        meta_properties_upper = []

        for meta_property in meta_properties:
            meta_properties_upper.append(str.upper(meta_property))

        meta_values = self.__read_files_meta_values()

        meta_sets: List[List[str]] = []

        for index, _ in enumerate(meta_properties):
            meta_values_by_columns = reverse_array(meta_values)
            meta_set = get_uniques_from_list(meta_values_by_columns[index])
            meta_sets.append(meta_set)

        storage.write_metas(
            meta_properties_upper,
            meta_sets,
        )

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
