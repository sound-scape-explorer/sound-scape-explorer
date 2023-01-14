import json
import pathlib

from processing.base.BaseConfigWriter import BaseConfigWriter
from processing.constants import GENERATED_BASE
from processing.types.IndicatorJSONType import IndicatorJSONType
from processing.utils.get_directories_and_files import get_directories_and_files


class ConfigWriterIndicator(BaseConfigWriter):
    def __init__(
        self,
        filename: str,
    ):
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
