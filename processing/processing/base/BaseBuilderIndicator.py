import json
import os
from pathlib import Path
from typing import Any, List

import maad
import numpy

from processing.classes.AudioFiles import AudioFiles
from processing.constants import GENERATED_BASE
from processing.enum.Indicator import Indicator
from processing.types.BuilderProcessorInterface import BuilderProcessorInterface
from processing.types.IndicatorJSONType import IndicatorJSONType


class BaseBuilderIndicator:
    __name: Indicator
    __processor: BuilderProcessorInterface
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
        processor: BuilderProcessorInterface
    ):
        self.__name = name
        self.__processor = processor

        self.__audio_files = AudioFiles()
        self.__values = []

        self.__prepare()
        self.__process()
        # self.export()

    def __print_path(self, p):
        print(f'---')
        print(f'Path: {p}')

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
            self.__print_path(path)

            sound, sample_rate = maad.sound.load(path)
            value = self.__processor(sound, sample_rate)

            self.__values.append(value)

    def export(self):
        indicator: IndicatorJSONType = {
            "name": self.__name.value,
            "description": self.__name.name,
            "data": self.__values,
        }

        string = json.dumps(indicator)
        path = self.__get_target_path()

        f = open(path, "w")
        f.write(string)

    def __processor(self, sound: numpy.ndarray, sample_rate: int) -> float:
        """
        Implement in children.
        """
        pass
