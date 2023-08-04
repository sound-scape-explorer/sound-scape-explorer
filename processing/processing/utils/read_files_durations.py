from typing import List, Union

from mutagen import File
from mutagen.flac import FLAC
from mutagen.mp3 import MP3
from mutagen.wave import WAVE

MyFile = Union[WAVE, MP3, FLAC, None]


def read_files_durations(
    names: List[str],
    base_path: str,
) -> List[int]:
    durations: List[int] = []

    for name in names:
        path = f"{base_path}{name}"
        file: MyFile = File(path, easy=True)

        assert file is not None, f"File {path} not found"

        length = file.info.length

        assert (
            type(length) is int or type(length) is float
        ), f"Invalid file length type {type(file.info.length)}"

        milliseconds = int(length * 1000)
        durations.append(milliseconds)

    return durations
