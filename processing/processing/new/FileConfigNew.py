import mimetypes
import os
from dataclasses import dataclass

from mutagen.flac import FLAC
from mutagen.mp3 import MP3
from mutagen.wave import WAVE

from processing.dtos import FileDto
from processing.new.SettingsConfigNew import SettingsConfigNew
from processing.new.time import convert_date_string_to_timestamp


FileLabels = dict[str, str]


@dataclass
class FileConfigNew:
    index: int
    relative_path: str
    absolute_path: str
    timestamp: int  # ms
    site: str
    duration: int  # ms
    labels: FileLabels  # TODO: maybe transform this to an object?

    @classmethod
    def from_dto(cls, dto: FileDto, settings: SettingsConfigNew):
        relative_path = FileConfigNew._get_relative_path(dto.Path)
        absolute_path = os.path.join(settings.audio_path, relative_path)

        if not os.path.exists(absolute_path):
            raise Exception(f"File {absolute_path} does not exist")

        instance = cls(
            index=int(dto.Index),
            relative_path=dto.Path,
            absolute_path=absolute_path,
            timestamp=convert_date_string_to_timestamp(dto.Date),
            site=dto.Site,
            duration=cls._calculate_duration(absolute_path),
            labels=dto.labels,
        )

        return instance

    @staticmethod
    def _get_relative_path(path: str):
        return path[1:] if path.startswith("/") else path

    @staticmethod
    def _get_mime_type(full_path: str):
        mime_type, encoding = mimetypes.guess_type(full_path)

        if mime_type is None:
            raise Exception(f"File {full_path} does not have a mime type")

        return mime_type

    @staticmethod
    def _calculate_duration(full_path: str) -> int:
        mime_type = FileConfigNew._get_mime_type(full_path)

        l: float

        if mime_type == "audio/wav" or mime_type == "audio/x-wav":
            mutagen_file = WAVE(full_path)
            l = mutagen_file.info.length
        elif mime_type == "audio/mp3" or mime_type == "audio/mpeg":
            mutagen_file = MP3(full_path)
            l = mutagen_file.info.length
        elif mime_type == "audio/flac" or mime_type == "audio/x-flac":
            mutagen_file = FLAC(full_path)
            l = mutagen_file.info.length
        else:
            raise Exception(f"File {full_path} does not have a mime type")

        milliseconds = int(l * 1000)
        return milliseconds

    @property
    def start(self):
        return self.timestamp

    @property
    def end(self):
        return self.timestamp + self.duration
