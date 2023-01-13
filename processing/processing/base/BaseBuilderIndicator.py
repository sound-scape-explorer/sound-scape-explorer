import os
from json import dumps
from pathlib import Path
from typing import Any, Callable, List

from maad.sound import load
from numpy import ndarray

from processing.classes.AudioFiles import AudioFiles
from processing.constants import GENERATED_BASE
from processing.enum.Indicator import Indicator


class BaseBuilderIndicator:
    __name: Indicator
    __processor: Callable[[ndarray], float]
    __audio_files: AudioFiles
    __values: List[Any]

    def __new__(cls, *args, **kwargs):
        if cls is BaseBuilderIndicator:
            raise TypeError(
                f"only children of '{cls.__name__}' may be instantiated"
            )

        # noinspection PyArgumentList
        return object.__new__(cls, *args, **kwargs)

    def __init__(
        self,
        name: Indicator,
        processor: Callable[[ndarray], float]
    ):
        self.__name = name
        self.__processor = processor

        self.__audio_files = AudioFiles()
        self.__values = []

        self.__prepare()
        self.__process()
        # self.export()

    def __get_target_directory(self) -> Path:
        return Path(f'{GENERATED_BASE}indicators')

    def __get_target_path(self) -> Path:
        directory_path = self.__get_target_directory()
        return directory_path.joinpath(f'{self.__name.value}.json')

    def __prepare(self):
        directory_path = self.__get_target_directory()

        if not directory_path.exists():
            os.mkdir(directory_path)

    def __iterate_paths(self):
        for file in self.__audio_files.files.keys():
            path = self.__audio_files.get_filename_path(file)
            yield path

    def __process(self):
        for path in self.__iterate_paths():
            sound, _sample_rate = load(path)
            value = self.__processor(sound)
            self.__values.append(value)

    def export(self):
        json = {"data": self.__values}
        string = dumps(json)
        path = self.__get_target_path()
        f = open(path, "w")
        f.write(string)
