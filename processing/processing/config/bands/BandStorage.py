from typing import List

from processing.config.bands.BandConfig import BandConfig
from processing.config.bands.BandExcel import BandExcel
from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.validate_excel_names import validate_excel_names


class BandStorage:
    names = StoragePath.bands_names.value
    lows = StoragePath.bands_lows.value
    highs = StoragePath.bands_highs.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(BandStorage.names)
        storage.delete(BandStorage.lows)
        storage.delete(BandStorage.highs)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return (
            storage.exists_dataset(BandStorage.names)
            and storage.exists_dataset(BandStorage.lows)
            and storage.exists_dataset(BandStorage.highs)
        )

    @staticmethod
    def read_from_storage(storage: Storage) -> List[BandConfig]:
        names_dataset = storage.read(BandStorage.names)

        names = storage.convert_dataset_to_string_list(names_dataset)
        lows = storage.read(BandStorage.lows)[:]
        highs = storage.read(BandStorage.highs)[:]

        bands = BandConfig.reconstruct(
            names=names,
            lows=lows,
            highs=highs,
        )

        return bands

    @staticmethod
    def write_to_storage(bands: List[BandConfig], storage: Storage) -> None:
        names, lows, highs = BandConfig.flatten(bands)

        storage.write(path=BandStorage.names, data=names)
        storage.write(path=BandStorage.lows, data=lows)
        storage.write(path=BandStorage.highs, data=highs)

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[BandConfig]:
        sheet = ExcelSheet.bands

        names: List[str] = parser.get(sheet, BandExcel.name_)
        names = validate_excel_names(names)

        lows: List[int] = parser.get(sheet, BandExcel.low)
        highs: List[int] = parser.get(sheet, BandExcel.high)

        bands = BandConfig.reconstruct(
            names=names,
            lows=lows,
            highs=highs,
        )

        return bands
