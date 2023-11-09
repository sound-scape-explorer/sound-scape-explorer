from typing import Any, Dict, List, Optional, Union

import numpy
from h5py import Dataset, File

from processing.storage.StorageCompression import StorageCompression
from processing.storage.StorageMode import StorageMode
from processing.storage.StoragePath import StoragePath
from processing.utils.get_version_from_setup import get_version_from_setup


class Storage:
    """The interface for handling HDF5 storage file."""

    def __init__(
        self,
        path: str,
    ) -> None:
        self.path = path
        self.__set_file_or_fail()

    def __set_file_or_fail(self) -> None:
        try:
            self.__file = File(
                self.path,
                StorageMode.rw_or_create.value,
            )
        except BlockingIOError:
            raise RuntimeError(f"Unable to load file {self.path}.")
        except TypeError:
            raise FileNotFoundError(f"Unable to find file {self.path}.")

    def close(self) -> None:
        self.__file.close()

    def load(self) -> None:
        self.__set_file_or_fail()

    @staticmethod
    def __get_path_as_string(path: Union[StoragePath, str]) -> str:
        if type(path) is StoragePath:
            path = path.value

        path = str(path)
        return path

    def __write_version_to_dataset(
        self,
        dataset: Dataset,
    ) -> Dataset:
        # Attach app version to all datasets
        dataset.attrs["version"] = get_version_from_setup()
        return dataset

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

        self.__write_version_to_dataset(dataset)

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

    # TODO: This can output a group!
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

    # Silent delete
    def delete(
        self,
        path: Union[StoragePath, str],
    ) -> None:
        try:
            if isinstance(path, str):
                del self.__file[path]
            elif type(path) is StoragePath:
                del self.__file[path.value]
        except KeyError:
            return

    def write_empty_group(self, path: str) -> None:
        self.__file.create_group(path)

    def write_binary(
        self,
        path: str,
        binary_data: bytes,
    ) -> None:
        binary_array = numpy.frombuffer(binary_data, dtype="uint8")

        dataset = self.__file.create_dataset(
            name=path,
            data=binary_array,
            compression=StorageCompression.gzip.value,
        )

        self.__write_version_to_dataset(dataset)

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

        self.__write_version_to_dataset(dataset)

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
