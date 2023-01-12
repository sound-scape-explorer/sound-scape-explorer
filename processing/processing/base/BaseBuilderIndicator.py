import os
from json import dumps
from pathlib import Path
from typing import Any, List

from maad.sound import load

from processing.classes.AudioFiles import AudioFiles
from processing.constants import GENERATED_BASE


class BaseBuilderIndicator:
    __name: str
    __audio_files: AudioFiles
    __indicators: List[Any]

    def __new__(cls, *args, **kwargs):
        if cls is BaseBuilderIndicator:
            raise TypeError(
                f"only children of '{cls.__name__}' may be instantiated"
            )

        # noinspection PyArgumentList
        return object.__new__(cls, *args, **kwargs)

    def __init__(
        self,
        name: str,
        processor
    ):
        self.__name = name
        self.__processor = processor

        self.__audio_files = AudioFiles()
        self.__indicators = []

        self.__prepare()
        self.__build()
        self.__export()

    def __get_target_directory(self) -> Path:
        return Path(f'{GENERATED_BASE}indicators')

    def __get_target_path(self) -> Path:
        directory_path = self.__get_target_directory()
        return directory_path.joinpath(f'{self.__name}.json')

    def __prepare(self):
        directory_path = self.__get_target_directory()

        if not directory_path.exists():
            os.mkdir(directory_path)

    def __iterate_paths(self):
        for file in self.__audio_files.files.keys():
            path = self.__audio_files.get_filename_path(file)
            yield path

    def __build(self):
        for path in self.__iterate_paths():
            sound, _sample_rate = load(path)
            indicator = self.__processor(sound)
            self.__indicators.append(indicator)

    def __export(self):
        json = {"data": self.__indicators}
        string = dumps(json)
        path = self.__get_target_path()
        f = open(path, "w")
        f.write(string)
