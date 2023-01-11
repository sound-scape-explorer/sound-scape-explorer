import pathlib
from typing import Any, Optional, Union

from processing.classes.Config import Config
from processing.constants import FEATURE_BASE
from processing.errors.AudioFilesPathNotFoundError import \
    (
    AudioFilesPathNotFoundError,
)
from processing.utils.get_name_and_extension_from_filepath import \
    get_name_and_extension_from_filepath


class AudioFiles:
    __path: Optional[str]
    __features_extension: Optional[str]
    __config: Union[tuple, Any]

    def __init__(
        self,
        path: Optional[str],
        features_extension: Optional[str],
    ):
        self.__path = path
        self.__features_extension = features_extension

        self.__config = Config().get()
        self.__pick_parameters_from_config()
        self.__verify_paths()

    def __verify_paths(self):
        files = self.files.keys()

        for file in files:
            path = self.__get_filename_path(file)
            if not path.exists():
                raise AudioFilesPathNotFoundError(f'{path}')

    def __pick_parameters_from_config(self):
        self.files = self.__config.files
        self.__base_path = self.__config.variables['audio_base']
        self.__expected_sample_rate = int(
            self.__config.variables['audio_expected_sample_rate']
        )

    def __get_filename_path(self, filename):
        return pathlib.Path(self.__base_path + filename)

    def __iterate(self, band):
        for filepath, info in self.files.items():
            input_path = self.__get_filename_path(filepath)

            response = [filepath, info, input_path]

            if self.__path is not None and self.__features_extension is not \
                    None:
                name, extension = get_name_and_extension_from_filepath(filepath)

                base_path = pathlib.Path(FEATURE_BASE)
                path = base_path.joinpath(
                    band,
                    name + extension + self.__features_extension
                )

                response.append(path)

            yield response

    def iterate_with_bands(self):
        for band, frequency_range in self.__config.bands.items():
            for r in self.__iterate(band):
                yield [self.__expected_sample_rate, band, frequency_range] + r
