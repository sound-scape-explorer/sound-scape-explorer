import json
import mimetypes
import subprocess
import sys
from typing import List, Union

from mutagen.flac import FLAC
from mutagen.mp3 import MP3
from mutagen.wave import WAVE
from rich import print

from processing.utils.get_file_full_path import get_file_full_path

MyFile = Union[WAVE, MP3, FLAC, None]


def read_files_durations(
    names: List[str],
    base_path: str,
) -> List[int]:
    durations: List[int] = []

    for name in names:
        path = get_file_full_path(name, base_path)
        duration = _calculate_duration(path)
        durations.append(duration)

    return durations


def _get_mime_type(full_path: str):
    mime_type, _ = mimetypes.guess_type(full_path)

    if mime_type is None:
        raise Exception(f"File {full_path} does not have a mime type")

    return mime_type


def _read_duration_from_ffprobe(path: str):
    print(f"Reading directly audio length with ffprobe for path: {path}")

    ffprobe_cmd = "ffprobe.exe" if sys.platform.startswith("win") else "ffprobe"

    cmd = [
        ffprobe_cmd,
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "json",
        path,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    data = json.loads(result.stdout)
    duration = float(data["format"]["duration"])
    return int(duration)


def _calculate_duration(path: str) -> int:
    mime_type = _get_mime_type(path)

    length: float

    if mime_type == "audio/wav" or mime_type == "audio/x-wav":
        mutagen_file = WAVE(path)
        length = int(mutagen_file.info.length)
        if length == 0:
            length = _read_duration_from_ffprobe(path)

    elif mime_type == "audio/mp3" or mime_type == "audio/mpeg":
        mutagen_file = MP3(path)
        length = mutagen_file.info.length

    elif mime_type == "audio/flac" or mime_type == "audio/x-flac":
        mutagen_file = FLAC(path)
        length = mutagen_file.info.length

    else:
        raise Exception(f"Could not read file {path} with mime type {mime_type}")

    milliseconds = int(length * 1000)
    return milliseconds
