from typing import Any, Dict, Iterable, List, Optional, Tuple, Union

import numpy
from h5py import Dataset, File

from processing.common.SingletonMeta import SingletonMeta
from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.matrices.MatrixConfig import MatrixConfig
from processing.config.pairings.PairingConfig import PairingConfig
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.sites.SiteConfig import SiteConfig
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.config.volumes.VolumeConfig import VolumeConfig
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

    def write(
        self,
        path: Union[StoragePath, str],
        data: Any,
        compression: Optional[bool] = False,
        dtype: Optional[Any] = None,
        shape: Optional[Any] = None,
        attributes: Optional[Dict[str, str]] = None,
    ) -> None:
        path = self.__get_path_as_string(path)

        if self.exists_dataset(path):
            print(f"Dataset already exists: {path}")
            return

        dataset = self.__file.create_dataset(
            path,
            data=data,
            compression=StorageCompression.gzip.value if compression else None,
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
            _ = self.read(path).attrs[key]
            return True
        except KeyError:
            return False

    def exists_dataset(
        self,
        path: Union[StoragePath, str],
    ) -> bool:
        path = self.__get_path_as_string(path)

        try:
            _ = self.read(path)
            return True
        except KeyError:
            return False

    def read(
        self,
        path: Union[StoragePath, str],
    ) -> Dataset:
        try:
            path = self.__get_path_as_string(path)
            payload = self.__file[path]
            return payload  # type: ignore TODO
        except KeyError:
            raise KeyError(f"Unable to find storage path {path}.")

    def read_reducers(self) -> List[str]:
        dataset = self.read(StoragePath.reducers_names)

        (length,) = dataset.shape
        if length == 0:
            return []

        reducers = list(dataset.asstr()[:])
        return reducers

    def pick_reducers(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> List[ReducerConfig]:
        reducers = self.read_config_reducers()

        grouped_reducers = []

        for reducer in reducers:
            if not self.is_band_integration_in_reducer(reducer, band, integration):
                continue

            grouped_reducers.append(reducer)

        return grouped_reducers

    def read_all_reduced_features(
        self,
        reducers: List[ReducerConfig],
    ) -> List[List[List[float]]]:
        reduced_features = []

        for _ in reducers:
            reduced_features.append([])

        for reducer in reducers:
            path = self.generate_reduced_path(reducer=reducer)
            dataset = self.read(path)

            for features in dataset:
                reduced_features[reducer.index].append(features)

        return reduced_features

    def read_files_names(self) -> List[str]:
        dataset = self.read(StoragePath.files_names)
        files = list(dataset.asstr()[:])
        return files

    def read_files_durations(self) -> List[int]:
        dataset = self.read(StoragePath.files_durations.value)
        return dataset[:]

    def read_files_interval_counts(
        self,
        integration: IntegrationConfig,
    ) -> Dataset:
        path = f"{StoragePath.files_interval_counts.value}/{integration.index}"
        dataset = self.read(path)
        return dataset

    # TODO: Rename
    def read_groups_count(
        self,
        integration: IntegrationConfig,
    ) -> int:
        group_counts = self.read_files_interval_counts(integration)

        groups_count = 0

        for group_count in group_counts:
            groups_count += group_count[0]

        return groups_count

    def read_config_pairings(self) -> List[PairingConfig]:
        names_dataset = self.read(StoragePath.pairings_names)
        names = self.convert_dataset_to_string_list(names_dataset)
        pairings = PairingConfig.reconstruct(names=names)
        return pairings

    def read_files_timestamps(self) -> Dataset:
        return self.read(StoragePath.files_timestamps)

    def read_files_sites(self) -> List[str]:
        dataset = self.read(StoragePath.files_sites)
        sites = list(dataset.asstr()[:])
        return sites

    def read_files_metas(self) -> List[List[str]]:
        dataset = self.read(StoragePath.files_labels)
        metas = list(list(sublist) for sublist in dataset.asstr()[:])
        return metas

    def generate_files_features_path(
        self,
        band: BandConfig,
    ) -> str:
        return f"{StoragePath.extracted.value}/{band.name}"

    def read_files_features(
        self,
        band: BandConfig,
    ) -> Dataset:
        path = self.generate_files_features_path(band=band)
        return self.read(path)

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

    def write_empty_group(self, path: str) -> None:
        self.__file.create_group(path)

    def create_integrations(
        self,
        integrations: List[str],
        integrations_seconds: List[int],
    ) -> None:
        self.write(
            path=StoragePath.integrations_names,
            data=integrations,
        )

        self.write(
            path=StoragePath.integrations_seconds,
            data=integrations_seconds,
            compression=True,
        )

    def create_file_features(self, features: Any, band: str, file_index: int) -> None:
        path = self.__get_file_features_path(band, file_index)

        self.write(
            path,
            features,
            compression=True,
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
        integration: IntegrationConfig,
    ) -> str:
        return f"{StoragePath.files_interval_counts.value}/{integration.seconds}"

    def append_files_groups_count(
        self,
        integration: IntegrationConfig,
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
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        for file_index, groups_count, _, _, _ in self.enumerate_files(
            band,
            integration,
        ):
            for group_index in range(groups_count):
                yield file_index, group_index

    def get_file_indexes_from_point_index(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
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
        band: BandConfig,
        integration: IntegrationConfig,
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
        integration: IntegrationConfig,
    ) -> int:
        return len(file_features) // integration.seconds

    def enumerate_files(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> Iterable[Tuple[int, int, int, int, List[List[float]]]]:
        files = self.read_config_files()
        features = self.read_files_features(band=band)
        timestamps = self.read_files_timestamps()
        count = timestamps.len()

        group_counts_path = f"{StoragePath.files_interval_counts.value}/{integration}"

        if self.exists_dataset(group_counts_path):
            group_counts = self.read(group_counts_path)
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
    ) -> Iterable[Tuple[BandConfig, IntegrationConfig]]:
        bands = self.read_config_bands()
        integrations = self.read_config_integrations()

        for band in bands:
            for integration in integrations:
                yield band, integration

    def read_files_count(
        self,
    ) -> int:
        files_durations_dataset = self.read(StoragePath.files_durations.value)
        files_count = files_durations_dataset.len()
        return files_count

    def enumerate_meta_properties(self):
        meta_properties = self.read_meta_properties()

        for meta_index, _ in enumerate(meta_properties):
            yield meta_index

    def generate_grouped_path_suffix(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> str:
        return f"{band.name}/{integration.seconds}"

    def generate_grouped_features_path(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> str:
        suffix = self.generate_grouped_path_suffix(band=band, integration=integration)
        return f"{StoragePath.group_features.value}/{suffix}"

    def generate_grouped_timestamps_path(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> str:
        suffix = self.generate_grouped_path_suffix(band=band, integration=integration)
        return f"{StoragePath.group_timestamps.value}/{suffix}"

    def generate_group_site_index_path(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> str:
        suffix = self.generate_grouped_path_suffix(band=band, integration=integration)
        return f"{StoragePath.group_site_index.value}/{suffix}"

    def append_group(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
        features: List[float],
        timestamp: int,
        site: SiteConfig,
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
        integration: IntegrationConfig,
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
        reducer: ReducerConfig,
        band: BandConfig,
        integration: IntegrationConfig,
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
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> Dataset:
        path = self.generate_grouped_features_path(
            band=band,
            integration=integration,
        )
        dataset = self.read(path)
        return dataset

    def read_grouped_features_all_files(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> Dataset:
        grouped_features = self.read_grouped_features(
            band=band,
            integration=integration,
        )

        return grouped_features

    def read_grouped_timestamps(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> Dataset:
        path = self.generate_grouped_timestamps_path(band=band, integration=integration)
        features = self.read(path)
        return features

    def generate_reduced_path(
        self,
        reducer: ReducerConfig,
    ) -> str:
        return (
            f"{StoragePath.reduced_.value}{reducer.index}"
            f"/{reducer.band.name}/{reducer.integration.seconds}"
        )

    def write_reducer(
        self,
        reducer: ReducerConfig,
    ) -> None:
        path = self.generate_reduced_path(reducer=reducer)

        self.write(
            path=path,
            data=reducer.instance.values,
            compression=True,
        )

    def generate_volume_path(
        self,
        volume: VolumeConfig,
    ) -> str:
        return (
            f"{StoragePath.volume_.value}{volume.index}"
            f"/{volume.band.name}/{volume.integration.seconds}/{volume.meta_index}"
        )

    def write_volume(
        self,
        volume: VolumeConfig,
    ) -> None:
        path = self.generate_volume_path(volume=volume)

        self.write(
            path=path,
            data=volume.instance.values,
            compression=True,
        )

    def generate_pairing_path(self, pairing: PairingConfig) -> str:
        return (
            f"{StoragePath.pairing_.value}{pairing.index}"
            f"/{pairing.band.name}/{pairing.integration.seconds}"
            f"/{pairing.meta_index_a}/{pairing.meta_index_b}"
        )

    def write_pairing(
        self,
        pairing: PairingConfig,
    ) -> None:
        path = self.generate_pairing_path(pairing)

        # INFO: We only store `values_a` because `values_b` is symmetrical.
        self.write(
            path=path,
            data=pairing.instance.values_a,
            compression=True,
        )

    def delete_pairings(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.pairing_)

    def generate_matrix_path(self, matrix: MatrixConfig) -> str:
        return (
            f"{StoragePath.matrix_.value}{matrix.index}"
            f"/{matrix.band.name}/{matrix.integration.seconds}/{matrix.meta_index}"
        )

    def write_matrix(
        self,
        matrix: MatrixConfig,
    ) -> None:
        path = self.generate_matrix_path(
            matrix=matrix,
        )

        self.write(
            path=path,
            data=matrix.instance.values,
            compression=True,
        )

    def delete_reduced(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.reduced_)

    def read_meta_properties(self) -> List[str]:
        meta_properties = self.read(StoragePath.labels_properties)

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
    def convert_dataset_to_string_list(dataset: Dataset) -> List[str]:
        (length,) = dataset.shape

        if length == 0:
            return []

        string_list = list(dataset.asstr()[:])

        return string_list

    def find_config_band_by_name(
        self,
        band_name: str,
    ) -> BandConfig:
        bands = self.read_config_bands()

        for band in bands:
            if band.name == band_name:
                return band

        raise KeyError(f"Unable to find band name {band_name}")

    def find_config_integration_by_duration(
        self,
        integration_duration: int,
    ) -> IntegrationConfig:
        integrations = self.read_config_integrations()

        for integration in integrations:
            if integration.seconds == integration_duration:
                return integration

        raise KeyError(f"Unable to find integration duration {integration_duration}")

    def write_config_pairings(
        self,
        pairings: List[PairingConfig],
    ) -> None:
        names = PairingConfig.flatten(pairings=pairings)

        self.write(
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
        band: BandConfig,
        integration: IntegrationConfig,
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
        band: BandConfig,
        integration: IntegrationConfig,
        index: int,
    ) -> str:
        return (
            f"{StoragePath.computation_umap_.value}{index}"
            f"/{band.name}/{integration.seconds}"
        )

    def enumerate_computation_umaps(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
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
        band: BandConfig,
        integration: IntegrationConfig,
        computation_index: int,
        features: List[List[float]],
    ) -> None:
        path = self.generate_computation_umap_path(
            band=band,
            integration=integration,
            index=computation_index,
        )

        self.write(
            path=path,
            data=features,
            compression=True,
        )

    def delete_computation_umaps(
        self,
    ) -> None:
        self.__delete_all_paths_starting_with(StoragePath.computation_umap_)

    def read_computation_umaps(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> List[Dataset]:
        computation_umaps = []

        for path in self.enumerate_computation_umaps(
            band=band,
            integration=integration,
        ):
            computation_umap = self.read(path=path)
            computation_umaps.append(computation_umap)

        return computation_umaps

    def generate_mean_distances_matrix_path(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> str:
        return (
            f"{StoragePath.mean_distances_matrix.value}"
            f"/{band.name}/{integration.seconds}"
        )

    def write_mean_distances_matrix(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
        matrix: List[List[float]],
    ) -> None:
        path = self.generate_mean_distances_matrix_path(band, integration)

        self.write(
            path=path,
            data=matrix,
            compression=True,
        )

    def delete_mean_distances_matrix(self) -> None:
        self.delete(StoragePath.mean_distances_matrix)

    def read_mean_distances_matrix(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> Dataset:
        path = self.generate_mean_distances_matrix_path(band, integration)
        mean_distances_matrix = self.read(path)
        return mean_distances_matrix

    def generate_autoclusters_path(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
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
        band: BandConfig,
        integration: IntegrationConfig,
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
        band: BandConfig,
        integration: IntegrationConfig,
        autocluster_index: int,
        values: List[int],
    ) -> None:
        path = self.generate_autoclusters_path(
            band=band,
            integration=integration,
            autocluster_index=autocluster_index,
        )

        self.write(
            path=path,
            data=values,
            compression=True,
        )

    def delete_autoclusters(self) -> None:
        self.__delete_all_paths_starting_with(StoragePath.autocluster_)

    def read_autocluster(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
        autocluster_index: int,
    ) -> Dataset:
        path = self.generate_autoclusters_path(
            band=band,
            integration=integration,
            autocluster_index=autocluster_index,
        )
        return self.read(path)

    def read_autoclusters_values(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
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
        trajectory: TrajectoryConfig,
    ) -> str:
        return (
            f"{StoragePath.trajectory_.value}{trajectory.index}"
            f"/{trajectory.reducer.index}"
            f"/{trajectory.band.name}"
            f"/{trajectory.integration.seconds}"
        )

    def write_trajectory(
        self,
        trajectory: TrajectoryConfig,
    ):
        path = self.generate_trajectory_path(
            trajectory=trajectory,
        )

        self.write(
            path=path,
            data=trajectory.instance.values,
        )

    def read_point_indexes_count(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> int:
        path = self.generate_grouped_timestamps_path(band=band, integration=integration)
        dataset = self.read(path=path)
        return dataset.len()

    def read_reducer(
        self,
        reducer: ReducerConfig,
    ) -> Dataset:
        path = self.generate_reduced_path(reducer)
        dataset = self.read(path)
        return dataset
