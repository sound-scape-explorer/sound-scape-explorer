import json
import pathlib
from typing import List

from processing.base.BaseConfigWriter import BaseConfigWriter
from processing.constants import GENERATED_BASE
from processing.types.IndicatorJSONType import IndicatorJSONType
from processing.utils.get_directories_and_files import get_directories_and_files


class ConfigWriterIndicator(BaseConfigWriter):
    """The configuration writer for indicators.

    Indicators are values tied to audio data like `Leq_T` or `ACI`.

    Attributes:
        __sources: The list of file paths to iterate over.

    TODO: This will be unavailable as indicators should be computed on
        integrated audio chunks and not directly from audio recordings.
    """
    __sources: List[str]

    def __init__(
        self,
        filename: str,
    ) -> None:
        super().__init__(filename)

        self.__sources = []

        self.__read_indicators_from_disk()

        self.write()
        self.save()

    def write(self):
        for source in self.__sources:
            with open(source, "r") as f:
                indicator: IndicatorJSONType = json.load(f)

                meta_property = f"files_{indicator['name']}"
                values = indicator['data']

                self.write_column(meta_property, values)

    def __read_indicators_from_disk(self):
        path = pathlib.Path(f'{GENERATED_BASE}indicators').absolute()

        if not path.exists():
            raise TypeError(str(path))

        directories, files = get_directories_and_files(str(path))

        if len(files) == 0:
            return

        self.__sources = files
