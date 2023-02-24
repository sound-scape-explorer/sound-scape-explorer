import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

import math
import numpy
import pandas
from pandas import DataFrame, ExcelFile, Series

from processing.config.enums.ConfigExcelColumn import ConfigExcelColumn
from processing.config.types.ConfigBands import ConfigBands
from processing.config.types.ConfigFiles import ConfigFiles
from processing.config.types.ConfigRanges import ConfigRanges
from processing.config.types.ConfigSettings import ConfigSettings
from processing.config.types.ConfigUMAPs import ConfigUMAPs
from processing.shared.SingletonMeta import SingletonMeta
from processing.storage.Storage import Storage


class Config(metaclass=SingletonMeta):
    __path: str
    __sheet: str = 'Sheet1'
    __excel: ExcelFile
    __excel_table: DataFrame
    __settings: ConfigSettings = {}
    __files: ConfigFiles = {}
    __files_meta_properties: List[str]
    __ranges: ConfigRanges = {}
    __bands: ConfigBands = {}
    __umaps: ConfigUMAPs = {}
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
            site = file['site']

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

    def get_files(self) -> ConfigFiles:
        return self.__files

    def get_bands(self) -> ConfigBands:
        return self.__bands

    def get_meta_properties(self) -> List[str]:
        return self.__files_meta_properties

    def __read_settings(self) -> None:
        settings = self.__excel_table[ConfigExcelColumn.settings.value]
        values = self.__excel_table[ConfigExcelColumn.settings_values.value]

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
                    or ConfigExcelColumn.files.value == column \
                    or ConfigExcelColumn.files_dates.value == column \
                    or ConfigExcelColumn.files_tags.value == column \
                    or ConfigExcelColumn.files_sites.value == column:
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

        files = self.__excel_table[ConfigExcelColumn.files.value]
        dates = self.__excel_table[ConfigExcelColumn.files_dates.value]
        sites = self.__excel_table[ConfigExcelColumn.files_sites.value]
        tags = self.__excel_table[ConfigExcelColumn.files_tags.value]
        metas = self.__read_files_meta_values()

        index_by_file = self.__get_index_map(files)

        for file, index in index_by_file.items():
            self.__files[file] = {
                'timestamp': self.__convert_date_to_timestamp(dates[index]),
                'site': sites[index],
                'tag': tags[index],
                'meta': [str(m[index]) for m in metas],
            }

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

        for file, values in self.__files.items():
            files.append(file)
            timestamps.append(values['timestamp'])
            sites.append(values['site'])
            tags.append(values['tag'])
            metas.append(values['meta'])

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

        for _ in range(files_length):
            meta_sets.append([])

        for (meta_index, meta_value) in enumerate(meta_values):
            shift = 1
            meta_slice = meta_value[0 + shift:files_length + shift]

            for value in meta_slice:
                if value in meta_sets[meta_index]:
                    continue

                meta_sets[meta_index].append(value)

        self.__storage.create_metas(
            meta_properties,
            meta_sets,
        )

    def __read_ranges(self) -> None:
        ranges = self.__excel_table[ConfigExcelColumn.ranges.value]
        values = self.__excel_table[ConfigExcelColumn.ranges_values.value]

        index_by_range = self.__get_index_map(ranges)

        for range_, index in index_by_range.items():
            date_string = values[index]
            date_start, date_end = date_string.split('-')

            timestamp_start = self.__convert_date_to_timestamp(date_start)
            timestamp_end = self.__convert_date_to_timestamp(date_end)

            self.__ranges[range_] = {
                'start': timestamp_start,
                'end': timestamp_end,
            }

    def __store_ranges(self) -> None:
        if self.__storage.is_defined_ranges():
            return

        ranges = []
        ranges_timestamps = []

        for range_, timestamps in self.__ranges.items():
            timestamps = [t for t in timestamps.values()]

            ranges.append(range_)
            ranges_timestamps.append(timestamps)

        self.__storage.create_ranges(ranges, ranges_timestamps)

    def __read_bands(self) -> None:
        bands = self.__excel_table[ConfigExcelColumn.bands.value]
        values = self.__excel_table[ConfigExcelColumn.bands_values.value]

        index_by_band = self.__get_index_map(bands)

        for band, index in index_by_band.items():
            frequencies_string = values[index]
            low, high = frequencies_string.split('-')

            low = int(low)
            high = int(high)

            self.__bands[band] = {
                'low': low,
                'high': high,
            }

    def __store_bands(self) -> None:
        if self.__storage.is_defined_bands():
            return

        bands = []
        bands_frequencies = []

        for band, frequencies in self.__bands.items():
            frequencies = [f for f in frequencies.values()]

            bands.append(band)
            bands_frequencies.append(frequencies)

        self.__storage.create_bands(bands, bands_frequencies)

    def __read_umaps_integration(self, umap_index: int) -> int:
        umaps_integration = self.__excel_table[
            ConfigExcelColumn.umaps_integration.value
        ]

        integration = umaps_integration[umap_index]

        if self.__is_nan(integration):
            raise ValueError(f'`umaps_integration` is not defined.')

        return int(integration)

    def __read_umaps_bands(self, umap_index: int) -> List[str]:
        umaps_bands = self.__excel_table[ConfigExcelColumn.umaps_bands.value]
        bands = umaps_bands[umap_index]

        if self.__is_nan(bands):
            raise ValueError(f'`umaps_bands` is not defined.')

        bands = [band for band in bands.split(',')]

        return bands

    def __read_umaps_ranges(self, umap_index: int) -> List[str]:
        umaps_ranges = self.__excel_table[ConfigExcelColumn.umaps_ranges.value]
        ranges = umaps_ranges[umap_index]

        if self.__is_nan(ranges):
            raise ValueError(f'`umaps_ranges` is not defined.')

        ranges = [r for r in ranges.split(',')]

        return ranges

    def __read_umaps_sites(self, umap_index: int) -> List[str]:
        umaps_sites = self.__excel_table[ConfigExcelColumn.umaps_sites.value]
        sites = umaps_sites[umap_index]

        if self.__is_nan(sites):
            sites = self.__all_sites
        else:
            sites = [s for s in sites.split(',')]

        return sites

    def __read_umaps(self) -> None:
        umaps = self.__excel_table[ConfigExcelColumn.umaps.value]
        index_by_umaps = self.__get_index_map(umaps)

        for umap, index in index_by_umaps.items():
            integration = self.__read_umaps_integration(index)
            bands = self.__read_umaps_bands(index)
            ranges = self.__read_umaps_ranges(index)
            sites = self.__read_umaps_sites(index)

            self.__umaps[umap] = {
                'integration': integration,
                'bands': bands,
                'ranges': ranges,
                'sites': sites,
            }

    def __store_umaps(self) -> None:
        if self.__storage.is_defined_umaps():
            return

        umaps = []
        umaps_integrations = []
        umaps_bands = []
        umaps_ranges = []
        umaps_sites = []

        for umap, content in self.__umaps.items():
            umaps.append(umap)
            umaps_integrations.append(content['integration'])
            umaps_bands.append(content['bands'])
            umaps_ranges.append(content['ranges'])
            umaps_sites.append(content['sites'])

        self.__storage.create_umaps(
            umaps,
            umaps_integrations,
            umaps_bands,
            umaps_ranges,
            umaps_sites,
        )
