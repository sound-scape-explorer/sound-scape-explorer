import os
from dataclasses import dataclass

from processing.config.SettingsConfig import SettingsConfig
from processing.dtos import FileDto
from processing.lib.audio import read_duration
from processing.lib.time import convert_date_string_to_timestamp


@dataclass
class FileConfig:
    index: int
    relative_path: str
    absolute_path: str
    timestamp: int  # ms
    site: str
    duration: int  # ms
    tags: dict[str, str]

    @classmethod
    def from_dto(cls, dto: FileDto, settings: SettingsConfig):
        relative_path = FileConfig._get_relative_path(dto.Path)
        absolute_path = os.path.join(settings.audio_path, relative_path)

        if not os.path.exists(absolute_path):
            raise Exception(f"File {absolute_path} does not exist")

        instance = cls(
            index=int(dto.Index),
            relative_path=dto.Path,
            absolute_path=absolute_path,
            timestamp=convert_date_string_to_timestamp(dto.Date),
            site=dto.Site,
            duration=read_duration(absolute_path),
            tags=dto.tags,
        )

        return instance

    @staticmethod
    def _get_relative_path(path: str):
        return path[1:] if path.startswith("/") else path

    @property
    def start(self):
        return self.timestamp

    @property
    def end(self):
        return self.timestamp + self.duration
