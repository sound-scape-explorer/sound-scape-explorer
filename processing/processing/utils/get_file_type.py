import mimetypes
from typing import Union, Literal

from processing.errors.FileTypeUnknownError import FileTypeUnknownError

FileType = Literal["JSON", "XLSX"]
MimeTypeResult = Union[FileType, None]


def get_file_type(file_path) -> FileType:
    mime_type, _ = mimetypes.guess_type(file_path)

    mime_to_name = {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
        "application/json": "JSON",
    }

    file_type: MimeTypeResult = mime_to_name.get(mime_type, None)

    if file_type == "XLSX":
        return "XLSX"

    if file_type == "JSON":
        return "JSON"

    raise FileTypeUnknownError()
