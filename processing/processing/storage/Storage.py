from typing import Any, Dict, Iterable, List, Optional, Tuple, Union

import numpy
from h5py import Dataset, File

from processing.common.Env import Env
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
from processing.config.ConfigSite import ConfigSite
from processing.config.ConfigTrajectory import ConfigTrajectory
from processing.config.ConfigVolume import ConfigVolume
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
    is_overwrite: bool = False

    def __init__(
        self,
        path: str,
    ) -> None:
        self.__path = path
        self.__set_file_or_fail()
        self.__succeed()

    def overwrite(self):
        self.is_overwrite = True

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
            raise RuntimeError(f"Unable to load file {self.__path}.")
        except TypeError:
            raise FileNotFoundError(f"Unable to find file {self.__path}.")

    @staticmethod
    def __get_file_features_path(
        band_name: str,
        file_index: int,
    ) -> str:
        return f"{StoragePath.extracted.value}/{band_name}/{file_index}"

    def close(self) -> None:
        self.__file.close()

    @staticmethod
    def __get_path_as_string(path: Union[StoragePath, str]) -> str:
        if type(path) is StoragePath:
            path = path.value

        path = str(path)
        return path

    def write_dataset(
        self,
        path: Union[StoragePath, str],
        data: Any,
        compression: Optional[StorageCompression] = None,
        dtype: Optional[Any] = None,
        shape: Optional[Any] = None,
        attributes: Optional[Dict[str, str]] = None,
    ) -> None:
        path = self.__get_path_as_string(path)

        if self.exists_dataset(path):
            print(f"Dataset already exists: {path}")
            return

        if type(compression) is StorageCompression:
            compression = compression.value  # type: ignore

        dataset = self.__file.create_dataset(
            path,
            data=data,
            compression=compression,
            dtype=dtype,
            shape=shape,
        )

        if attributes is not None:
            for k, v in attributes.items():
                dataset.attrs[k] = v

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
            _ = self.__read(path).attrs[key]
            return True
        except KeyError:
            return False

    def exists_dataset(
        self,
        path: Union[StoragePath, str],
    ) -> bool:
        path = self.__get_path_as_string(path)

        try:
            _ = self.__read(path)
            return True
        except KeyError:
            return False

    def __read(
        self,
        path: Union[StoragePath, str],
    ) -> Dataset:
        try:
            path = self.__get_path_as_string(path)
            payload = self.__file[path]
            return payload  # type: ignore TODO
        except KeyError:
            raise KeyError(f"Unable to find storage path {path}.")

    def read_config_files(self) -> List[ConfigFile]:
        names = self.read_files_names()
        timestamps = self.read_files_timestamps()
        sites = self.read_files_sites()
        labels = self.read_files_metas()
        durations = self.read_files_durations()
        audio_path = self.read_audio_path()

        files = ConfigFile.reconstruct(
            names=names,
            timestamps=timestamps[:],
            sites=sites,
            labels=labels,
            durations=durations,
            audio_path=audio_path,
        )

        return files

    def read_reducers(self) -> List[str]:
        dataset = self.__read(StoragePath.reducers_names)

        (length,) = dataset.shape
        if length == 0:
            return []

        reducers = list(dataset.asstr()[:])
        return reducers

    def pick_reducers(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> List[ConfigReducer]:
        reducers = self.read_config_reducers()

        grouped_reducers = []

        for reducer in reducers:
            if not self.is_band_integration_in_reducer(reducer, band, integration):
                continue

            grouped_reducers.append(reducer)

        return grouped_reducers

    def read_all_reduced_features(
        self,
        reducers: List[ConfigReducer],
    ) -> List[List[List[float]]]:
        reduced_features = []

        for _ in reducers:
            reduced_features.append([])

        for reducer in reducers:
            path = self.generate_reduced_path(reducer=reducer)
            dataset = self.__read(path)

            for features in dataset:
                reduced_features[reducer.index].append(features)

        return reduced_features

    def read_config_reducers(self) -> List[ConfigReducer]:
        names_dataset = self.__read(StoragePath.reducers_names)

        names = self.__convert_dataset_to_string_list(names_dataset)
        dimensions = self.__read(StoragePath.reducers_dimensions)[:]

        bands_names = self.__read(StoragePath.reducers_bands).asstr()
        integrations_names = self.__read(StoragePath.reducers_integrations).asstr()
        ranges_names = self.__read(StoragePath.reducers_ranges).asstr()

        bands_names = self.trim_rectangular(bands_names, "")
        integrations_names = self.trim_rectangular(integrations_names, "")
        ranges_names = self.trim_rectangular(ranges_names, "")

        bands_names_strings = [
            ",".join(bands_names_string) for bands_names_string in bands_names
        ]

        integrations_names_strings = [
            ",".join(integrations_names_string)
            for integrations_names_string in integrations_names
        ]

        ranges_names_strings = [
            ",".join(ranges_names_string) for ranges_names_string in integrations_names
        ]

        bands = self.read_config_bands()
        integrations = self.read_config_integrations()
        ranges = self.read_config_ranges()

        reducers = ConfigReducer.reconstruct(
            names=names,
            dimensions=dimensions,
            bands_names_strings=bands_names_strings,
            integrations_names_strings=integrations_names_strings,
            ranges_names_strings=ranges_names_strings,
            bands=bands,
            integrations=integrations,
            ranges=ranges,
        )

        return reducers

    def read_files_names(self) -> List[str]:
        dataset = self.__read(StoragePath.files_names)
        files = list(dataset.asstr()[:])
        return files

    def read_files_durations(self) -> List[int]:
        dataset = self.__read(StoragePath.files_durations.value)
        return dataset[:]

    def read_files_interval_counts(
        self,
        integration: ConfigIntegration,
    ) -> Dataset:
        path = f"{StoragePath.files_interval_counts.value}/{integration.index}"
        dataset = self.__read(path)
        return dataset

    # TODO: Rename
    def read_groups_count(
        self,
        integration: ConfigIntegration,
    ) -> int:
        group_counts = self.read_files_interval_counts(integration)

        groups_count = 0

        for group_count in group_counts:
            groups_count += group_count[0]

        return groups_count

    def read_config_indicators(self) -> List[ConfigIndicator]:
        names_dataset = self.__read(StoragePath.indicators_names)
        names = self.__convert_dataset_to_string_list(names_dataset)
        indicators = ConfigIndicator.reconstruct(names=names)
        return indicators

    def read_config_volumes(self) -> List[ConfigVolume]:
        names_dataset = self.__read(StoragePath.volumes_names)
        names = self.__convert_dataset_to_string_list(names_dataset)
        volumes = ConfigVolume.reconstruct(names=names)
        return volumes

    def read_config_matrices(self) -> List[ConfigMatrix]:
        names_dataset = self.__read(StoragePath.matrices_names)
        names = self.__convert_dataset_to_string_list(names_dataset)
        matrices = ConfigMatrix.reconstruct(names=names)
        return matrices

    def read_config_pairings(self) -> List[ConfigPairing]:
        names_dataset = self.__read(StoragePath.pairings_names)
        names = self.__convert_dataset_to_string_list(names_dataset)
        pairings = ConfigPairing.reconstruct(names=names)
        return pairings

    def read_files_timestamps(self) -> Dataset:
        return self.__read(StoragePath.files_timestamps)

    def read_files_sites(self) -> List[str]:
        dataset = self.__read(StoragePath.files_sites)
        sites = list(dataset.asstr()[:])
        return sites

    def read_files_metas(self) -> List[List[str]]:
        dataset = self.__read(StoragePath.files_labels)
        metas = list(list(sublist) for sublist in dataset.asstr()[:])
        return metas

    def generate_files_features_path(
        self,
        band: ConfigBand,
    ) -> str:
        return f"{StoragePath.extracted.value}/{band.name}"

    def read_files_features(
        self,
        band: ConfigBand,
    ) -> Dataset:
        path = self.generate_files_features_path(band=band)
        return self.__read(path)

    # Silent delete
    def delete(
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

    def __delete_all_paths_starting_with(
        self,
        storage_path: StoragePath,
    ) -> None:
        for key in self.__file.keys():
            path = f"/{key}"

            if path.startswith(storage_path.value):
                self.delete(path)

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
        self.delete(StoragePath.group_features)
        self.delete(StoragePath.group_timestamps)
        self.delete(StoragePath.group_site_index)

    def read_settings(self) -> ConfigSettings:
        configuration = self.__read(StoragePath.configuration)
        settings: ConfigSettings = configuration.attrs  # type: ignore
        return settings

    def read_computation_umap_dimensions(self) -> int:
        settings = self.read_settings()
        return settings["computation_umap_dimensions"]

    def read_computation_umap_iterations(self) -> int:
        settings = self.read_settings()
        return settings["computation_umap_iterations"]

    def read_display_umap_seed(self) -> int:
        settings = self.read_settings()
        return settings["display_umap_seed"]

    def read_expected_sample_rate(self) -> int:
        settings = self.read_settings()
        return settings["expected_sample_rate"]

    def read_timeline_origin(self) -> int:
        settings = self.read_settings()
        return settings["timeline_origin"]

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

    def create_integrations(
        self,
        integrations: List[str],
        integrations_seconds: List[int],
    ) -> None:
        self.write_dataset(
            path=StoragePath.integrations_names,
            data=integrations,
        )

        self.write_dataset(
            path=StoragePath.integrations_milliseconds,
            data=integrations_seconds,
            compression=StorageCompression.gzip,
        )

    def create_file_features(self, features: Any, band: str, file_index: int) -> None:
        path = self.__get_file_features_path(band, file_index)

        self.write_dataset(
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
        duration = len(features) * 1000  # milliseconds
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

    def generate_group_counts_path(
        self,
        integration: ConfigIntegration,
    ) -> str:
        return f"{StoragePath.files_interval_counts.value}/{integration.seconds}"

    def append_files_groups_count(
        self,
        integration: ConfigIntegration,
        groups_count: int,
    ) -> None:
        path = self.generate_group_counts_path(integration=integration)
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

    def append(
        self,
        path: str,
        data: Union[List[List[float]], List[List[str]]],
        compression: bool = False,
        attributes: Optional[Dict[str, str]] = None,
    ) -> None:
        length = len(data)
        dimensions = len(data[0])

        if not self.exists_dataset(path):
            dataset = self.__file.create_dataset(
                name=path,
                data=data,
                compression=StorageCompression.gzip.value
                if compression is True
                else None,
                chunks=True,
                shape=(length, dimensions),
                maxshape=(None, dimensions),
            )

        else:
            dataset: Dataset = self.__file[path]  # type: ignore
            new_shape = dataset.shape[0] + length
            dataset.resize(new_shape, axis=0)
            dataset[-length:] = data

        if attributes is not None:
            for k, v in attributes.items():
                dataset.attrs[k] = v

    def enumerate_group_indexes(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ):
        for file_index, groups_count, _, _, _ in self.enumerate_files(
            band,
            integration,
        ):
            for group_index in range(groups_count):
                yield file_index, group_index

    def get_file_indexes_from_point_index(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        point_index: int,
    ) -> List[int]:
        group_timestamps = self.read_grouped_timestamps(band, integration)
        group_timestamp = group_timestamps[point_index][0]

        file_indexes = []

        group_counts = self.read_files_interval_counts(integration)
        files_timestamps = self.read_files_timestamps()

        for file_index, file_timestamp in enumerate(files_timestamps):
            file_start = file_timestamp
            file_end = (
                file_start + group_counts[file_index][0] * integration.milliseconds
            )

            if file_start <= group_timestamp < file_end:
                file_indexes.append(file_index)

        return file_indexes

    def enumerate_point_indexes(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> Iterable[int]:
        grouped_timestamps = self.read_grouped_timestamps(band, integration)

        for group_index in range(grouped_timestamps.len()):
            yield group_index

    # TODO: Timeline strategy: Handle audio lengths shorter than integration
    # We should only discard the slice when there is no audio at all
    # Floor division will discard any incomplete group slice
    @staticmethod
    def __get_group_count(
        file_features: List[List[float]],
        integration: ConfigIntegration,
    ) -> int:
        return len(file_features) // integration.seconds

    def enumerate_files(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> Iterable[Tuple[int, int, int, int, List[List[float]]]]:
        files = self.read_config_files()
        features = self.read_files_features(band=band)
        timestamps = self.read_files_timestamps()
        count = timestamps.len()

        group_counts_path = f"{StoragePath.files_interval_counts.value}/{integration}"

        if self.exists_dataset(group_counts_path):
            group_counts = self.__read(group_counts_path)
        else:
            group_counts = None

        duration_current_position = 0

        for file_index in range(count):
            file_duration = files[file_index].seconds
            duration_start = duration_current_position
            duration_end = duration_current_position + file_duration
            duration_current_position += file_duration

            file_features: List[List[float]] = list(
                features[duration_start:duration_end]
            )

            file_timestamp: int = timestamps[file_index]

            if group_counts is not None:
                group_count = group_counts[file_index][0]
            else:
                group_count = self.__get_group_count(
                    file_features=file_features,
                    integration=integration,
                )

            yield file_index, group_count, file_timestamp, file_duration, file_features

    def enumerate_bands_and_integrations(
        self,
    ) -> Iterable[Tuple[ConfigBand, ConfigIntegration]]:
        bands = self.read_config_bands()
        integrations = self.read_config_integrations()

        for band in bands:
            for integration in integrations:
                yield band, integration

    def read_files_count(
        self,
    ) -> int:
        files_durations_dataset = self.__read(StoragePath.files_durations.value)
        files_count = files_durations_dataset.len()
        return files_count

    def enumerate_meta_properties(self):
        meta_properties = self.read_meta_properties()

        for meta_index, _ in enumerate(meta_properties):
            yield meta_index

    def enumerate_volumes(self):
        volumes = self.read_config_volumes()

        for index, name in enumerate(volumes):
            yield index, name

    def generate_grouped_path_suffix(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> str:
        return f"{band.name}/{integration.seconds}"

    def generate_grouped_features_path(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> str:
        suffix = self.generate_grouped_path_suffix(band=band, integration=integration)
        return f"{StoragePath.group_features.value}/{suffix}"

    def generate_grouped_timestamps_path(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> str:
        suffix = self.generate_grouped_path_suffix(band=band, integration=integration)
        return f"{StoragePath.group_timestamps.value}/{suffix}"

    def generate_group_site_index_path(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> str:
        suffix = self.generate_grouped_path_suffix(band=band, integration=integration)
        return f"{StoragePath.group_site_index.value}/{suffix}"

    def append_group(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        features: List[float],
        timestamp: int,
        site: ConfigSite,
    ) -> None:
        # Features
        features_path = self.generate_grouped_features_path(
            band=band,
            integration=integration,
        )

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

        # Timestamp
        timestamp_path = self.generate_grouped_timestamps_path(
            band=band,
            integration=integration,
        )

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

        # Site by group
        group_site_index_path = self.generate_group_site_index_path(
            band=band,
            integration=integration,
        )

        if not self.exists_dataset(group_site_index_path):
            self.__file.create_dataset(
                name=group_site_index_path,
                data=site.index,
                compression=StorageCompression.gzip.value,
                chunks=True,
                shape=(1, 1),
                maxshape=(None, 1),
            )
        else:
            dataset: Dataset = self.__file[group_site_index_path]  # type: ignore
            new_shape = dataset.shape[0] + 1
            dataset.resize(new_shape, axis=0)
            dataset[-1:] = site.index

    def __convert_integration_seconds_to_name(
        self,
        integration: ConfigIntegration,
    ) -> str:
        integrations = self.read_config_integrations()
        names = [i.name for i in integrations]
        durations = [i.milliseconds for i in integrations]

        index = numpy.where(durations[:] == integration.milliseconds)
        index = index[0][0]
        name = names[index]
        name = str(name)

        return name

    def is_band_integration_in_reducer(
        self,
        reducer: ConfigReducer,
        band: ConfigBand,
        integration: ConfigIntegration,
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
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> Dataset:
        path = self.generate_grouped_features_path(
            band=band,
            integration=integration,
        )
        dataset = self.__read(path)
        return dataset

    def read_grouped_features_all_files(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> Dataset:
        grouped_features = self.read_grouped_features(
            band=band,
            integration=integration,
        )

        return grouped_features

    def read_grouped_timestamps(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> Dataset:
        path = self.generate_grouped_timestamps_path(band=band, integration=integration)
        features = self.__read(path)
        return features

    def generate_reduced_path(
        self,
        reducer: ConfigReducer,
    ) -> str:
        return (
            f"{StoragePath.reduced_.value}{reducer.index}"
            f"/{reducer.band.name}/{reducer.integration.seconds}"
        )

    def write_reducer(
        self,
        reducer: ConfigReducer,
    ) -> None:
        path = self.generate_reduced_path(reducer=reducer)

        self.write_dataset(
            path=path,
            data=reducer.instance.values,
            compression=StorageCompression.gzip,
        )

    def generate_indicator_path(
        self,
        indicator: ConfigIndicator,
    ) -> str:
        suffix = f"/{indicator.band.name}/{indicator.integration.seconds}"
        path = f"{StoragePath.indicator_.value}{indicator.index}{suffix}"
        return path

    def delete_indicators(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.indicator_)

    def write_indicator(
        self,
        indicator: ConfigIndicator,
    ) -> None:
        path = self.generate_indicator_path(indicator)

        self.write_dataset(
            path=path,
            data=indicator.instance.values,
            compression=StorageCompression.gzip,
        )

    def generate_volume_path(
        self,
        volume: ConfigVolume,
    ) -> str:
        return (
            f"{StoragePath.volume_.value}{volume.index}"
            f"/{volume.band.name}/{volume.integration.seconds}/{volume.meta_index}"
        )

    def write_volume(
        self,
        volume: ConfigVolume,
    ) -> None:
        path = self.generate_volume_path(volume=volume)

        self.write_dataset(
            path=path,
            data=volume.instance.values,
            compression=StorageCompression.gzip,
        )

    def generate_pairing_path(self, pairing: ConfigPairing) -> str:
        return (
            f"{StoragePath.pairing_.value}{pairing.index}"
            f"/{pairing.band.name}/{pairing.integration.seconds}"
            f"/{pairing.meta_index_a}/{pairing.meta_index_b}"
        )

    def write_pairing(
        self,
        pairing: ConfigPairing,
    ) -> None:
        path = self.generate_pairing_path(pairing)

        # INFO: We only store `values_a` because `values_b` is symmetrical.
        self.write_dataset(
            path=path,
            data=pairing.instance.values_a,
            compression=StorageCompression.gzip,
        )

    def delete_pairings(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.pairing_)

    def generate_matrix_path(self, matrix: ConfigMatrix) -> str:
        return (
            f"{StoragePath.matrix_.value}{matrix.index}"
            f"/{matrix.band.name}/{matrix.integration.seconds}/{matrix.meta_index}"
        )

    def write_matrix(
        self,
        matrix: ConfigMatrix,
    ) -> None:
        path = self.generate_matrix_path(
            matrix=matrix,
        )

        self.write_dataset(
            path=path,
            data=matrix.instance.values,
            compression=StorageCompression.gzip,
        )

    def delete_matrices(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.matrix_)

    def delete_volumes(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.volume_)

    def delete_reduced(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.reduced_)

    def write_metas(
        self,
        metas: List[ConfigMeta],
    ) -> None:
        properties, sets = ConfigMeta.flatten(metas)

        self.write_dataset(
            path=StoragePath.meta_properties,
            data=properties,
        )

        sets_rectangular = self.make_rectangular(sets, "")

        self.write_dataset(
            path=StoragePath.meta_sets,
            data=sets_rectangular,
        )

    def read_meta_properties(self) -> List[str]:
        meta_properties = self.__read(StoragePath.meta_properties)

        strings = list(meta_properties.asstr()[:])

        autoclusters = self.read_config_autoclusters()

        if len(autoclusters) > 0:
            for autocluster in reversed(autoclusters):
                strings.insert(0, f"AUTOCLUSTER_{autocluster.index}")

        return strings

    def is_defined_files(self) -> bool:
        return (
            self.exists_dataset(StoragePath.files_names.value)
            and self.exists_dataset(StoragePath.files_timestamps.value)
            and self.exists_dataset(StoragePath.files_sites.value)
            and self.exists_dataset(StoragePath.files_labels.value)
        )

    @staticmethod
    def make_rectangular(
        non_rectangular_array: List[List[Any]],
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

    @staticmethod
    def __convert_dataset_to_string_list(dataset: Dataset) -> List[str]:
        (length,) = dataset.shape

        if length == 0:
            return []

        string_list = list(dataset.asstr()[:])

        return string_list

    def read_config_autoclusters(self) -> List[ConfigAutocluster]:
        names_dataset = self.__read(StoragePath.autoclusters_names)

        names = self.__convert_dataset_to_string_list(names_dataset)
        min_cluster_sizes = self.__read(StoragePath.autoclusters_min_cluster_sizes)[:]
        min_samples = self.__read(StoragePath.autoclusters_min_samples)[:]
        alphas = self.__read(StoragePath.autoclusters_alphas)[:]
        epsilons = self.__read(StoragePath.autoclusters_epsilons)[:]

        autoclusters = ConfigAutocluster.reconstruct(
            names=names,
            min_cluster_sizes=min_cluster_sizes,
            min_samples=min_samples,
            alphas=alphas,
            epsilons=epsilons,
        )

        return autoclusters

    def find_config_band_by_name(
        self,
        band_name: str,
    ) -> ConfigBand:
        bands = self.read_config_bands()

        for band in bands:
            if band.name == band_name:
                return band

        raise KeyError(f"Unable to find band name {band_name}")

    def find_config_integration_by_duration(
        self,
        integration_duration: int,
    ) -> ConfigIntegration:
        integrations = self.read_config_integrations()

        for integration in integrations:
            if integration.seconds == integration_duration:
                return integration

        raise KeyError(f"Unable to find integration duration {integration_duration}")

    def read_config_bands(self):
        names_dataset = self.__read(StoragePath.bands_names)

        names = self.__convert_dataset_to_string_list(names_dataset)
        lows = self.__read(StoragePath.bands_lows)[:]
        highs = self.__read(StoragePath.bands_highs)[:]

        bands = ConfigBand.reconstruct(
            names=names,
            lows=lows,
            highs=highs,
        )

        return bands

    def read_config_integrations(self):
        names_dataset = self.__read(StoragePath.integrations_names)

        names = self.__convert_dataset_to_string_list(names_dataset)
        durations = self.__read(StoragePath.integrations_milliseconds)[:]

        integrations = ConfigIntegration.reconstruct(
            names=names,
            durations=durations,
        )

        return integrations

    def read_config_ranges(self):
        names_dataset = self.__read(StoragePath.ranges_names)

        names = self.__convert_dataset_to_string_list(names_dataset)
        starts = self.__read(StoragePath.ranges_starts)[:]
        ends = self.__read(StoragePath.ranges_ends)[:]

        ranges = ConfigRange.reconstruct(
            names=names,
            starts=starts,
            ends=ends,
        )

        return ranges

    def write_config_bands(
        self,
        bands: List[ConfigBand],
    ) -> None:
        names, lows, highs = ConfigBand.flatten(bands=bands)

        self.write_dataset(
            path=StoragePath.bands_names,
            data=names,
        )

        self.write_dataset(
            path=StoragePath.bands_lows,
            data=lows,
        )

        self.write_dataset(
            path=StoragePath.bands_highs,
            data=highs,
        )

    def write_config_integrations(
        self,
        integrations: List[ConfigIntegration],
    ) -> None:
        names, durations = ConfigIntegration.flatten(integrations=integrations)

        self.write_dataset(
            path=StoragePath.integrations_names,
            data=names,
        )

        self.write_dataset(
            path=StoragePath.integrations_milliseconds,
            data=durations,
        )

    def write_config_ranges(
        self,
        ranges: List[ConfigRange],
    ) -> None:
        names, starts, ends = ConfigRange.flatten(ranges=ranges)

        self.write_dataset(
            path=StoragePath.ranges_names,
            data=names,
        )

        self.write_dataset(
            path=StoragePath.ranges_starts,
            data=starts,
        )

        self.write_dataset(
            path=StoragePath.ranges_ends,
            data=ends,
        )

    def write_config_autoclusters(
        self,
        autoclusters: List[ConfigAutocluster],
    ) -> None:
        (
            names,
            min_cluster_sizes,
            min_samples,
            alphas,
            epsilons,
        ) = ConfigAutocluster.flatten(autoclusters=autoclusters)

        self.write_dataset(
            path=StoragePath.autoclusters_names,
            data=names,
        )

        self.write_dataset(
            path=StoragePath.autoclusters_min_cluster_sizes,
            data=min_cluster_sizes,
        )

        self.write_dataset(
            path=StoragePath.autoclusters_min_samples,
            data=min_samples,
        )

        self.write_dataset(
            path=StoragePath.autoclusters_alphas,
            data=alphas,
        )

        self.write_dataset(
            path=StoragePath.autoclusters_epsilons,
            data=epsilons,
        )

    def write_config_reducers(
        self,
        reducers: List[ConfigReducer],
    ) -> None:
        (
            names,
            dimensions,
            bands,
            integrations,
            ranges,
        ) = ConfigReducer.flatten(reducers=reducers)

        if len(bands) != 0:
            bands = self.make_rectangular(bands, "")

        if len(integrations) != 0:
            integrations = self.make_rectangular(integrations, "")

        if len(ranges) != 0:
            ranges = self.make_rectangular(ranges, "")

        self.write_dataset(
            path=StoragePath.reducers_names,
            data=names,
        )

        self.write_dataset(
            path=StoragePath.reducers_dimensions,
            data=dimensions,
        )

        self.write_dataset(
            path=StoragePath.reducers_bands,
            data=bands,
        )

        self.write_dataset(
            path=StoragePath.reducers_integrations,
            data=integrations,
        )

        self.write_dataset(
            path=StoragePath.reducers_ranges,
            data=ranges,
        )

    def write_config_indicators(
        self,
        indicators: List[ConfigIndicator],
    ) -> None:
        names = ConfigIndicator.flatten(indicators=indicators)

        self.write_dataset(
            path=StoragePath.indicators_names,
            data=names,
        )

    def write_config_volumes(
        self,
        volumes: List[ConfigVolume],
    ) -> None:
        names = ConfigVolume.flatten(volumes=volumes)

        self.write_dataset(
            path=StoragePath.volumes_names,
            data=names,
        )

    def write_config_matrices(
        self,
        matrices: List[ConfigMatrix],
    ) -> None:
        names = ConfigMatrix.flatten(matrices=matrices)

        self.write_dataset(
            path=StoragePath.matrices_names,
            data=names,
        )

    def write_config_pairings(
        self,
        pairings: List[ConfigPairing],
    ) -> None:
        names = ConfigPairing.flatten(pairings=pairings)

        self.write_dataset(
            path=StoragePath.pairings_names,
            data=names,
        )

    @staticmethod
    def generate_point_index(
        file_index: int,
        group_index: int,
        group_count: int,
    ) -> int:
        return file_index * group_count + group_index

    def read_grouped_meta_values(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> List[List[str]]:
        # Autoclusters values
        config_autoclusters = self.read_config_autoclusters()
        autoclusters_values = []

        if len(config_autoclusters) > 0:
            for autocluster in reversed(config_autoclusters):
                autocluster_values = self.read_autocluster(
                    band=band,
                    integration=integration,
                    autocluster_index=autocluster.index,
                )
                autoclusters_values.append(autocluster_values)

        meta_properties = self.read_meta_properties()
        meta_values = []

        files = self.read_config_files()

        for mp in range(len(meta_properties)):
            meta_property_values = []

            for point_index in self.enumerate_point_indexes(
                band=band,
                integration=integration,
            ):
                file_indexes = self.get_file_indexes_from_point_index(
                    band=band,
                    integration=integration,
                    point_index=point_index,
                )

                # WARNING: We take the first file_index
                # TODO: Merging meta values need to be specified
                # TODO: Concatenate meta values with specified separator like `/`
                file_index = file_indexes[0]

                file = files[file_index]
                meta = list(file.labels)  # Copy

                if len(config_autoclusters) > 0:
                    for autocluster in config_autoclusters:
                        autocluster_values = autoclusters_values[autocluster.index]
                        meta.insert(0, str(autocluster_values[point_index]))

                meta_value = meta[mp]
                meta_property_values.append(meta_value)

            meta_values.append(meta_property_values)

        return meta_values

    def generate_computation_umap_path(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        index: int,
    ) -> str:
        return (
            f"{StoragePath.computation_umap_.value}{index}"
            f"/{band.name}/{integration.seconds}"
        )

    def enumerate_computation_umaps(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ):
        iterations = self.read_computation_umap_iterations()

        for iteration in range(iterations):
            path = self.generate_computation_umap_path(
                band=band,
                integration=integration,
                index=iteration,
            )

            yield path

    def write_computation_umap(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        computation_index: int,
        features: List[List[float]],
    ) -> None:
        path = self.generate_computation_umap_path(
            band=band,
            integration=integration,
            index=computation_index,
        )

        self.write_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def delete_computation_umaps(
        self,
    ) -> None:
        self.__delete_all_paths_starting_with(StoragePath.computation_umap_)

    def read_computation_umaps(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> List[Dataset]:
        computation_umaps = []

        for path in self.enumerate_computation_umaps(
            band=band,
            integration=integration,
        ):
            computation_umap = self.__read(path=path)
            computation_umaps.append(computation_umap)

        return computation_umaps

    def generate_mean_distances_matrix_path(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> str:
        return (
            f"{StoragePath.mean_distances_matrix.value}"
            f"/{band.name}/{integration.seconds}"
        )

    def write_mean_distances_matrix(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        matrix: List[List[float]],
    ) -> None:
        path = self.generate_mean_distances_matrix_path(band, integration)

        self.write_dataset(
            path=path,
            data=matrix,
            compression=StorageCompression.gzip,
        )

    def delete_mean_distances_matrix(self) -> None:
        self.delete(StoragePath.mean_distances_matrix)

    def read_mean_distances_matrix(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> Dataset:
        path = self.generate_mean_distances_matrix_path(band, integration)
        mean_distances_matrix = self.__read(path)
        return mean_distances_matrix

    def generate_autoclusters_path(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        autocluster_index: int,
    ) -> str:
        path = (
            f"{StoragePath.autocluster_.value}{autocluster_index}"
            f"/{band.name}"
            f"/{integration.seconds}"
        )

        return path

    def enumerate_autoclusters(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> Iterable[Tuple[int, str]]:
        autoclusters = self.read_config_autoclusters()

        for index in range(len(autoclusters)):
            path = self.generate_autoclusters_path(
                band=band,
                integration=integration,
                autocluster_index=index,
            )
            yield index, path

    def write_autocluster(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        autocluster_index: int,
        values: List[int],
    ) -> None:
        path = self.generate_autoclusters_path(
            band=band,
            integration=integration,
            autocluster_index=autocluster_index,
        )

        self.write_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def delete_autoclusters(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.autocluster_)

    def read_autocluster(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
        autocluster_index: int,
    ) -> Dataset:
        path = self.generate_autoclusters_path(
            band=band,
            integration=integration,
            autocluster_index=autocluster_index,
        )
        return self.__read(path)

    def read_autoclusters_values(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> List[Dataset]:
        autoclusters = []

        for index, _ in self.enumerate_autoclusters(band, integration):
            values = self.read_autocluster(
                band=band,
                integration=integration,
                autocluster_index=index,
            )
            autoclusters.append(values)

        return autoclusters

    def delete_trajectories(self):
        self.__delete_all_paths_starting_with(StoragePath.trajectory_)

    def enumerate_trajectories(self):
        pass

    def generate_trajectory_path(
        self,
        trajectory: ConfigTrajectory,
    ) -> str:
        return (
            f"{StoragePath.trajectory_.value}{trajectory.index}"
            f"/{trajectory.reducer.index}"
            f"/{trajectory.band.name}"
            f"/{trajectory.integration.seconds}"
        )

    def read_config_trajectories(self) -> List[ConfigTrajectory]:
        names_dataset = self.__read(StoragePath.trajectories_names)

        names = self.__convert_dataset_to_string_list(names_dataset)
        starts = self.__read(StoragePath.trajectories_starts)[:]
        ends = self.__read(StoragePath.trajectories_ends)[:]

        trajectories = ConfigTrajectory.reconstruct(
            names=names,
            starts=starts,
            ends=ends,
        )

        return trajectories

    def write_config_trajectories(
        self,
        trajectories: List[ConfigTrajectory],
    ) -> None:
        names, starts, ends = ConfigTrajectory.flatten(trajectories=trajectories)

        self.write_dataset(
            path=StoragePath.trajectories_names,
            data=names,
        )

        self.write_dataset(
            path=StoragePath.trajectories_starts,
            data=starts,
        )

        self.write_dataset(
            path=StoragePath.trajectories_ends,
            data=ends,
        )

    def write_trajectory(
        self,
        trajectory: ConfigTrajectory,
    ):
        path = self.generate_trajectory_path(
            trajectory=trajectory,
        )

        self.write_dataset(
            path=path,
            data=trajectory.instance.values,
        )

    def read_point_indexes_count(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> int:
        path = self.generate_grouped_timestamps_path(band=band, integration=integration)
        dataset = self.__read(path=path)
        return dataset.len()

    def read_reducer(
        self,
        reducer: ConfigReducer,
    ) -> Dataset:
        path = self.generate_reduced_path(reducer)
        dataset = self.__read(path)
        return dataset

    def read_config_sites(self) -> List[ConfigSite]:
        names_dataset = self.__read(StoragePath.sites_names.value)
        names = self.__convert_dataset_to_string_list(names_dataset)

        file_indexes_rectangular = self.__read(StoragePath.sites_file_indexes.value)[:]
        file_indexes = self.trim_rectangular(file_indexes_rectangular)

        files = self.read_config_files()

        sites = ConfigSite.reconstruct(
            names=names,
            file_indexes=file_indexes,
            files=files,
        )

        return sites
