from typing import Any

import h5py
import numpy as np
from h5py import File, Dataset, Group, Datatype

from processing.storage.StorageMode import StorageMode


_Endpoint = Dataset | Group | Datatype
_Attributes = dict[str, str]

_compression = "gzip"


class Storage:
    def __init__(self, path: str):
        self.path = path
        self._file = self._open()

    def close(self):
        self._file.close()

    def _open(self):
        return File(self.path, StorageMode.RW_OR_CREATE.value)

    def read_strings(self, path: str) -> list[Any]:
        dataset = self.read(path)
        strings = dataset.asstr()[:]
        assert isinstance(strings, np.ndarray)
        return strings.tolist()

    def read(self, path: str) -> Dataset:
        exists = self.exists(path)
        if not exists:
            raise KeyError(f"Storage: path {path} not found")

        endpoint: _Endpoint = self._file[path]

        if not isinstance(endpoint, Dataset):
            raise KeyError(f"Storage: path {path} does not contain a dataset")

        dataset: Dataset = endpoint

        is_empty = 0 in dataset.shape
        if is_empty:
            raise KeyError(f"Storage: empty dataset")
            # return []

        return dataset

    def exists(self, path: str):
        try:
            _ = self._file[path]
            return True
        except KeyError:
            return False

    def delete(self, path: str):
        exists = self.exists(path)

        if not exists:
            return

        del self._file[path]

    def _write_attributes(
        self,
        path: str,
        attributes: _Attributes | None = None,
    ):
        if attributes is None:
            return

        exists = self.exists(path)

        if not exists:
            return

        for k, v in attributes.items():
            self._file[path].attrs[k] = v

    # for datasets
    def write(
        self,
        path: str,
        data: np.ndarray,
        attributes: _Attributes | None = None,
    ):
        exists = self.exists(path)

        if exists:
            raise KeyError(f"Storage: path {path} already exists")

        self._file.create_dataset(
            name=path,
            data=data,
            compression=_compression,
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

        self._file.create_group(path)

        for k, v in data.items():
            self._file[path].attrs[k] = v

    def append(
        self,
        path: str,
        data: np.ndarray,
        attributes: _Attributes | None = None,
    ):
        length = data.shape[0]

        # handle variable string lengths
        if data.dtype.kind == "U":
            data = np.array(data, dtype=h5py.special_dtype(vlen=str))

        infinite_shape = (None, *data.shape[1:])
        exists = self.exists(path)

        if not exists:
            # create
            self._file.create_dataset(
                name=path,
                data=data,
                compression=_compression,
                chunks=True,
                shape=data.shape,
                maxshape=infinite_shape,
            )
        else:
            # actual appending
            endpoint: _Endpoint = self._file[path]
            assert isinstance(endpoint, Dataset), "Please append to a dataset"
            dataset: Dataset = endpoint
            new_shape = dataset.shape[0] + length
            dataset.resize(new_shape, axis=0)
            dataset[-length:] = data

        self._write_attributes(path, attributes)
