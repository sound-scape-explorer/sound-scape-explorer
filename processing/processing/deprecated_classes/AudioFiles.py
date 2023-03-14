import pathlib
from typing import Any, Dict, Optional, Union

from processing.constants import FEATURE_BASE
from processing.deprecated_classes.Config import Config
from processing.deprecated_errors.AudioFilesPathNotFoundError import \
    AudioFilesPathNotFoundError
from processing.deprecated_utils.get_name_and_extension_from_filepath import \
    get_name_and_extension_from_filepath


class AudioFiles:
    """The audio files retrieved from user configuration file.

    Will verify path existence and allow to iterate over the audio files.

    TODO: Remove overlap of concerns with `Filepaths`

    Attributes:
        __path: The path inherited from legacy code.
            TODO: Seems unused. Remove.
        __features_extension: The request file extension when generating
            output paths.
            TODO: Seems unused. Remove.
        __config: The user configuration.
        __base_path: The base path where source audio files are located.
        __expected_sample_rate: The expected sample rate from user settings.
            TODO: Seems not necessary to handle this. Remove.
    """
    __path: Optional[str] = '@feature_base'
    __features_extension: Optional[str] = '.npz'
    __config: Union[tuple, Any]
    __base_path: str
    __expected_sample_rate: int
    files: Dict[str, Any]

    def __init__(
        self,
        path: Optional[str] = '@feature_base',
        features_extension: Optional[str] = '.npz',
    ) -> None:
        self.__path = path
        self.__features_extension = features_extension

        self.__config = Config().get()
        self.__pick_parameters_from_config()
        self.__verify_paths()

    def __verify_paths(self):
        files = self.files.keys()

        for file in files:
            path = self.get_filename_path(file)
            if not path.exists():
                raise AudioFilesPathNotFoundError(f'{path}')

    def __pick_parameters_from_config(self):
        self.files = self.__config.files
        self.__base_path = self.__config.variables['audio_base']
        self.__expected_sample_rate = int(
            self.__config.variables['audio_expected_sample_rate']
        )

    def get_filename_path(self, filename):
        return pathlib.Path(self.__base_path + filename)

    def __iterate(self, band):
        for filepath, info in self.files.items():
            input_path = self.get_filename_path(filepath)

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
