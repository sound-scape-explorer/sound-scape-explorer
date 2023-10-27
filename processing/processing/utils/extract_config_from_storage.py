import io

from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


def extract_config_from_storage(storage_path: str):
    storage = Storage(storage_path)
    binary_dataset = storage.read(StoragePath.config_file.value)
    version = binary_dataset.attrs["version"]
    binary_data: bytes = binary_dataset[:].tobytes()

    file_object = io.BytesIO(binary_data)
    file_path = f"{storage_path}-config-{version}.xlsx"

    with open(file_path, "wb") as f:
        f.write(file_object.getbuffer())
