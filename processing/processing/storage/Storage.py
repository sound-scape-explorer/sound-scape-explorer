from typing import Any, List, Optional, Union

import numpy
from h5py import Dataset, File
# noinspection PyProtectedMember
from h5py._hl.dataset import AsStrWrapper

from processing.config.enums.ConfigSettingsFields import ConfigSettingsFields
from processing.shared.SingletonMeta import SingletonMeta
from processing.storage.enums.StorageCompression import StorageCompression
from processing.storage.enums.StorageMode import StorageMode
from processing.storage.enums.StoragePath import StoragePath


class Storage(metaclass=SingletonMeta):
    """The interface for handling HDF5 storage file."""
    __path: str
    __file: File

    def __init__(
        self,
        path: Optional[str] = 'sse.h5'
    ) -> None:
        self.__path = path

        self.__file = File(
            self.__path,
            StorageMode.rw_or_create.value,
        )

    @staticmethod
    def __get_file_features_path(
        band_name: str,
        file_index: int,
    ) -> str:
        return f'{StoragePath.files_features.value}' \
               f'/{band_name}' \
               f'/{file_index}'

    @staticmethod
    def __get_group_suffix(
        band: str,
        integration: int,
        file_index: int,
    ):
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

    def get_bands_frequencies(self) -> Dataset:
        return self.__get(StoragePath.bands_frequencies)

    def get_files(self) -> AsStrWrapper:
        dataset = self.__get(StoragePath.files)
        return dataset.asstr()

    def get_files_timestamps(self) -> Dataset:
        return self.__get(StoragePath.files_timestamps)

    def get_integrations(self) -> Dataset:
        return self.__get(StoragePath.umaps_integrations)

    def get_sites(self) -> Dataset:
        dataset = self.__get(StoragePath.umaps_sites)
        return dataset.asstr()

    def get_umaps(self) -> Dataset:
        dataset = self.__get(StoragePath.umaps)
        return dataset.asstr()

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
        path: StoragePath,
    ) -> None:
        try:
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
        self.__delete_silently(StoragePath.groups_features)
        self.__delete_silently(StoragePath.groups_timestamps)

    def delete_files_features(self) -> None:
        self.__delete_silently(StoragePath.files_features)

    def get_umap_seed(self):
        settings = self.__get(StoragePath.configuration).attrs
        return settings[ConfigSettingsFields.umap_seed.value]

    def create_configuration(self) -> None:
        self.__create_dataset(StoragePath.configuration, '')

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
        tags: Any,
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
            StoragePath.files_tags,
            tags,
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

    def create_umaps(
        self,
        umaps: Any,
        umaps_integrations: Any,
        umaps_bands: Any,
        umaps_ranges: Any,
        umaps_sites: Any,
    ) -> None:
        self.__create_dataset(
            StoragePath.umaps,
            umaps,
        )

        self.__create_dataset(
            StoragePath.umaps_integrations,
            umaps_integrations,
        )
        self.__create_dataset(
            StoragePath.umaps_bands,
            umaps_bands,
        )

        self.__create_dataset(
            StoragePath.umaps_ranges,
            umaps_ranges,
        )

        self.__create_dataset(
            StoragePath.umaps_sites,
            umaps_sites,
        )

    def exists_file_features(self, band: str, file_index: int) -> bool:
        path = self.__get_file_features_path(band, file_index)
        return self.exists_dataset(path)

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
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features.value}{suffix}'

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
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_timestamps.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=timestamps,
            compression=StorageCompression.gzip,
        )

    def get_group_features(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> Dataset:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features.value}{suffix}'

        features = self.__get(path)

        return features

    def get_group_timestamps(
        self,
        band: str,
        integration: int,
        file_index: int,
    ) -> Dataset:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_timestamps.value}{suffix}'

        features = self.__get(path)

        return features

    def delete_groups_features_reduced(self) -> None:
        self.__delete_silently(StoragePath.groups_features_reduced_umap_2d)
        self.__delete_silently(StoragePath.groups_features_reduced_umap_3d)

    def create_group_reduced_umap_2d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_umap_2d.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_reduced_umap_3d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_umap_3d.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_reduced_pca_2d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_pca_2d.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_reduced_pca_3d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_pca_3d.value}{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_reduced_sparse_pca_2d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_sparse_pca_2d.value}' \
               f'{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_reduced_sparse_pca_3d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_sparse_pca_3d.value}' \
               f'{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_reduced_vae_2d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_vae_2d.value}' \
               f'{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    def create_group_reduced_vae_3d(
        self,
        band: str,
        integration: int,
        file_index: int,
        features: List[List[float]]
    ) -> None:
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_features_reduced_vae_3d.value}' \
               f'{suffix}'

        self.__create_dataset(
            path=path,
            data=features,
            compression=StorageCompression.gzip,
        )

    @staticmethod
    def sanitize_list_with_nones(list: List[float]) -> List[float]:
        for index, _ in enumerate(list):
            if list[index] is None:
                list[index] = numpy.nan

        return list

    def delete_group_indicators(self) -> None:
        self.__delete_silently(StoragePath.groups_indicator_enes_leq)
        self.__delete_silently(StoragePath.groups_indicator_maad_leq)
        self.__delete_silently(StoragePath.groups_indicator_temporal_entropy)

    def create_group_indicator_enes_leq(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ):
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_indicator_enes_leq.value}{suffix}'

        values = self.sanitize_list_with_nones(values)

        self.__create_dataset(
            path=path,
            data=values,
            compression=StorageCompression.gzip,
        )

    def create_group_indicator_maad_leq(
        self,
        band: str,
        integration: int,
        file_index: int,
        values: List[float],
    ):
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_indicator_maad_leq.value}{suffix}'

        values = self.sanitize_list_with_nones(values)

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
    ):
        suffix = self.__get_group_suffix(band, integration, file_index)
        path = f'{StoragePath.groups_indicator_temporal_entropy.value}{suffix}'

        values = self.sanitize_list_with_nones(values)

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
            and self.exists_dataset(StoragePath.files_tags.value) \
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

    def is_defined_umaps(self) -> bool:
        return self.exists_dataset(StoragePath.umaps.value) \
            and self.exists_dataset(StoragePath.umaps_sites.value) \
            and self.exists_dataset(StoragePath.umaps_bands.value) \
            and self.exists_dataset(StoragePath.umaps_ranges.value) \
            and self.exists_dataset(StoragePath.umaps_integrations.value)
