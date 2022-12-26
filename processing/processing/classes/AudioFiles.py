import pathlib
from typing import Any, Optional, Union

from processing.classes.Config import Config


class AudioFiles:
    __path: Optional[str]
    __extension: Optional[str]
    __config: Union[tuple, Any]

    def __init__(self, path: Optional[str], extension: Optional[str]):
        self.__path = path
        self.__extension = extension

        self.__config = Config().get()
        self.__pick_parameters_from_config()

    def __pick_parameters_from_config(self):
        self.files = self.__config.files
        self.__suffix = self.__config.variables['audio_suffix']
        self.__base_path = self.__config.variables['audio_base']
        self.__expected_sample_rate = int(
            self.__config.variables['audio_expected_sample_rate']
        )

    def __get_filename_path(self, filename):
        return pathlib.Path(self.__base_path).joinpath(filename + self.__suffix)

    def __get_something(self, path):
        return pathlib.Path(
            self.__config.variables[path[1:]] if path.startswith('@') else path
        )

    def __iterate(self, band):
        for filename, info in self.files.items():
            input_path = self.__get_filename_path(filename)

            response = [filename, info, input_path]

            if self.__path is not None and self.__extension is not None:
                p = self.__get_something(self.__path)

                response.append(
                    p.joinpath(
                        band,
                        filename + self.__suffix
                    ).with_suffix(
                        self.__extension
                    )
                )

            yield response

    def iterate_with_bands(self):
        for band, spec in self.__config.bands.items():
            for r in self.__iterate(band):
                yield [self.__expected_sample_rate, band, spec] + r
