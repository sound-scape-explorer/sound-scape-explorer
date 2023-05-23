from typing import Any, Iterable, List, Optional, Tuple, Union

import numpy
from h5py import Dataset, File

# noinspection PyProtectedMember
from h5py._hl.dataset import AsStrWrapper

from processing.common.Env import Env
from processing.common.SingletonMeta import SingletonMeta
from processing.config.ConfigBand import ConfigBand, ConfigBands
from processing.config.ConfigFile import ConfigFile, ConfigFiles
from processing.config.ConfigReducer import ConfigReducer, ConfigReducers
from processing.constants import DOCKER_BASE_PATH
from processing.settings.ConfigSetting import ConfigSettings
from processing.storage.StorageCompression import StorageCompression
from processing.storage.StorageFilesFeaturesAttribute import (
    StorageFilesFeaturesAttribute,
)
from processing.storage.StorageGroupsAttribute import StorageGroupsAttribute
from processing.storage.StorageMode import StorageMode
from processing.storage.StoragePath import StoragePath
from processing.utils.print_new_line import print_new_line


class Storage(metaclass=SingletonMeta):
    """The interface for handling HDF5 storage file."""

    __path: str
    __file: File

    def __init__(
        self,
        path: str,
    ) -> None:
        self.__path = path
        self.__set_file_or_fail()
        self.__succeed()

    def __succeed(self) -> None:
        print_new_line()
        print(f"Storage loaded: {self.__path}")

    def __set_file_or_fail(self) -> None:
        try:
            self.__file = File(
                self.__path,
                StorageMode.rw_or_create.value,
            )
        except BlockingIOError:
            raise RuntimeError(f"Could not load file: {self.__path}")
        except TypeError:
            raise FileNotFoundError(f"Could not find file: {self.__path}")

    @staticmethod
    def __get_file_features_path(
        band_name: str,
        file_index: int,
    ) -> str:
        return f"{StoragePath.features.value}" f"/{band_name}" f"/{file_index}"

    @staticmethod
    def __get_grouped_suffix(
        band: str,
        integration: int,
        file_index: int,
    ) -> str:
        return f"/{band}/{integration}/{file_index}"

    def close(self) -> None:
        self.__file.close()

    @staticmethod
    def __get_path_as_string(path: Union[StoragePath, str]) -> str:
        if type(path) is StoragePath:
            path = path.value

        path = str(path)
        return path

    def __write_dataset(
        self,
        path: Union[StoragePath, str],
        data: Any,
        compression: Optional[StorageCompression] = None,
        dtype: Optional[Any] = None,
        shape: Optional[Any] = None,
    ) -> None:
        path = self.__get_path_as_string(path)

        if self.exists_dataset(path):
            print(f"Dataset already exists: {path}")
            return

        if type(compression) is StorageCompression:
            compression = compression.value  # type: ignore

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
        path: Union[StoragePath, str],
    ) -> None:
        path = self.__get_path_as_string(path)

        if self.exists_attribute(path, key):
            print(f"Attribute already exists: {path} => {key}")
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
        try:
            path = self.__get_path_as_string(path)
            payload = self.__file[path]
            return payload  # type: ignore TODO
        except KeyError:
            raise KeyError(f"Could not get path: {path}")

    def get_ranges(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.ranges)
        return dataset.asstr()

    def get_ranges_timestamps(self) -> Dataset:
        return self.__get(StoragePath.ranges_timestamps)

    def get_bands(self) -> List[str]:
        dataset = self.__get(StoragePath.bands)
        bands = list(dataset.asstr()[:])
        return bands

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

    def read_config_files(self) -> ConfigFiles:
        names = self.read_files()
        timestamps = self.get_timestamps()
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

    def get_reducers(self) -> List[str]:
        dataset = self.__get(StoragePath.reducers)

        (length,) = dataset.shape
        if length == 0:
            return []

        reducers = list(dataset.asstr()[:])
        return reducers

    def get_grouped_reducers(
        self,
        band: str,
        integration: int,
    ) -> List[ConfigReducer]:
        reducers = self.get_config_reducers()

        grouped_reducers = []

        for reducer in reducers:
            if not self.is_band_integration_in_reducer(reducer, band, integration):
                continue

            grouped_reducers.append(reducer)

        return grouped_reducers

    def get_reduced_features(
        self,
        reducers: List[ConfigReducer],
        band: str,
        integration: int,
    ) -> List[List[List[float]]]:
        reduced_features = []

        for _ in reducers:
            reduced_features.append([])

        for r, reducer in enumerate(reducers):
            path = f"{StoragePath.reduced_.value}{reducer.index}/{band}/{integration}"
            dataset = self.__get(path)

            for features in dataset:
                reduced_features[r].append(features)

        return reduced_features

    def get_config_reducers(self) -> ConfigReducers:
        names = self.get_reducers()

        if len(names) == 0:
            return []

        dimensions = self.__get(StoragePath.reducers_dimensions)

        bands = self.__get(StoragePath.reducers_bands).asstr()
        integrations = self.__get(StoragePath.reducers_integrations).asstr()
        ranges = self.__get(StoragePath.reducers_ranges).asstr()

        bands = self.trim_rectangular(bands, "")
        integrations = self.trim_rectangular(integrations, "")
        ranges = self.trim_rectangular(ranges, "")

        reducers = []

        for index, name in enumerate(names):
            reducer = ConfigReducer(
                index=index,
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

    def read_files(self) -> List[str]:
        dataset = self.__get(StoragePath.files)
        files = list(dataset.asstr()[:])
        return files

    def get_indicators(self) -> List[str]:
        dataset = self.__get(StoragePath.indicators)

        (length,) = dataset.shape
        if length == 0:
            return []

        indicators = list(dataset.asstr()[:])
        return indicators

    def get_indicators_values(
        self,
        band: str,
        integration: int,
    ) -> List[List[float]]:
        indicators = self.get_indicators()

        values = []

        for i, _ in enumerate(indicators):
            values.append([])

        for i, _ in enumerate(indicators):
            for file_index in self.enumerate_file_indexes():
                suffix = self.__get_grouped_suffix(
                    band,
                    integration,
                    file_index,
                )
                path = f"{StoragePath.indicator_.value}{i}{suffix}"
                data = self.__get(path)

                for subset in data:
                    values[i].append(subset)

        return values

    def read_volumes(self) -> List[str]:
        dataset = self.__get(StoragePath.volumes)

        (length,) = dataset.shape
        if length == 0:
            return []

        volumes = list(dataset.asstr()[:])
        return volumes

    def read_matrices(self) -> List[str]:
        dataset = self.__get(StoragePath.matrices)

        (length,) = dataset.shape
        if length == 0:
            return []

        matrices = list(dataset.asstr()[:])
        return matrices

    def read_pairings(self) -> List[str]:
        dataset = self.__get(StoragePath.pairings)

        (length,) = dataset.shape
        if length == 0:
            return []

        pairings = list(dataset.asstr()[:])
        return pairings

    def get_volumes_values(
        self,
        band: str,
        integration: int,
    ) -> List[List[float]]:
        volumes = self.read_volumes()

        values = []

        for v, _ in enumerate(volumes):
            values.append([])

        for v, _ in enumerate(volumes):
            for file_index in self.enumerate_file_indexes():
                suffix = self.__get_grouped_suffix(band, integration, file_index)
                path = f"{StoragePath.volume_.value}{v}{suffix}"
                data = self.__get(path)

                for subset in data:
                    values[v].append(subset)

        return values

    def get_timestamps(self) -> Dataset:
        return self.__get(StoragePath.timestamps)

    def get_files_sites(self) -> List[str]:
        dataset = self.__get(StoragePath.files_sites)
        sites = list(dataset.asstr()[:])
        return sites

    def __get_files_metas(self) -> List[List[str]]:
        dataset = self.__get(StoragePath.files_metas)
        metas = list(list(sublist) for sublist in dataset.asstr()[:])
        return metas

    def get_integrations(self) -> List[str]:
        dataset = self.__get(StoragePath.integrations)
        integrations = list(dataset.asstr()[:])
        return integrations

    def get_integrations_seconds(self) -> Dataset:
        return self.__get(StoragePath.integrations_seconds)

    def read_features(
        self,
        band: str,
    ) -> Tuple[Dataset, int, int]:
        path = f"{StoragePath.features.value}/{band}"
        dataset = self.__get(path)
        files_count: int = dataset.attrs[
            StorageFilesFeaturesAttribute.files_count.value
        ]  # type: ignore

        seconds: int = dataset.attrs[
            StorageFilesFeaturesAttribute.seconds_per_file.value
        ]  # type: ignore

        return (dataset, files_count, seconds)

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
            elif type(path) is StoragePath:
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
        self.__delete_silently(StoragePath.features)

    def delete_config(self) -> None:
        self.__delete_silently(StoragePath.configuration)
        self.__delete_silently(StoragePath.files)
        self.__delete_silently(StoragePath.timestamps)
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

    def read_settings(self) -> ConfigSettings:
        configuration = self.__get(StoragePath.configuration)
        settings: ConfigSettings = configuration.attrs  # type: ignore
        return settings

    def get_umap_seed(self) -> int:
        settings = self.read_settings()
        return settings["umap_seed"]

    def get_expected_sample_rate(self) -> int:
        settings = self.read_settings()
        return settings["expected_sample_rate"]

    def get_base_path(self) -> str:
        if Env().is_docker is True:
            return DOCKER_BASE_PATH

        settings = self.read_settings()
        return settings["base_path"]

    def get_audio_folder(self) -> str:
        settings = self.read_settings()
        return settings["audio_folder"]

    def get_audio_path(self) -> str:
        base_path = self.get_base_path()
        audio_folder = self.get_audio_folder()
        return f"{base_path}/{audio_folder}"

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
        self.__write_dataset(
            StoragePath.files,
            files,
        )

        self.__write_dataset(
            path=StoragePath.timestamps,
            data=timestamps,
            compression=StorageCompression.gzip,
        )

        self.__write_dataset(
            StoragePath.files_sites,
            sites,
        )

        self.__write_dataset(
            StoragePath.files_metas,
            metas,
        )

    def create_ranges(
        self,
        ranges: Any,
        timestamps: Any,
    ) -> None:
        self.__write_dataset(
            StoragePath.ranges,
            ranges,
        )

        self.__write_dataset(
            path=StoragePath.ranges_timestamps,
            data=timestamps,
            compression=StorageCompression.gzip,
        )

    def create_bands(
        self,
        bands: Any,
        frequencies: Any,
    ) -> None:
        self.__write_dataset(
            StoragePath.bands,
            bands,
        )

        self.__write_dataset(
            path=StoragePath.bands_frequencies,
            data=frequencies,
            compression=StorageCompression.gzip,
        )

    def create_integrations(
        self,
        integrations: List[str],
        integrations_seconds: List[int],
    ) -> None:
        self.__write_dataset(
            path=StoragePath.integrations,
            data=integrations,
        )

        self.__write_dataset(
            path=StoragePath.integrations_seconds,
            data=integrations_seconds,
            compression=StorageCompression.gzip,
        )

    def create_file_features(self, features: Any, band: str, file_index: int) -> None:
        path = self.__get_file_features_path(band, file_index)

        self.__write_dataset(
            path,
            features,
            compression=StorageCompression.gzip,
        )

    def write_features(
        self,
        features: List[List[List[float]]],
        band: str,
    ) -> None:
        path = f"{StoragePath.features.value}/{band}"

        flat_features: List[List[float]] = []

        files_count = len(features)
        # We suppose that all audio files have the same length
        seconds_per_file = len(features[0])

        for f in range(files_count):
            for s in range(seconds_per_file):
                flat_features.append(features[f][s])

        self.__write_dataset(
            path=path, data=flat_features, compression=StorageCompression.gzip
        )

        dataset = self.__get(path)
        dataset.attrs[StorageFilesFeaturesAttribute.files_count.value] = files_count
        dataset.attrs[
            StorageFilesFeaturesAttribute.seconds_per_file.value
        ] = seconds_per_file

    def enumerate_file_indexes(self) -> Iterable[int]:
        files = self.read_files()

        for f, _ in enumerate(files):
            yield f

    def read_groups_count(self, band: str, integration: int) -> int:
        timestamps = self.read_grouped_timestamps(band, integration)
        groups_count: int = timestamps.attrs[
            StorageGroupsAttribute.groups_count.value
        ]  # type: ignore
        return groups_count

    def read_slices_per_group(self, band: str, integration: int) -> int:
        timestamps = self.read_grouped_timestamps(band, integration)
        slices_per_group: int = timestamps.attrs[
            StorageGroupsAttribute.slices_per_group.value
        ]  # type: ignore
        return slices_per_group

    def enumerate_group_indexes(
        self,
        band: str,
        integration: int,
    ):
        slices_per_group = self.read_slices_per_group(band, integration)

        for f in self.enumerate_file_indexes():
            for g in range(slices_per_group):
                yield f, g

    def enumerate_meta_properties(self):
        meta_properties = self.read_meta_properties()

        for meta_index, _ in enumerate(meta_properties):
            yield meta_index

    def enumerate_volumes(self):
        volumes = self.read_volumes()

        for index, name in enumerate(volumes):
            yield index, name

    def write_group(
        self,
        features: List[List[List[float]]],
        timestamps: List[List[int]],
        band: str,
        integration: int,
    ) -> None:
        suffix = f"{band}/{integration}"
        path_features = f"{StoragePath.grouped_features.value}/{suffix}"
        path_timestamps = f"{StoragePath.grouped_timestamps.value}/{suffix}"

        groups_count = len(features)
        # We suppose all audio files have same length, thus same group sizes.
        slices_per_group = len(features[0])

        flat_features: List[List[float]] = []
        flat_timestamps: List[int] = []

        for g in range(groups_count):
            for s in range(slices_per_group):
                flat_features.append(features[g][s])
                flat_timestamps.append(timestamps[g][s])

        self.__write_dataset(
            path=path_features,
            data=flat_features,
            compression=StorageCompression.gzip,
        )

        dataset_features = self.__get(path_features)
        dataset_features.attrs[StorageGroupsAttribute.groups_count.value] = groups_count
        dataset_features.attrs[
            StorageGroupsAttribute.slices_per_group.value
        ] = slices_per_group

        self.__write_dataset(
            path=path_timestamps,
            data=flat_timestamps,
            compression=StorageCompression.gzip,
        )

        dataset_timestamps = self.__get(path_timestamps)
        dataset_timestamps.attrs[
            StorageGroupsAttribute.groups_count.value
        ] = groups_count
        dataset_timestamps.attrs[
            StorageGroupsAttribute.slices_per_group.value
        ] = slices_per_group

    def create_group(
        self,
        features: List[List[float]],
        timestamps: List[int],
        band: str,
        integration: int,
    ):
        for f in self.enumerate_file_indexes():
            suffix = self.__get_grouped_suffix(band, integration, f)
            path_features = f"{StoragePath.grouped_features.value}{suffix}"
            path_timestamps = f"{StoragePath.grouped_timestamps.value}{suffix}"

            self.__write_dataset(
                path=path_features,
                data=features[f],
                compression=StorageCompression.gzip,
            )

            self.__write_dataset(
                path=path_timestamps,
                data=timestamps[f],
                compression=StorageCompression.gzip,
            )

    def __convert_integration_seconds_to_name(
        self,
        integration: int,
    ) -> str:
        names = self.get_integrations()
        integrations = self.get_integrations_seconds()

        index = numpy.where(integrations[:] == integration)
        index = index[0][0]
        name = names[index]
        name = str(name)

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

    def read_grouped_features(
        self,
        band: str,
        integration: int,
    ) -> Tuple[Dataset, int, int]:
        path = f"{StoragePath.grouped_features.value}/{band}/{integration}"
        dataset = self.__get(path)

        groups_count: int = dataset.attrs[
            StorageGroupsAttribute.groups_count.value
        ]  # type: ignore

        slices_per_group: int = dataset.attrs[
            StorageGroupsAttribute.slices_per_group.value
        ]  # type: ignore

        return (dataset, groups_count, slices_per_group)

    def read_grouped_features_all_files(
        self,
        band: str,
        integration: int,
    ) -> Dataset:
        features, _, _ = self.read_grouped_features(
            band=band,
            integration=integration,
        )

        return features

    def get_grouped_features(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> Dataset:
        suffix = self.__get_grouped_suffix(band, integration, file_index)
        path = f"{StoragePath.grouped_features.value}{suffix}"
        features = self.__get(path)
        return features

    def read_grouped_timestamps(
        self,
        band: str,
        integration: int,
    ) -> Dataset:
        suffix = f"/{band}/{integration}"
        path = f"{StoragePath.grouped_timestamps.value}{suffix}"
        features = self.__get(path)
        return features

    def write_reduced(
        self,
        band: str,
        integration: int,
        reducer_index: int,
        features: List[List[float]],
    ) -> None:
        suffix = f"/{band}/{integration}"
        path = f"{StoragePath.reduced_.value}{reducer_index}{suffix}"
        self.__write_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def delete_indicators(self) -> None:
        indicators = self.get_indicators()

        for index, _ in enumerate(indicators):
            path = f"{StoragePath.indicator_.value}{index}"
            self.__delete_silently(path)

    def write_indicator(
        self,
        index: int,
        band: str,
        integration: int,
        values: List[float],
    ) -> None:
        suffix = f"/{band}/{integration}"
        path = f"{StoragePath.indicator_.value}{index}{suffix}"
        self.__write_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def write_volume(
        self,
        band: str,
        integration: int,
        volume_index: int,
        meta_index: int,
        data: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, meta_index)
        path = f"{StoragePath.volume_.value}{volume_index}{suffix}"
        self.__write_dataset(
            path=path,
            data=data,
            compression=StorageCompression.gzip,
        )

    def write_pairing(
        self,
        band: str,
        integration: int,
        pairing_index: int,
        meta_index_a: int,
        meta_index_b: int,
        data: Tuple[List[float], List[float]],
    ) -> None:
        path = (
            f"{StoragePath.pairing_.value}{pairing_index}"
            f"/{band}/{integration}"
            f"/{meta_index_a}/{meta_index_b}"
        )

        # TODO: We store a only. Verify with business if reverse versuses are
        #  always identical.
        a, _ = data
        # array = [a, b]
        # rect = self.make_rectangular(array, fill_with=numpy.nan)

        self.__write_dataset(
            path=path,
            data=a,
            compression=StorageCompression.gzip,
        )

    def delete_pairings(self) -> None:
        for p, _ in enumerate([0]):
            path = f"{StoragePath.pairing_.value}{p}"
            self.__delete_silently(path)

    def write_matrix(
        self,
        band: str,
        integration: int,
        matrix_index: int,
        meta_index: int,
        data: List[float],
    ) -> None:
        suffix = self.__get_grouped_suffix(band, integration, meta_index)
        path = f"{StoragePath.matrix_.value}{matrix_index}{suffix}"
        self.__write_dataset(
            path=path,
            data=data,
            compression=StorageCompression.gzip,
        )

    def delete_matrices(self) -> None:
        for m, _ in enumerate([0, 1, 2]):
            path = f"{StoragePath.matrix_.value}{m}"
            self.__delete_silently(path)

    def delete_volumes(self) -> None:
        volumes = self.read_volumes()

        for v, _ in enumerate(volumes):
            path = f"{StoragePath.volume_.value}{v}"
            self.__delete_silently(path)

    def delete_reduced(self) -> None:
        reducers = self.get_reducers()

        for index, _ in enumerate(reducers):
            path = f"{StoragePath.reduced_.value}{index}"
            self.__delete_silently(path)

    def write_metas(
        self,
        meta_properties: List[str],
        meta_sets: List[List[str]],
    ) -> None:
        self.__write_dataset(
            path=StoragePath.meta_properties,
            data=meta_properties,
        )

        meta_sets = self.make_rectangular(meta_sets, "")

        self.__write_dataset(
            path=StoragePath.meta_sets,
            data=meta_sets,
        )

    def read_meta_properties(self) -> List[str]:
        meta_properties = self.__get(StoragePath.meta_properties)

        strings = list(meta_properties.asstr()[:])
        settings = self.read_settings()

        if settings["autocluster"]:
            strings.insert(0, "AUTOCLUSTER")

        return strings

    def is_defined_files(self) -> bool:
        return (
            self.exists_dataset(StoragePath.files.value)
            and self.exists_dataset(StoragePath.timestamps.value)
            and self.exists_dataset(StoragePath.files_sites.value)
            and self.exists_dataset(StoragePath.files_metas.value)
        )

    def is_defined_file_features(self, band: str, file_index: int) -> bool:
        path = self.__get_file_features_path(band, file_index)
        return self.exists_dataset(path)

    def is_defined_ranges(self) -> bool:
        return self.exists_dataset(StoragePath.ranges.value) and self.exists_dataset(
            StoragePath.ranges_timestamps.value
        )

    def is_defined_bands(self) -> bool:
        return self.exists_dataset(StoragePath.bands.value) and self.exists_dataset(
            StoragePath.bands_frequencies.value
        )

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
        if len(bands) != 0:
            bands = self.make_rectangular(bands, "")

        if len(integrations) != 0:
            integrations = self.make_rectangular(integrations, "")

        if len(ranges) != 0:
            ranges = self.make_rectangular(ranges, "")

        self.__write_dataset(
            path=StoragePath.reducers,
            data=reducers,
        )

        self.__write_dataset(
            path=StoragePath.reducers_dimensions,
            data=dimensions,
        )

        self.__write_dataset(
            path=StoragePath.reducers_bands,
            data=bands,
        )

        self.__write_dataset(
            path=StoragePath.reducers_integrations,
            data=integrations,
        )

        self.__write_dataset(
            path=StoragePath.reducers_ranges,
            data=ranges,
        )

    def write_indicators(
        self,
        indicators: List[str],
    ) -> None:
        self.__write_dataset(
            path=StoragePath.indicators,
            data=indicators,
        )

    def write_volumes(
        self,
        volumes: List[str],
    ) -> None:
        self.__write_dataset(
            path=StoragePath.volumes,
            data=volumes,
        )

    def write_matrices(
        self,
        matrices: List[str],
    ) -> None:
        self.__write_dataset(
            path=StoragePath.matrices,
            data=matrices,
        )

    def write_pairings(
        self,
        pairings: List[str],
    ) -> None:
        self.__write_dataset(
            path=StoragePath.pairings,
            data=pairings,
        )

    def write_autocluster(
        self,
        autocluster: List[int],
        band: str,
        integration: int,
    ) -> None:
        path = f"{StoragePath.autocluster.value}/{band}/{integration}"

        self.__write_dataset(
            path=path,
            data=autocluster,
        )

    def delete_autocluster(self) -> None:
        self.__delete_silently(StoragePath.autocluster)

    def __read_autocluster_values(
        self,
        band: str,
        integration: int,
    ) -> List[int]:
        path = f"{StoragePath.autocluster.value}/{band}/{integration}"
        dataset = self.__get(path)
        return dataset[:]

    def get_flat_index(
        self,
        file_index: int,
        group_index: int,
        slices_per_group: int,
    ) -> int:
        return file_index * slices_per_group + group_index

    def read_meta_values(
        self,
        band: str,
        integration: int,
    ) -> List[List[str]]:
        files = self.read_config_files()
        slices_per_group = self.read_slices_per_group(band, integration)

        meta_properties = self.read_meta_properties()
        meta_values = []

        settings = self.read_settings()
        autocluster = None

        if settings["autocluster"]:
            autocluster = self.__read_autocluster_values(band, integration)

        for mp, _ in enumerate(meta_properties):
            meta_property_values = []

            for file_index in self.enumerate_file_indexes():
                for group_index in range(slices_per_group):
                    f = self.get_flat_index(file_index, group_index, slices_per_group)

                    file_name = list(files)[file_index]
                    file_ = files[file_name]
                    meta = list(file_.meta)

                    if settings["autocluster"] and autocluster is not None:
                        meta.insert(0, str(autocluster[f]))

                    meta_value = meta[mp]
                    meta_property_values.append(meta_value)

            meta_values.append(meta_property_values)

        return meta_values

    def read_autocluster(self, band: str, integration: int) -> List[int]:
        path = f"{StoragePath.autocluster.value}/{band}/{integration}"
        dataset = self.__get(path)
        return dataset[:]

    def migrate_v8(self) -> None:
        print_new_line()
        print("Migrating v8 storage file")

        bands = self.get_bands()
        integrations = self.get_integrations_seconds()[:]

        self.__migrate_v8_grouped_features_and_timestamps(bands, integrations)
        self.__migrate_v8_reduced_features(bands, integrations)

        print_new_line()

    def __migrate_v8_grouped_features_and_timestamps(
        self,
        bands: List[str],
        integrations: List[int],
    ) -> None:
        print_new_line()
        print("Migrating grouped features and timestamps")

        for band in bands:
            for integration in integrations:
                grouped_features = []
                grouped_timestamps = []

                # Collect old data
                for file_index in self.enumerate_file_indexes():
                    suffix = f"/{band}/{integration}/{file_index}"

                    # Grouped features
                    grouped_features_old_path = (
                        f"{StoragePath.grouped_features.value}{suffix}"
                    )
                    grouped_features_old_values = self.__get(grouped_features_old_path)
                    grouped_features.append(grouped_features_old_values[:])
                    self.__delete_silently(grouped_features_old_path)

                    # Grouped timestamps
                    grouped_timestamps_old_path = (
                        f"{StoragePath.grouped_timestamps.value}{suffix}"
                    )
                    grouped_timestamps_old_values = self.__get(
                        grouped_timestamps_old_path
                    )
                    grouped_timestamps.append(grouped_timestamps_old_values[:])
                    self.__delete_silently(grouped_timestamps_old_path)

                # Remove leftovers
                grouped_features_path = (
                    f"{StoragePath.grouped_features.value}/{band}/{integration}"
                )
                self.__delete_silently(grouped_features_path)

                grouped_timestamps_path = (
                    f"{StoragePath.grouped_timestamps.value}/{band}/{integration}"
                )
                self.__delete_silently(grouped_timestamps_path)

                # Write new data
                self.write_group(
                    features=grouped_features,
                    timestamps=grouped_timestamps,
                    band=band,
                    integration=integration,
                )

    def __migrate_v8_reduced_features(
        self,
        bands: List[str],
        integrations: List[int],
    ) -> None:
        print_new_line()
        print("Migrating reduced features")

        reducers = self.get_reducers()

        for band in bands:
            for integration in integrations:
                for reducer_index, _ in enumerate(reducers):
                    reduced_features = []

                    # Collect old data
                    for file_index in self.enumerate_file_indexes():
                        suffix = f"/{band}/{integration}/{file_index}"
                        reduced_features_old_path = (
                            f"{StoragePath.reduced_.value}{reducer_index}{suffix}"
                        )
                        reduced_features_old_values = self.__get(
                            reduced_features_old_path
                        )

                        for reduced_features_old_slice in reduced_features_old_values:
                            reduced_features.append(reduced_features_old_slice)

                        self.__delete_silently(reduced_features_old_path)

                    # Remove leftovers
                    reduced_features_path = (
                        f"{StoragePath.reduced_.value}{reducer_index}"
                        f"/{band}/{integration}"
                    )
                    self.__delete_silently(reduced_features_path)

                    # Write new data
                    self.write_reduced(
                        band=band,
                        integration=integration,
                        reducer_index=reducer_index,
                        features=reduced_features,
                    )
