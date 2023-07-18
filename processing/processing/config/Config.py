import datetime
import math
from enum import Enum
from pathlib import Path
from typing import Any, List, Union

import numpy
import pandas
from numpy import nan
from pandas import DataFrame, Series, Timestamp

from processing.clusterings.Clustering import Clustering
from processing.common.SingletonMeta import SingletonMeta
from processing.config.ConfigAutocluster import ConfigAutocluster, ConfigAutoclusters
from processing.config.ConfigBand import ConfigBand, ConfigBands
from processing.config.ConfigFile import ConfigFile, ConfigFiles
from processing.config.ConfigIntegration import ConfigIntegration, ConfigIntegrations
from processing.config.ConfigRange import ConfigRange, ConfigRanges
from processing.config.ConfigReducer import ConfigReducer, ConfigReducers
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
from processing.config.ExcelVolume import ExcelVolume
from processing.indicators.Indicator import Indicator
from processing.matrices.Matrix import Matrix
from processing.pairings.Pairing import Pairing
from processing.settings.ConfigSetting import ConfigSettings
from processing.settings.DefaultSetting import DefaultSetting
from processing.settings.StorageSetting import StorageSetting
from processing.storage.Storage import Storage
from processing.utils.get_uniques_from_list import get_uniques_from_list
from processing.utils.print_new_line import print_new_line
from processing.volumes.Volume import Volume


class Config(metaclass=SingletonMeta):
    __path: str
    __excel: pandas.ExcelFile
    __settings: ConfigSettings = {}  # type: ignore
    __files: ConfigFiles = {}
    __files_meta_properties: List[str]
    __bands: ConfigBands = {}
    __integrations: ConfigIntegrations = {}
    __ranges: ConfigRanges = {}
    __all_sites: List[str] = []
    __autoclusters: ConfigAutoclusters = []
    __reducers: ConfigReducers = []
    __indicators: List[str] = []
    __volumes: List[str] = []
    __matrices: List[str] = []
    __pairings: List[str] = []

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
        raise FileNotFoundError(f"Could not load Excel file: {self.__path}")

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
        column: Union[str, Enum],
    ) -> DataFrame:
        if type(column) is str:
            return sheet[column]

        return sheet[column.value]  # type: ignore

    def __read(self) -> None:
        self.__read_settings()

        self.__read_files()

        self.__read_bands()
        self.__read_integrations()
        self.__read_ranges()

        self.__read_autoclusters()
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
        self.__store_reducers(storage)
        self.__store_indicators(storage)
        self.__store_volumes(storage)
        self.__store_matrices(storage)
        self.__store_pairings(storage)

    def __store_autoclusters(
        self,
        storage: Storage,
    ) -> None:
        autoclusters = []
        min_cluster_sizes = []
        min_samples = []
        alphas = []
        epsilons = []

        for autocluster in self.__autoclusters:
            autoclusters.append(autocluster.name)
            min_cluster_sizes.append(autocluster.min_cluster_size)
            min_samples.append(autocluster.min_samples)
            alphas.append(autocluster.alpha)
            epsilons.append(autocluster.epsilon)

        storage.write_config_autoclusters(
            autoclusters=autoclusters,
            min_cluster_sizes=min_cluster_sizes,
            min_samples=min_samples,
            alphas=alphas,
            epsilons=epsilons,
        )

    def __store_reducers(
        self,
        storage: Storage,
    ) -> None:
        reducers = []
        dimensions = []
        bands = []
        integrations = []
        ranges = []

        for reducer in self.__reducers:
            reducers.append(reducer.name)
            dimensions.append(reducer.dimensions)
            bands.append(reducer.bands)
            integrations.append(reducer.integrations)
            ranges.append(reducer.ranges)

        storage.write_reducers(
            reducers=reducers,
            dimensions=dimensions,
            bands=bands,
            integrations=integrations,
            ranges=ranges,
        )

    def __store_indicators(
        self,
        storage: Storage,
    ) -> None:
        storage.write_indicators(self.__indicators)

    def __store_volumes(
        self,
        storage: Storage,
    ) -> None:
        storage.write_volumes(self.__volumes)

    def __store_matrices(
        self,
        storage: Storage,
    ) -> None:
        storage.write_matrices(self.__matrices)

    def __store_pairings(
        self,
        storage: Storage,
    ) -> None:
        storage.write_pairings(self.__pairings)

    def __set_all_sites(self) -> None:
        for file in self.__files.values():
            site = file.site

            if site in self.__all_sites:
                continue

            self.__all_sites.append(site)

    @staticmethod
    def __is_nan(payload: Any) -> bool:
        return (
            type(payload) is float or type(payload) is numpy.float64
        ) and math.isnan(payload)

    def get_expected_sample_rate(self) -> int:
        return self.__settings["expected_sample_rate"]

    def get_files(self) -> ConfigFiles:
        return self.__files

    def get_bands(self) -> ConfigBands:
        return self.__bands

    def get_meta_properties(self) -> List[str]:
        return self.__files_meta_properties

    def __read_settings(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.settings)
        settings = self.__parse_column(sheet, ExcelSetting.setting.value)
        values = self.__parse_column(sheet, ExcelSetting.value_.value)

        for index, setting in enumerate(settings):
            value = self.__digest_setting(setting, values[index])
            self.__settings[setting] = value  # type: ignore

    def __digest_setting(
        self,
        setting: str,
        value: Union[Series, DataFrame],
    ):
        payload = value

        if self.__is_nan(value):
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

    @staticmethod
    def __convert_date_to_timestamp(date: Timestamp) -> int:
        timestamp_seconds = datetime.datetime.timestamp(date)
        timestamp_milliseconds = timestamp_seconds * 1000
        return int(timestamp_milliseconds)

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
        sheet = self.__parse_sheet(ExcelSheet.files)
        meta_values = []

        for meta_property in self.__files_meta_properties:
            meta_value = self.__parse_column(
                sheet,
                f"{ExcelFile.meta_prefix.value}{meta_property}",
            )

            meta_value = list(meta_value)

            for v, value in enumerate(meta_value):
                if type(value) is not str:
                    meta_value[v] = str(value)

            meta_values.append(meta_value)

        return meta_values

    def __read_files(self) -> None:
        self.__read_files_meta_properties()

        sheet = self.__parse_sheet(ExcelSheet.files)
        files = self.__parse_column(sheet, ExcelFile.file)
        dates = self.__parse_column(sheet, ExcelFile.date)
        sites = self.__parse_column(sheet, ExcelFile.site)
        metas = self.__read_files_meta_values()

        for index, file in enumerate(files):
            date = dates[index]
            timestamp = self.__convert_date_to_timestamp(date)
            site = str(sites[index])
            meta = [str(m[index]) for m in metas]

            self.__files[file] = ConfigFile(
                file=file,
                timestamp=timestamp,
                site=site,
                meta=meta,
            )

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
        if storage.is_defined_files():
            return

        files = []
        timestamps = []
        sites = []
        metas = []

        for file_name, file in self.__files.items():
            files.append(file_name)
            timestamps.append(file.timestamp)
            sites.append(file.site)
            metas.append(file.meta)

        storage.create_files(
            files=files,
            timestamps=timestamps,
            sites=sites,
            metas=metas,
        )

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
            meta_set = get_uniques_from_list(meta_values[index])
            meta_sets.append(meta_set)

        storage.write_metas(
            meta_properties_upper,
            meta_sets,
        )

    def __read_ranges(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.ranges)
        ranges = self.__parse_column(sheet, ExcelRange.range)
        starts = self.__parse_column(sheet, ExcelRange.start)
        ends = self.__parse_column(sheet, ExcelRange.end)

        for index, range_ in enumerate(ranges):
            start = starts[index]
            end = ends[index]

            timestamp_start = self.__convert_date_to_timestamp(start)
            timestamp_end = self.__convert_date_to_timestamp(end)

            self.__ranges[range_] = ConfigRange(
                name=range_,
                start=timestamp_start,
                end=timestamp_end,
            )

    def __store_ranges(
        self,
        storage: Storage,
    ) -> None:
        if storage.is_defined_ranges():
            return

        ranges = []
        ranges_timestamps = []

        for range_name, range_ in self.__ranges.items():
            timestamps = [range_.start, range_.end]

            ranges.append(range_name)
            ranges_timestamps.append(timestamps)

        storage.create_ranges(ranges, ranges_timestamps)

    def __read_bands(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.bands)
        bands = self.__parse_column(sheet, ExcelBand.band)
        lows = self.__parse_column(sheet, ExcelBand.low)
        highs = self.__parse_column(sheet, ExcelBand.high)

        for index, band in enumerate(bands):
            low = lows[index]
            high = highs[index]

            self.__bands[band] = ConfigBand(
                name=band,
                low=low,
                high=high,
            )

    def __read_integrations(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.integrations)
        integrations = self.__parse_column(sheet, ExcelIntegration.integration)
        seconds = self.__parse_column(sheet, ExcelIntegration.seconds)

        for index, integration in enumerate(integrations):
            second = seconds[index]

            self.__integrations[integration] = ConfigIntegration(
                name=integration,
                seconds=second,
            )

    def __store_bands(
        self,
        storage: Storage,
    ) -> None:
        if storage.is_defined_bands():
            return

        bands = []
        bands_frequencies = []

        for band_name, band in self.__bands.items():
            frequencies = [band.low, band.high]

            bands.append(band_name)
            bands_frequencies.append(frequencies)

        storage.create_bands(bands, bands_frequencies)

    def __store_integrations(
        self,
        storage: Storage,
    ) -> None:
        integrations = []
        integrations_seconds = []

        for integration in self.__integrations.values():
            integrations.append(integration.name)
            integrations_seconds.append(integration.seconds)

        storage.create_integrations(
            integrations=integrations, integrations_seconds=integrations_seconds
        )

    def __parse_reducer_bands(
        self,
        bands: Union[str, type(nan)],  # type: ignore TODO: Learn why
    ) -> List[str]:
        reducer_bands = []

        if type(bands) is str:
            for band in bands.split(","):
                _ = self.__bands[band]
                reducer_bands.append(band)
        else:
            for band in self.__bands.keys():
                reducer_bands.append(band)

        return reducer_bands

    def __parse_reducer_integrations(
        self,
        integrations: Union[str, type(nan)],  # type: ignore TODO: Learn why
    ) -> List[str]:
        reducer_integrations = []

        if type(integrations) is str:
            for integration in integrations.split(","):
                _ = self.__integrations[integration]
                reducer_integrations.append(integration)
        else:
            for integration in self.__integrations.keys():
                reducer_integrations.append(integration)

        return reducer_integrations

    def __parse_reducer_ranges(
        self,
        ranges: Union[str, type(nan)],  # type: ignore TODO: Learn why
    ) -> List[str]:
        reducer_ranges = []

        if type(ranges) is str:
            for range_ in ranges.split(","):
                _ = self.__ranges[range_]
                reducer_ranges.append(range_)
        else:
            for range_ in self.__ranges.keys():
                reducer_ranges.append(range_)

        return reducer_ranges

    def __read_autoclusters(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.autoclusters)
        autoclusters = self.__parse_column(sheet, ExcelAutocluster.autocluster)
        min_cluster_sizes = self.__parse_column(
            sheet, ExcelAutocluster.min_cluster_size
        )
        min_samples = self.__parse_column(sheet, ExcelAutocluster.min_samples)
        alphas = self.__parse_column(sheet, ExcelAutocluster.alpha)
        epsilons = self.__parse_column(sheet, ExcelAutocluster.epsilon)

        for index, autocluster_name in enumerate(autoclusters):
            Clustering.validate_name(autocluster_name)

            autocluster = ConfigAutocluster(
                index=index,
                name=autocluster_name,
                min_cluster_size=min_cluster_sizes[index],
                min_samples=min_samples[index],
                alpha=alphas[index],
                epsilon=epsilons[index],
            )

            self.__autoclusters.append(autocluster)

    def __read_reducers(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.reducers)
        reducers = self.__parse_column(sheet, ExcelReducer.reducer)
        dimensions = self.__parse_column(sheet, ExcelReducer.dimensions)
        bands = self.__parse_column(sheet, ExcelReducer.bands)
        integrations = self.__parse_column(sheet, ExcelReducer.integrations)
        ranges = self.__parse_column(sheet, ExcelReducer.ranges)

        for index, reducer_name in enumerate(reducers):
            reducer_bands = self.__parse_reducer_bands(bands[index])
            reducer_integrations = self.__parse_reducer_integrations(
                integrations=integrations[index]
            )
            reducer_ranges = self.__parse_reducer_ranges(ranges[index])

            reducer = ConfigReducer(
                index=index,
                name=reducer_name,
                dimensions=dimensions[index],
                bands=reducer_bands,
                integrations=reducer_integrations,
                ranges=reducer_ranges,
            )

            self.__reducers.append(reducer)

    def __read_indicators(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.indicators)
        indicators = self.__parse_column(sheet, ExcelIndicator.indicator)

        for name in indicators:
            Indicator.validate_name(name)
            self.__indicators.append(name)

    def __read_volumes(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.volumes)
        volumes = self.__parse_column(sheet, ExcelVolume.volume)

        for name in volumes:
            Volume.validate_name(name)
            self.__volumes.append(name)

    def __read_matrices(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.matrices)
        matrices = self.__parse_column(sheet, ExcelMatrices.matrix)

        for name in matrices:
            Matrix.validate_name(name)
            self.__matrices.append(name)

    def __read_pairings(self) -> None:
        sheet = self.__parse_sheet(ExcelSheet.pairings)
        pairings = self.__parse_column(sheet, ExcelPairings.pairing)

        for name in pairings:
            Pairing.validate_name(name)
            self.__pairings.append(name)
