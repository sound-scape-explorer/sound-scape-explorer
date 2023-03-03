from typing import Any, List, Optional, Union

import numpy
from h5py import Dataset, File
# noinspection PyProtectedMember
from h5py._hl.dataset import AsStrWrapper

from processing.config.ConfigBand import ConfigBand, ConfigBands
from processing.config.ConfigFile import ConfigFile, ConfigFiles
from processing.config.ConfigReducer import ConfigReducer, ConfigReducers
from processing.settings.StorageSetting import StorageSetting
from processing.shared.SingletonMeta import SingletonMeta
from processing.storage.StorageCompression import StorageCompression
from processing.storage.StorageMode import StorageMode
from processing.storage.StoragePath import StoragePath


class Storage(metaclass=SingletonMeta):
    """The interface for handling HDF5 storage file."""
    __path: str
    __file: File

    def __init__(
        self,
        path: Optional[str] = 'sse.h5'
    ) -> None:
        self.__path = path
        self.__set_file_or_fail()

    def __set_file_or_fail(self) -> None:
        try:
            self.__file = File(
                self.__path,
                StorageMode.rw_or_create.value,
            )
        except BlockingIOError:
            raise RuntimeError(f'Could not open file {self.__path}')

    @staticmethod
    def __get_file_features_path(
        band_name: str,
        file_index: int,
    ) -> str:
        return f'{StoragePath.files_features.value}' \
               f'/{band_name}' \
               f'/{file_index}'

    @staticmethod
    def __get_grouped_suffix(
        band: str,
        integration: int,
        file_index: int,
    ) -> str:
        return f'/{band}/{integration}/{file_index}'

    def close(self) -> None:
        self.__file.close()

    @staticmethod
    def __get_path_as_string(path: Union[StoragePath, str]) -> str:
        if type(path) is StoragePath:
            path = path.value

        return path

    def __create_dataset(
        self,
        path: Union[StoragePath, str],
        data: Any,
        compression: Optional[StorageCompression] = None,
        dtype: Optional[Any] = None,
        shape: Optional[Any] = None,
    ) -> None:
        path = self.__get_path_as_string(path)

        if self.exists_dataset(path):
            print(f'Dataset already exists: {path}')
            return

        if type(compression) is StorageCompression:
            compression = compression.value

        self.__file.create_dataset(
            path,
            data=data,
            compression=compression,
            dtype=dtype,
            shape=shape,
        )

    def create_attribute(
        self,
        key: str,
        value: Any,
        path: StoragePath,
    ) -> None:
        path = self.__get_path_as_string(path)

        if self.exists_attribute(path, key):
            print(f'Attribute already exists: {path} => {key}')
            return

        self.__file[path].attrs[key] = value

    def exists_attribute(
        self,
        path: Union[StoragePath, str],
        key: str,
    ) -> bool:
        path = self.__get_path_as_string(path)

        try:
            _ = self.__get(path).attrs[key]
            return True
        except KeyError:
            return False

    def exists_dataset(
        self,
        path: Union[StoragePath, str],
    ) -> bool:
        path = self.__get_path_as_string(path)

        try:
            _ = self.__get(path)
            return True
        except KeyError:
            return False

    def __get(
        self,
        path: Union[StoragePath, str],
    ) -> Dataset:
        path = self.__get_path_as_string(path)
        payload = self.__file[path]
        return payload

    def get_ranges(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.ranges)
        return dataset.asstr()

    def get_ranges_timestamps(self) -> Dataset:
        return self.__get(StoragePath.ranges_timestamps)

    def get_bands(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.bands)
        return dataset.asstr()

    def get_config_bands(self) -> ConfigBands:
        names = self.get_bands()
        frequencies = self.get_bands_frequencies()

        bands = {}

        for index, name in enumerate(names):
            f = frequencies[index]
            low = f[0]
            high = f[1]

            bands[name] = ConfigBand(
                name=name,
                low=low,
                high=high,
            )

        return bands

    def get_config_files(self) -> ConfigFiles:
        names = self.get_files()
        timestamps = self.get_files_timestamps()
        sites = self.get_files_sites()
        metas = self.__get_files_metas()

        files = {}

        for index, name in enumerate(names):
            timestamp = timestamps[index]
            site = sites[index]
            meta = metas[index]

            files[name] = ConfigFile(
                file=name,
                timestamp=timestamp,
                site=site,
                meta=meta,
            )

        return files

    def get_reducers(self) -> AsStrWrapper:
        return self.__get(StoragePath.reducers).asstr()

    def get_config_reducers(self) -> ConfigReducers:
        names = self.get_reducers()
        dimensions = self.__get(StoragePath.reducers_dimensions)

        bands = self.__get(StoragePath.reducers_bands).asstr()
        integrations = self.__get(StoragePath.reducers_integrations).asstr()
        ranges = self.__get(StoragePath.reducers_ranges).asstr()

        bands = self.trim_rectangular(bands, '')
        integrations = self.trim_rectangular(integrations, '')
        ranges = self.trim_rectangular(ranges, '')

        reducers = []

        for index, name in enumerate(names):
            reducer = ConfigReducer(
                name=name,
                dimensions=dimensions[index],
                bands=bands[index],
                integrations=integrations[index],
                ranges=ranges[index],
            )

            reducers.append(reducer)

        return reducers

    def get_bands_frequencies(self) -> Dataset:
        return self.__get(StoragePath.bands_frequencies)

    def get_files(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.files)
        return dataset.asstr()

    def get_indicators(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.indicators)
        return dataset.asstr()

    def get_volumes(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.volumes)
        return dataset.asstr()

    def get_files_timestamps(self) -> Dataset:
        return self.__get(StoragePath.files_timestamps)

    def get_files_sites(self) -> Dataset:
        dataset = self.__get(StoragePath.files_sites)
        return dataset.asstr()

    def __get_files_metas(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.files_metas)
        return dataset.asstr()

    def get_integrations(self) -> AsStrWrapper:
        return self.__get(StoragePath.integrations).asstr()

    def get_integrations_seconds(self) -> Dataset:
        return self.__get(StoragePath.integrations_seconds)

    def get_file_features(
        self,
        band_name: str,
        file_index: int,
    ) -> Dataset:
        path = self.__get_file_features_path(
            band_name,
            file_index,
        )

        return self.__get(path)

    def __delete_silently(
        self,
        path: Union[StoragePath, str],
    ) -> None:
        try:
            if type(path) is str:
                del self.__file[path]
                return

            del self.__file[path.value]
        except KeyError:
            return

    def delete_file_features(
        self,
        band: str,
        file_index: int,
    ) -> None:
        path = self.__get_file_features_path(
            band_name=band,
            file_index=file_index,
        )

        del self.__file[path]

    def delete_groups(self) -> None:
        self.__delete_silently(StoragePath.grouped_features)
        self.__delete_silently(StoragePath.grouped_timestamps)

    def delete_files_features(self) -> None:
        self.__delete_silently(StoragePath.files_features)

    def delete_config(self) -> None:
        self.__delete_silently(StoragePath.configuration)
        self.__delete_silently(StoragePath.files)
        self.__delete_silently(StoragePath.files_timestamps)
        self.__delete_silently(StoragePath.files_sites)
        self.__delete_silently(StoragePath.files_metas)
        self.__delete_silently(StoragePath.meta_properties)
        self.__delete_silently(StoragePath.meta_sets)
        self.__delete_silently(StoragePath.bands)
        self.__delete_silently(StoragePath.bands_frequencies)
        self.__delete_silently(StoragePath.integrations)
        self.__delete_silently(StoragePath.integrations_seconds)
        self.__delete_silently(StoragePath.reducers)
        self.__delete_silently(StoragePath.reducers_dimensions)
        self.__delete_silently(StoragePath.reducers_bands)
        self.__delete_silently(StoragePath.reducers_integrations)
        self.__delete_silently(StoragePath.reducers_ranges)
        self.__delete_silently(StoragePath.indicators)
        self.__delete_silently(StoragePath.volumes)

    def __get_settings(self) -> Dataset.attrs:
        return self.__get(StoragePath.configuration).attrs

    def get_umap_seed(self) -> int:
        settings = self.__get_settings()
        return settings[StorageSetting.umap_seed.value]

    def get_expected_sample_rate(self) -> int:
        settings = self.__get_settings()
        return settings[StorageSetting.expected_sample_rate.value]

    def get_base_path(self) -> str:
        settings = self.__get_settings()
        return settings[StorageSetting.base_path.value]

    def get_audio_folder(self) -> str:
        settings = self.__get_settings()
        return settings[StorageSetting.audio_folder.value]

    def get_audio_path(self) -> str:
        base_path = self.get_base_path()
        audio_folder = self.get_audio_folder()
        return f'{base_path}/{audio_folder}'

    def create_configuration(self) -> None:
        self.__file.create_group(StoragePath.configuration.value)
        # self.__create_dataset(StoragePath.configuration, '')

    def create_configuration_setting(
        self,
        setting: Any,
        value: Any,
    ) -> None:
        self.create_attribute(
            key=setting,
            value=value,
            path=StoragePath.configuration,
        )

    def create_files(
        self,
        files: Any,
        timestamps: Any,
        sites: Any,
        metas: Any,
    ) -> None:
        self.__create_dataset(
            StoragePath.files,
            files,
        )

        self.__create_dataset(
            path=StoragePath.files_timestamps,
            data=timestamps,
            compression=StorageCompression.gzip,
        )

        self.__create_dataset(
            StoragePath.files_sites,
            sites,
        )

        self.__create_dataset(
            StoragePath.files_metas,
            metas,
        )

    def create_ranges(
        self,
        ranges: Any,
        timestamps: Any,
    ) -> None:
        self.__create_dataset(
            StoragePath.ranges,
            ranges,
        )

        self.__create_dataset(
            path=StoragePath.ranges_timestamps,
            data=timestamps,
            compression=StorageCompression.gzip,
        )

    def create_bands(
        self,
        bands: Any,
        frequencies: Any,
    ) -> None:
        self.__create_dataset(
            StoragePath.bands,
            bands,
        )

        self.__create_dataset(
            path=StoragePath.bands_frequencies,
            data=frequencies,
            compression=StorageCompression.gzip,
        )

    def create_integrations(
        self,
        integrations: List[str],
        integrations_seconds: List[int],
    ) -> None:
        self.__create_dataset(
            path=StoragePath.integrations,
            data=integrations,
        )

        self.__create_dataset(
            path=StoragePath.integrations_seconds,
            data=integrations_seconds,
            compression=StorageCompression.gzip,
        )

    def create_file_features(
        self,
        features: Any,
        band: str,
        file_index: int
    ) -> None:
        path = self.__get_file_features_path(band, file_index)

        self.__create_dataset(
            path,
            features,
            compression=StorageCompression.gzip,
        )

    def create_group_features(
        self,
        features: List[List[float]],
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.grouped_features.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_timestamps(
        self,
        timestamps: List[int],
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.grouped_timestamps.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=timestamps,
            compression=StorageCompression.gzip,
        )

    def __convert_integration_seconds_to_name(
        self,
        integration: int,
    ) -> str:
        names = self.get_integrations()
        integrations = self.get_integrations_seconds()

        index = numpy.where(integrations == integration)
        index = index[0][0]
        name = names[index]

        return name

    def is_band_integration_in_reducer(
        self,
        reducer: ConfigReducer,
        band: str,
        integration: int,
    ) -> bool:
        if band not in reducer.bands:
            return False

        integration_name = self.__convert_integration_seconds_to_name(
            integration=integration,
        )

        if integration_name not in reducer.integrations:
            return False

        return True

    def get_grouped_features_all_files_flat(
        self,
        band: str,
        integration: int,
    ) -> List[Dataset]:
        files = self.get_files()
        all_features = []

        for file_index, _ in enumerate(files):
            grouped_features = self.get_grouped_features(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for features in grouped_features:
                all_features.append(features)

        return all_features

    def get_grouped_features(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> Dataset:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.grouped_features.value}{suffix}'
        features = self.__get(path)
        return features

    def get_group_timestamps(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> Dataset:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.grouped_timestamps.value}{suffix}'

        features = self.__get(path)

        return features

    def write_reduced(
        self,
        band: str,
        integration: int,
        file_index: int,
        reducer_index: int,
        features: List[List[float]],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.reduced_.value}{reducer_index}{suffix}'
        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def delete_group_indicators(self) -> None:
        self.__delete_silently(StoragePath.indicator_leq_enes)
        self.__delete_silently(StoragePath.indicator_leq_maad)
        self.__delete_silently(StoragePath.indicator_temporal_median)
        self.__delete_silently(StoragePath.indicator_temporal_entropy)
        self.__delete_silently(StoragePath.indicator_frequency_entropy)
        self.__delete_silently(
            StoragePath.indicator_acoustic_complexity_index,
        )
        self.__delete_silently(
            StoragePath.indicator_acoustic_diversity_index,
        )
        self.__delete_silently(StoragePath.indicator_bioacoustics_index)
        self.__delete_silently(StoragePath.indicator_soundscape_index)

    def create_group_indicator_leq_enes(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.indicator_leq_enes.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_leq_maad(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.indicator_leq_maad.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_temporal_median(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.indicator_temporal_median.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_temporal_entropy(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.indicator_temporal_entropy.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_frequency_entropy(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.indicator_frequency_entropy.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_acoustic_complexity_index(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = StoragePath.indicator_acoustic_complexity_index.value
        path += suffix

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_acoustic_diversity_index(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = StoragePath.indicator_acoustic_diversity_index.value
        path += suffix

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_bioacoustics_index(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.indicator_bioacoustics_index.value}' \
               f'{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_soundscape_index(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.indicator_soundscape_index.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def delete_volumes(self) -> None:
        self.__delete_silently(StoragePath.volume_sum_var)
        self.__delete_silently(StoragePath.volume_sum_std)
        self.__delete_silently(StoragePath.volume_mean_std)
        self.__delete_silently(StoragePath.volume_mean_spreading)

    def delete_reduced(self) -> None:
        reducers = self.get_reducers()

        for index, _ in enumerate(reducers):
            path = f'{StoragePath.reduced_.value}{index}'
            self.__delete_silently(path)

    def create_group_volume_sum_var(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.volume_sum_var.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_volume_sum_std(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.volume_sum_std.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_volume_mean_std(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.volume_mean_std.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_volume_mean_spreading(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f'{StoragePath.volume_mean_spreading.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_metas(
        self,
        meta_properties: List[str],
        meta_sets: List[List[str]],
    ) -> None:
        self.__create_dataset(
            path=StoragePath.meta_properties.value,
            data=meta_properties,
        )

        for (index, meta_property) in enumerate(meta_properties):
            path = f'{StoragePath.meta_sets.value}/{meta_property}'

            self.__create_dataset(
                path=path,
                data=meta_sets[index],
            )

    def is_defined_files(self) -> bool:
        return self.exists_dataset(StoragePath.files.value) \
            and self.exists_dataset(StoragePath.files_timestamps.value) \
            and self.exists_dataset(StoragePath.files_sites.value) \
            and self.exists_dataset(StoragePath.files_metas.value)

    def is_defined_file_features(self, band: str, file_index: int) -> bool:
        path = self.__get_file_features_path(band, file_index)
        return self.exists_dataset(path)

    def is_defined_ranges(self) -> bool:
        return self.exists_dataset(StoragePath.ranges.value) \
            and self.exists_dataset(StoragePath.ranges_timestamps.value)

    def is_defined_bands(self) -> bool:
        return self.exists_dataset(StoragePath.bands.value) \
            and self.exists_dataset(StoragePath.bands_frequencies.value)

    @staticmethod
    def make_rectangular(
        non_rectangular_array,
        fill_with=None,
    ):
        # Determine the maximum length of the sub-arrays
        max_length = max(len(sub_array) for sub_array in non_rectangular_array)

        # Iterate through each sub-array and append None values to the end
        # until it has the maximum length
        rectangular_array = []
        for sub_array in non_rectangular_array:
            if len(sub_array) < max_length:
                sub_array += [fill_with] * (max_length - len(sub_array))
            rectangular_array.append(sub_array)

        # Return the new rectangular array
        return rectangular_array

    @staticmethod
    def trim_rectangular(
        rectangular_array,
        trim_with=None,
    ):
        jagged_array = []

        for sub_list in rectangular_array:
            trimmed_list = [e for e in sub_list if e is not trim_with]
            jagged_array.append(trimmed_list)

        return jagged_array

    def write_reducers(
        self,
        reducers: List[str],
        dimensions: List[int],
        bands: List[List[str]],
        integrations: List[List[str]],
        ranges: List[List[str]],
    ) -> None:
        bands = self.make_rectangular(bands, '')
        integrations = self.make_rectangular(integrations, '')
        ranges = self.make_rectangular(ranges, '')

        self.__create_dataset(
            path=StoragePath.reducers,
            data=reducers,
        )

        self.__create_dataset(
            path=StoragePath.reducers_dimensions,
            data=dimensions,
        )

        self.__create_dataset(
            path=StoragePath.reducers_bands,
            data=bands,
        )

        self.__create_dataset(
            path=StoragePath.reducers_integrations,
            data=integrations,
        )

        self.__create_dataset(
            path=StoragePath.reducers_ranges,
            data=ranges,
        )

    def create_indicators(
        self,
        indicators: List[str],
    ) -> None:
        self.__create_dataset(
            path=StoragePath.indicators,
            data=indicators,
        )

    def create_volumes(
        self,
        volumes: List[str],
    ) -> None:
        self.__create_dataset(
            path=StoragePath.volumes,
            data=volumes,
        )
