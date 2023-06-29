from typing import Any, Generator, Iterable, List, Optional, Tuple, Union

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
        return f"{StoragePath.files_features.value}" f"/{band_name}" f"/{file_index}"

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

    def read(
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
        timestamps = self.read_timestamps()
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

    def read_indicators(self) -> List[str]:
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
        indicators = self.read_indicators()

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

    def read_timestamps(self) -> Dataset:
        return self.__get(StoragePath.files_timestamps)

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
    ) -> Tuple[Dataset, Dataset, int]:
        files_features_path = f"{StoragePath.files_features.value}/{band}"
        files_features_dataset = self.__get(files_features_path)

        files_durations_dataset = self.__get(StoragePath.files_durations.value)

        files_count = files_durations_dataset.len()

        return files_features_dataset, files_durations_dataset, files_count

    # TODO: To Remove
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
        self.__delete_silently(StoragePath.grouped_durations)

    def delete_files(self) -> None:
        self.__delete_silently(StoragePath.files_features)
        self.__delete_silently(StoragePath.files_durations)
        self.__delete_silently(StoragePath.files_groups_count)

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

    def read_audio_path(self) -> str:
        settings = self.read_settings()
        audio_path = settings["audio_path"]

        if Env().is_docker is True:
            base_path = DOCKER_BASE_PATH
            audio_folder = audio_path.split("/")[-1]
            docker_path = f"{base_path}/{audio_folder}"
            return docker_path

        return audio_path

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
            path=StoragePath.files_timestamps,
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

    def has_files_durations(
        self,
    ) -> bool:
        return self.exists_dataset(StoragePath.files_durations.value)

    def append_files_durations(
        self,
        features: List[List[float]],
    ) -> None:
        duration = len(features)
        durations_path = f"{StoragePath.files_durations.value}"
        durations_increment = 1

        if not self.has_files_durations():
            self.__file.create_dataset(
                name=durations_path,
                data=duration,
                compression=StorageCompression.gzip.value,
                chunks=True,
                shape=(1, 1),
                maxshape=(None, 1),
            )
            return

        durations_dataset: Dataset = self.__file[durations_path]  # type: ignore
        durations_new_shape = durations_dataset.shape[0] + durations_increment
        durations_dataset.resize(durations_new_shape, axis=0)
        durations_dataset[-durations_increment:] = duration

    def append_files_groups_count(
        self,
        integration: int,
        groups_count: int,
    ) -> None:
        path = f"{StoragePath.files_groups_count.value}/{integration}"
        payload = [groups_count]

        # Appending
        if self.exists_dataset(path):
            dataset: Dataset = self.__file[path]  # type: ignore
            new_shape = dataset.shape[0] + 1
            dataset.resize(new_shape, axis=0)
            dataset[-1:] = payload
            return

        # Creating
        self.__file.create_dataset(
            name=path,
            data=payload,
            compression=StorageCompression.gzip.value,
            chunks=True,
            shape=(1, 1),
            maxshape=(None, 1),
        )

    def append_features(
        self,
        band: str,
        features: List[List[float]],
    ) -> None:
        features_path = f"{StoragePath.files_features.value}/{band}"
        duration = len(features)

        if not self.exists_dataset(features_path):
            self.__file.create_dataset(
                name=features_path,
                data=features,
                compression=StorageCompression.gzip.value,
                chunks=True,
                shape=(duration, 128),
                maxshape=(None, 128),
            )
            return

        features_dataset: Dataset = self.__file[features_path]  # type: ignore
        features_new_shape = features_dataset.shape[0] + duration
        features_dataset.resize(features_new_shape, axis=0)
        features_dataset[-duration:] = features

    def enumerate_file_indexes(self) -> Iterable[int]:
        files = self.read_files()

        for f, _ in enumerate(files):
            yield f

    def enumerate_group_indexes(
        self,
        band: str,
        integration: int,
    ):
        for file_index, groups_count, _, _, _ in self.enumerate_files(
            band, integration
        ):
            for group_index in range(groups_count):
                yield file_index, group_index

    def enumerate_files(
        self,
        band: str,
        integration: int,
    ) -> Generator[Tuple[int, int, int, int, List[List[float]]], None, None]:
        features, durations, count = self.read_features(band)
        timestamps = self.read_timestamps()

        duration_current_position = 0

        for file_index in range(count):
            file_duration: int = durations[file_index][0]  # seconds
            duration_start = duration_current_position
            duration_end = duration_current_position + file_duration

            file_features: List[List[float]] = list(
                features[duration_start:duration_end]
            )

            file_timestamp: int = timestamps[file_index]

            groups_count = self.__get_groups_count(
                file_features=file_features, integration=integration
            )

            yield file_index, groups_count, file_timestamp, file_duration, file_features

    def enumerate_bands_and_integrations(
        self,
    ) -> Generator[Tuple[str, int], None, None]:
        bands = self.get_bands()
        integrations = self.get_integrations_seconds()

        for band in bands:
            for integration in integrations:
                yield band, integration

    def enumerate_bands_and_integrations_with_indexes(
        self,
    ) -> Generator[Tuple[int, str, int, int], None, None]:
        bands = self.get_bands()
        integrations = self.get_integrations_seconds()

        for b, band in enumerate(bands):
            for i, integration in enumerate(integrations):
                yield b, band, i, integration

    def read_files_count(
        self,
    ) -> int:
        files_durations_dataset = self.__get(StoragePath.files_durations.value)
        files_count = files_durations_dataset.len()
        return files_count

    # TODO: Timeline strategy: Handle audio lengths shorter than integration
    # We should only discard the slice when there is no audio at all
    # Floor division will discard any incomplete group slice
    @staticmethod
    def __get_groups_count(
        file_features: List[List[float]],
        integration: int,
    ) -> int:
        return len(file_features) // integration

    def enumerate_meta_properties(self):
        meta_properties = self.read_meta_properties()

        for meta_index, _ in enumerate(meta_properties):
            yield meta_index

    def enumerate_volumes(self):
        volumes = self.read_volumes()

        for index, name in enumerate(volumes):
            yield index, name

    def append_group(
        self,
        features: List[float],
        timestamp: int,
        duration: int,
        band: str,
        integration: int,
    ) -> None:
        suffix = f"{band}/{integration}"
        features_path = f"{StoragePath.grouped_features.value}/{suffix}"
        timestamp_path = f"{StoragePath.grouped_timestamps.value}/{suffix}"
        duration_path = f"{StoragePath.grouped_durations.value}/{suffix}"

        if not self.exists_dataset(features_path):
            self.__file.create_dataset(
                name=features_path,
                data=[features],
                compression=StorageCompression.gzip.value,
                chunks=True,
                shape=(1, 128),
                maxshape=(None, 128),
            )
        else:
            dataset: Dataset = self.__file[features_path]  # type: ignore
            new_shape = dataset.shape[0] + 1
            dataset.resize(new_shape, axis=0)
            dataset[-1:] = [features]

        if not self.exists_dataset(timestamp_path):
            self.__file.create_dataset(
                name=timestamp_path,
                data=[timestamp],
                compression=StorageCompression.gzip.value,
                chunks=True,
                shape=(1, 1),
                maxshape=(None, 1),
            )
        else:
            dataset: Dataset = self.__file[timestamp_path]  # type: ignore
            new_shape = dataset.shape[0] + 1
            dataset.resize(new_shape, axis=0)
            dataset[-1:] = [timestamp]

        if not self.exists_dataset(duration_path):
            self.__file.create_dataset(
                name=duration_path,
                data=[duration],
                compression=StorageCompression.gzip.value,
                chunks=True,
                shape=(1, 1),
                maxshape=(None, 1),
            )
        else:
            dataset: Dataset = self.__file[duration_path]  # type: ignore
            new_shape = dataset.shape[0] + 1
            dataset.resize(new_shape, axis=0)
            dataset[-1:] = [duration]

    def write_group_v8(
        self,
        features: List[List[float]],
        timestamps: List[int],
        band: str,
        integration: int,
    ) -> None:
        for f in self.enumerate_file_indexes():
            suffix = self.__get_grouped_suffix(band, integration, f)
            path_features = f"/grouped_features{suffix}"
            path_timestamps = f"/grouped_timestamps{suffix}"

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
    ) -> Dataset:
        path = f"{StoragePath.grouped_features.value}/{band}/{integration}"
        dataset = self.__get(path)
        return dataset

    def read_grouped_features_all_files(
        self,
        band: str,
        integration: int,
    ) -> Dataset:
        grouped_features = self.read_grouped_features(
            band=band,
            integration=integration,
        )

        return grouped_features

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

    def read_grouped_durations(
        self,
        band: str,
        integration: int,
    ) -> Dataset:
        suffix = f"/{band}/{integration}"
        path = f"{StoragePath.grouped_durations.value}{suffix}"
        durations = self.__get(path)
        return durations

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
        indicators = self.read_indicators()

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
            and self.exists_dataset(StoragePath.files_timestamps.value)
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

    @staticmethod
    def get_flat_index(
        file_index: int,
        group_index: int,
        groups_count: int,
    ) -> int:
        return file_index * groups_count + group_index

    def read_meta_values(
        self,
        band: str,
        integration: int,
    ) -> List[List[str]]:
        files = self.read_config_files()

        meta_properties = self.read_meta_properties()
        meta_values = []

        settings = self.read_settings()
        autocluster = None

        if settings["autocluster"]:
            autocluster = self.__read_autocluster_values(band, integration)

        for mp, _ in enumerate(meta_properties):
            meta_property_values = []

            flat_index = 0
            for file_index, groups_count, _, _, _ in self.enumerate_files(
                band=band, integration=integration
            ):
                for _ in range(groups_count):
                    file_name = list(files)[file_index]
                    file_ = files[file_name]
                    meta = list(file_.meta)

                    if settings["autocluster"] and autocluster is not None:
                        meta.insert(0, str(autocluster[flat_index]))

                    meta_value = meta[mp]
                    meta_property_values.append(meta_value)

                    flat_index += 1

            meta_values.append(meta_property_values)

        return meta_values

    def read_autocluster(self, band: str, integration: int) -> List[int]:
        path = f"{StoragePath.autocluster.value}/{band}/{integration}"
        dataset = self.__get(path)
        return dataset[:]

    def migrate_v8(self) -> None:
        print_new_line()
        print("Migrating storage file from v8 to v9")

        bands = self.get_bands()
        integrations = self.get_integrations_seconds()[:]

        self.__migrate_v8_grouped_features_and_timestamps(bands, integrations)
        self.__migrate_v8_reduced_features(bands, integrations)
        self.__migrate_v8_indicators(bands, integrations)
        self.__migrate_v8_populate_matrices()
        self.__migrate_v8_populate_pairings()

        print_new_line()

    def __migrate_v8_populate_matrices(self) -> None:
        print_new_line()
        print("Populating with empty matrices")
        self.write_matrices([])

    def __migrate_v8_populate_pairings(self) -> None:
        print_new_line()
        print("Populating with empty pairings")
        self.write_pairings([])

    def __migrate_v8_indicators(
        self,
        bands: List[str],
        integrations: List[int],
    ) -> None:
        print_new_line()
        print("Migrating indicators")

        indicators = self.read_indicators()

        for band in bands:
            for integration in integrations:
                for indicator_index, _ in enumerate(indicators):
                    indicator_values = []

                    for file_index in self.enumerate_file_indexes():
                        indicator_old_path = (
                            f"{StoragePath.indicator_.value}{indicator_index}"
                            f"/{band}/{integration}/{file_index}"
                        )
                        indicator_old_values = self.__get(indicator_old_path)[:]
                        for indicator_old_value in indicator_old_values:
                            indicator_values.append(indicator_old_value)
                        self.__delete_silently(indicator_old_path)

                    indicator_path = (
                        f"{StoragePath.indicator_.value}{indicator_index}"
                        f"/{band}/{integration}"
                    )
                    self.__delete_silently(indicator_path)

                    self.write_indicator(
                        index=indicator_index,
                        band=band,
                        integration=integration,
                        values=indicator_values,
                    )

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
                self.write_group_v8(
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
