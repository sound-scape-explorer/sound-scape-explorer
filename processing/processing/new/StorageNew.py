from typing import Union

import numpy as np
from h5py import File, Dataset, Group, Datatype

from processing.new.StorageMode import StorageMode


Endpoint = Union[Dataset, Group, Datatype]


StorageDataWrite = Union[
    list[float],
    list[list[float]],
    list[str],
    list[list[str]],
    list[bool],
    list[list[bool]],
]

StorageDataAppend = Union[list[list[float]], list[list[str]], list[list[bool]]]
StorageAttributes = Union[dict[str, str], None]
StorageCompression = "gzip"


class StorageNew:
    path: str
    __file: File

    def __init__(self, path: str):
        self.path = path
        self.__file = self.__open()

    def close(self):
        self.__file.close()

    def __open(self):
        return File(self.path, StorageMode.rw_or_create.value)

    def read(
        self,
        path: str,
        as_strings: bool = False,
    ):
        exists = self.exists(path)
        if not exists:
            raise KeyError(f"Storage: path {path} not found")

        endpoint: Endpoint = self.__file[path]

        if not isinstance(endpoint, Dataset):
            raise KeyError(f"Storage: path {path} does not contain a dataset")

        dataset: Dataset = endpoint

        is_empty = 0 in dataset.shape
        if is_empty:
            return []

        if as_strings:
            strings = dataset.asstr()[:]
            assert isinstance(strings, np.ndarray)
            return strings.tolist()

        return dataset

    def exists(self, path: str):
        try:
            _ = self.__file[path]
            return True
        except KeyError:
            return False

    def delete(self, path: str):
        exists = self.exists(path)

        if not exists:
            return

        del self.__file[path]

    def _write_attributes(
        self,
        path: str,
        attributes: StorageAttributes = None,
    ):
        if attributes is None:
            return

        exists = self.exists(path)

        if not exists:
            return

        for k, v in attributes.items():
            self.__file[path].attrs[k] = v

    # for datasets
    def write(
        self,
        path: str,
        data: StorageDataWrite,
        attributes: StorageAttributes = None,
    ):
        exists = self.exists(path)

        if exists:
            raise KeyError(f"Storage: path {path} already exists")

        self.__file.create_dataset(
            name=path,
            data=data,
            compression=StorageCompression,
        )

        self._write_attributes(path, attributes)

    def write_group(
        self,
        path: str,
        data: dict[str, str],
    ):
        exists = self.exists(path)

        if exists:
            raise KeyError(f"Storage: path {path} already exists")

        self.__file.create_group(path)

        for k, v in data.items():
            self.__file[path].attrs[k] = v

    def append(
        self,
        path: str,
        data: StorageDataAppend,
        attributes: StorageAttributes = None,
    ):
        length = len(data)
        dimensions = len(data[0])
        exists = self.exists(path)

        if not exists:
            # create
            self.__file.create_dataset(
                name=path,
                data=data,
                compression=StorageCompression,
                chunks=True,
                shape=(length, dimensions),
                maxshape=(None, dimensions),
            )
        else:
            # actual appending
            endpoint: Endpoint = self.__file[path]
            assert isinstance(endpoint, Dataset), "Please append to a dataset"
            dataset: Dataset = endpoint
            new_shape = dataset.shape[0] + length
            dataset.resize(new_shape, axis=0)
            dataset[-length:] = data

        self._write_attributes(path, attributes)
