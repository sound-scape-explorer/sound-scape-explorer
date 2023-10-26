from typing import List, Union

from mutagen import File  # type: ignore
from mutagen.flac import FLAC
from mutagen.mp3 import MP3
from mutagen.wave import WAVE

from processing.utils.get_file_full_path import get_file_full_path

MyFile = Union[WAVE, MP3, FLAC, None]


def read_files_durations(
    names: List[str],
    base_path: str,
) -> List[int]:
    durations: List[int] = []

    for name in names:
        path = get_file_full_path(name, base_path)
        file: MyFile = File(path, easy=True)

        assert file is not None, f"File {path} not found"

        length = file.info.length

        assert (
            type(length) is int or type(length) is float
        ), f"Invalid file length type {type(file.info.length)}"

        milliseconds = int(length * 1000)
        durations.append(milliseconds)

    return durations
