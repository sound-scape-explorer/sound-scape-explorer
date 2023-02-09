from enum import Enum
from typing import Any, Optional, Tuple, Union

import h5py
from h5py import Dataset

from processing.utils.singleton_meta import SingletonMeta


class StoragePath(Enum):
    configuration = '/configuration'

    files = '/files'
    files_features = '/files_features'  # Example: /files_features/{band}/{file_index}
    files_timestamps = '/files_timestamps'
    files_sites = '/files_sites'
    files_tags = '/files_tags'
    files_metas = '/files_metas'

    ranges = '/ranges'
    ranges_timestamps = '/ranges_timestamps'

    bands = '/bands'
    bands_frequencies = '/bands_frequencies'

    umaps = '/umaps'
    umaps_integrations = '/umaps_integrations'
    umaps_bands = '/umaps_bands'
    umaps_ranges = '/umaps_ranges'
    umaps_sites = '/umaps_sites'

    groups_features = '/groups_features'  # Example: /groups_features/{band}/{integration}/{file_index}
    groups_timestamps = '/groups_timestamps'


class StorageMode(Enum):
    readonly = 'r'
    rw_or_fail = 'r+'
    rw_or_create = 'a'
    create_or_fail = 'x'
    create_or_overwrite = 'w'


class StorageCompression(Enum):
    gzip = 'gzip'


class NewStorage(metaclass=SingletonMeta):
    """The interface for handling HDF5 storage file."""
    __file = h5py.File('sse.h5', StorageMode.rw_or_create.value)

    def __init__(self) -> None:
        pass

    @staticmethod
    def __get_file_features_path(
        band_name: str,
        file_index: int,
    ) -> str:
        return f'{StoragePath.files_features.value}' \
               f'/{band_name}' \
               f'/{file_index}'

    @staticmethod
    def __get_groups_paths(
        band_name: str,
        integration: int,
        file_index: int,
    ) -> Tuple[str, str]:
        suffix = f'/{band_name}/{integration}/{file_index}'
        features = f'{StoragePath.groups_features.value}{suffix}'
        timestamps = f'{StoragePath.groups_timestamps.value}{suffix}'

        return features, timestamps

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
            _ = self.get(path).attrs[key]
            return True
        except KeyError:
            return False

    def exists_dataset(
        self,
        path: Union[StoragePath, str],
    ) -> bool:
        path = self.__get_path_as_string(path)

        try:
            _ = self.get(path)
            return True
        except KeyError:
            return False

    def get(
        self,
        path: Union[StoragePath, str],
        as_string: bool = False,
    ) -> Dataset:
        path = self.__get_path_as_string(path)

        payload = self.__file[path]

        if as_string:
            return payload.asstr()

        return payload

    def get_ranges(self) -> Dataset:
        return self.get(StoragePath.ranges, True)

    def get_ranges_timestamps(self) -> Dataset:
        return self.get(StoragePath.ranges_timestamps)

    def get_bands(self) -> Dataset:
        return self.get(StoragePath.bands, True)

    def get_files(self) -> Dataset:
        return self.get(StoragePath.files, True)

    def get_files_timestamps(self) -> Dataset:
        return self.get(StoragePath.files_timestamps)

    def get_integrations(self) -> Dataset:
        return self.get(StoragePath.umaps_integrations)

    def get_sites(self) -> Dataset:
        return self.get(StoragePath.umaps_sites)

    def get_umaps(self) -> Dataset:
        return self.get(StoragePath.umaps, True)

    def get_file_features(self, band_name: str, file_index: int) -> Dataset:
        path = self.__get_file_features_path(
            band_name,
            file_index,
        )

        return self.get(path)

    def get_umap_seed(self):
        settings = self.get(StoragePath.configuration).attrs
        return settings['umap_seed']

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

    def create_groups(
        self,
        features: Any,
        timestamps: Any,
        band: str,
        integration: int,
        file_index: int,
    ) -> None:
        paths = self.__get_groups_paths(band, integration, file_index)
        features_path, timestamps_path = paths

        self.__create_dataset(
            path=features_path,
            data=features,
            compression=StorageCompression.gzip,
        )

        self.__create_dataset(
            path=timestamps_path,
            data=timestamps,
            compression=StorageCompression.gzip,
        )
