import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

import math
import numpy
import pandas
from pandas import DataFrame, ExcelFile, Series

from processing.config.Band import Band, Bands
from processing.config.File import File, Files
from processing.config.Range import Range, Ranges
from processing.config.Umap import Umap, Umaps
from processing.config.enums.ExcelColumn import ExcelColumn
from processing.config.types.Settings import Settings
from processing.shared.SingletonMeta import SingletonMeta
from processing.storage.Storage import Storage


class Config(metaclass=SingletonMeta):
    __path: str
    __sheet: str = 'Sheet1'
    __excel: ExcelFile
    __excel_table: DataFrame
    __settings: Settings = {}
    __files: Files = {}
    __files_meta_properties: List[str]
    __ranges: Ranges = {}
    __bands: Bands = {}
    __umaps: Umaps = {}
    __all_sites: List[str] = []
    __storage: Storage

    def __init__(
        self,
        path: Optional[str] = 'config.xlsx',
        storage: Optional[Storage] = None,
    ) -> None:
        self.__path = path

        if storage is not None:
            self.__storage = storage

        self.__verify_excel()

        self.__load()
        self.__read()
        self.__set()

    def __verify_excel(self) -> None:
        path = Path(self.__path)

        if not path.exists():
            raise FileNotFoundError(f'Excel file not found: {path}')

    def __load(self) -> None:
        self.__excel = pandas.ExcelFile(self.__path)
        self.__excel_table = self.__excel.parse(self.__sheet)

    def __read(self) -> None:
        self.__read_settings()
        self.__read_files()
        self.__read_ranges()
        self.__read_bands()
        self.__read_umaps()

    def __set(self) -> None:
        self.__set_all_sites()

    def __verify_storage(self) -> None:
        try:
            self.__storage
        except AttributeError:
            raise AttributeError('Storage not found!')

    def store(self) -> None:
        self.__verify_storage()

        self.__store_settings()
        self.__store_files()
        self.__store_metas()
        self.__store_ranges()
        self.__store_bands()
        self.__store_umaps()

        # self.__storage.close()

    def __set_all_sites(self) -> None:
        for file in self.__files.values():
            site = file.site

            if site in self.__all_sites:
                continue

            self.__all_sites.append(site)

    @staticmethod
    def __is_nan(payload: Any) -> bool:
        return (type(payload) is float or type(payload) is numpy.float64) \
            and math.isnan(payload)

    def get_umap_seed(self) -> int:
        return self.__settings['umap_seed']

    def get_expected_sample_rate(self) -> int:
        return self.__settings['expected_sample_rate']

    def get_base_path(self) -> str:
        return self.__settings['base_path']

    def get_audio_folder(self) -> str:
        return self.__settings['audio_folder']

    def get_audio_path(self) -> str:
        base_path = self.get_base_path()
        audio_folder = self.get_audio_folder()
        return f'{base_path}/{audio_folder}'

    def get_files(self) -> Files:
        return self.__files

    def get_bands(self) -> Bands:
        return self.__bands

    def get_meta_properties(self) -> List[str]:
        return self.__files_meta_properties

    def __read_settings(self) -> None:
        settings = self.__excel_table[ExcelColumn.settings.value]
        values = self.__excel_table[ExcelColumn.settings_values.value]

        index_by_setting = self.__get_index_map(settings)

        for setting, index in index_by_setting.items():
            value = values[index]

            if self.__is_nan(value):
                value = None

            self.__settings[setting] = value  # type: ignore

    @staticmethod
    def __get_index_map(series: Series) -> Dict[str, int]:
        map_ = {}

        for index, key in enumerate(series):
            if Config.__is_nan(key):
                continue

            map_[key] = index

        return map_

    @staticmethod
    def __convert_date_to_timestamp(date_string: str) -> int:
        date = datetime.datetime.strptime(date_string, "%Y%m%d_%H%M")
        timestamp = datetime.datetime.timestamp(date)  # seconds
        timestamp = timestamp * 1000  # milliseconds

        return int(timestamp)

    def __read_files_meta_properties(self) -> None:
        self.__files_meta_properties = []

        for column in self.__excel_table:
            if 'files' not in column \
                    or ExcelColumn.files.value == column \
                    or ExcelColumn.files_dates.value == column \
                    or ExcelColumn.files_tags.value == column \
                    or ExcelColumn.files_sites.value == column:
                continue

            meta_property = column.replace('files_', '')
            self.__files_meta_properties.append(meta_property)

    def __read_files_meta_values(self) -> List[str]:
        meta_values = []

        for meta_property in self.__files_meta_properties:
            meta_value = self.__excel_table[f'files_{meta_property}']
            meta_values.append(meta_value)

        return meta_values

    def __read_files(self) -> None:
        self.__read_files_meta_properties()

        files = self.__excel_table[ExcelColumn.files.value]
        dates = self.__excel_table[ExcelColumn.files_dates.value]
        sites = self.__excel_table[ExcelColumn.files_sites.value]
        tags = self.__excel_table[ExcelColumn.files_tags.value]
        metas = self.__read_files_meta_values()

        index_by_file = self.__get_index_map(files)

        for file, index in index_by_file.items():
            timestamp = self.__convert_date_to_timestamp(dates[index])
            site = sites[index]
            tag = tags[index] if type(tags[index]) is not numpy.float64 else ''
            meta = [str(m[index]) for m in metas]

            self.__files[file] = File(timestamp, site, tag, meta)

    def __store_settings(self) -> None:
        self.__storage.create_configuration()

        for setting, value in self.__settings.items():
            if value is None:
                continue

            self.__storage.create_configuration_setting(setting, value)

    def __store_files(self) -> None:
        if self.__storage.is_defined_files():
            return

        files = []
        timestamps = []
        sites = []
        tags = []
        metas = []

        for file_name, file in self.__files.items():
            files.append(file_name)
            timestamps.append(file.timestamp)
            sites.append(file.site)
            tags.append(file.tag)
            metas.append(file.meta)

        self.__storage.create_files(
            files=files,
            timestamps=timestamps,
            sites=sites,
            tags=tags,
            metas=metas,
        )

    def __store_metas(self):
        files_length = len(self.__files)

        meta_properties = self.__files_meta_properties
        meta_values = self.__read_files_meta_values()
        meta_sets: List[List[str]] = []

        for _ in enumerate(meta_values):
            meta_sets.append([])

        for meta_index, meta_value in enumerate(meta_values):
            shift = 1
            meta_slice = meta_value[0 + shift:files_length + shift]

            for value in meta_slice:
                if type(value) is float:
                    value = str(value)

                if value in meta_sets[meta_index]:
                    continue

                meta_sets[meta_index].append(value)

        self.__storage.create_metas(
            meta_properties,
            meta_sets,
        )

    def __read_ranges(self) -> None:
        ranges = self.__excel_table[ExcelColumn.ranges.value]
        values = self.__excel_table[ExcelColumn.ranges_values.value]

        index_by_range = self.__get_index_map(ranges)

        for range_, index in index_by_range.items():
            date_string = values[index]
            date_start, date_end = date_string.split('-')

            timestamp_start = self.__convert_date_to_timestamp(date_start)
            timestamp_end = self.__convert_date_to_timestamp(date_end)

            self.__ranges[range_] = Range(timestamp_start, timestamp_end)

    def __store_ranges(self) -> None:
        if self.__storage.is_defined_ranges():
            return

        ranges = []
        ranges_timestamps = []

        for range_name, range_ in self.__ranges.items():
            timestamps = [range_.start, range_.end]

            ranges.append(range_name)
            ranges_timestamps.append(timestamps)

        self.__storage.create_ranges(ranges, ranges_timestamps)

    def __read_bands(self) -> None:
        bands = self.__excel_table[ExcelColumn.bands.value]
        values = self.__excel_table[ExcelColumn.bands_values.value]

        index_by_band = self.__get_index_map(bands)

        for band, index in index_by_band.items():
            frequencies_string = values[index]
            low, high = frequencies_string.split('-')

            low = int(low)
            high = int(high)

            self.__bands[band] = Band(low, high)

    def __store_bands(self) -> None:
        if self.__storage.is_defined_bands():
            return

        bands = []
        bands_frequencies = []

        for band_name, band in self.__bands.items():
            frequencies = [band.low, band.high]

            bands.append(band_name)
            bands_frequencies.append(frequencies)

        self.__storage.create_bands(bands, bands_frequencies)

    def __read_umaps_integration(self, umap_index: int) -> int:
        umaps_integration = self.__excel_table[
            ExcelColumn.umaps_integration.value
        ]

        integration = umaps_integration[umap_index]

        if self.__is_nan(integration):
            raise ValueError(f'`umaps_integration` is not defined.')

        return int(integration)

    def __read_umaps_bands(self, umap_index: int) -> List[str]:
        umaps_bands = self.__excel_table[ExcelColumn.umaps_bands.value]
        bands = umaps_bands[umap_index]

        if self.__is_nan(bands):
            raise ValueError(f'`umaps_bands` is not defined.')

        bands = [band for band in bands.split(',')]

        return bands

    def __read_umaps_ranges(self, umap_index: int) -> List[str]:
        umaps_ranges = self.__excel_table[ExcelColumn.umaps_ranges.value]
        ranges = umaps_ranges[umap_index]

        if self.__is_nan(ranges):
            raise ValueError(f'`umaps_ranges` is not defined.')

        ranges = [r for r in ranges.split(',')]

        return ranges

    def __read_umaps_sites(self, umap_index: int) -> List[str]:
        umaps_sites = self.__excel_table[ExcelColumn.umaps_sites.value]
        sites = umaps_sites[umap_index]

        if self.__is_nan(sites):
            sites = self.__all_sites
        else:
            sites = [s for s in sites.split(',')]

        return sites

    def __read_umaps(self) -> None:
        umaps = self.__excel_table[ExcelColumn.umaps.value]
        index_by_umaps = self.__get_index_map(umaps)

        for umap, index in index_by_umaps.items():
            integration = self.__read_umaps_integration(index)
            bands = self.__read_umaps_bands(index)
            ranges = self.__read_umaps_ranges(index)
            sites = self.__read_umaps_sites(index)

            self.__umaps[umap] = Umap(
                integration=integration,
                bands=bands,
                ranges=ranges,
                sites=sites,
            )

    def __store_umaps(self) -> None:
        if self.__storage.is_defined_umaps():
            return

        umaps = []
        umaps_integrations = []
        umaps_bands = []
        umaps_ranges = []
        umaps_sites = []

        for umap_name, umap in self.__umaps.items():
            umaps.append(umap_name)
            umaps_integrations.append(umap.integration)
            umaps_bands.append(umap.bands)
            umaps_ranges.append(umap.ranges)
            umaps_sites.append(umap.sites)

        self.__storage.create_umaps(
            umaps,
            umaps_integrations,
            umaps_bands,
            umaps_ranges,
            umaps_sites,
        )
