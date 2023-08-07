from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.indicators.IndicatorConfig import IndicatorConfig
from processing.config.indicators.IndicatorSheet import IndicatorSheet
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class IndicatorStorage:
    names = StoragePath.indicators_names.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(IndicatorStorage.names)

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[IndicatorConfig]:
        sheet = ExcelSheet.indicators
        names = parser.get(sheet, IndicatorSheet.indicator)
        indicators = IndicatorConfig.reconstruct(names=names)
        return indicators

    @staticmethod
    def read_from_storage(storage: Storage) -> List[IndicatorConfig]:
        names_dataset = storage.read(IndicatorStorage.names)
        names = storage.convert_dataset_to_string_list(names_dataset)
        indicators = IndicatorConfig.reconstruct(names=names)
        return indicators

    @staticmethod
    def write_to_storage(
        indicators: List[IndicatorConfig],
        storage: Storage,
    ) -> None:
        names = IndicatorConfig.flatten(indicators)

        storage.write(path=IndicatorStorage.names, data=names)
