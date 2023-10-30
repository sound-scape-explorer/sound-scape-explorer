from typing import List

from pandas import Timestamp

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.ranges.RangeConfig import RangeConfig
from processing.config.ranges.RangeExcel import RangeExcel
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.convert_date_to_timestamp import convert_date_to_timestamp
from processing.utils.validate_excel_names import validate_excel_names


class RangeStorage:
    names = StoragePath.ranges_names.value
    starts = StoragePath.ranges_starts.value
    ends = StoragePath.ranges_ends.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(RangeStorage.names)
        storage.delete(RangeStorage.starts)
        storage.delete(RangeStorage.ends)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return (
            storage.exists_dataset(RangeStorage.names)
            and storage.exists_dataset(RangeStorage.starts)
            and storage.exists_dataset(RangeStorage.ends)
        )

    @staticmethod
    def read_from_storage(storage: Storage) -> List[RangeConfig]:
        names_dataset = storage.read(RangeStorage.names)

        names = storage.convert_dataset_to_string_list(names_dataset)
        starts = storage.read(RangeStorage.starts)
        ends = storage.read(RangeStorage.ends)

        ranges = RangeConfig.reconstruct(
            names=names,
            starts=starts[:],
            ends=ends[:],
        )

        return ranges

    @staticmethod
    def write_to_storage(ranges: List[RangeConfig], storage: Storage) -> None:
        names, starts, ends = RangeConfig.flatten(ranges)

        storage.write(path=RangeStorage.names, data=names)
        storage.write(path=RangeStorage.starts, data=starts)
        storage.write(path=RangeStorage.ends, data=ends)

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[RangeConfig]:
        sheet = ExcelSheet.ranges

        names: List[str] = parser.get(sheet, RangeExcel.name_)
        names = validate_excel_names(names)

        starts: List[Timestamp] = parser.get(sheet, RangeExcel.start)
        ends: List[Timestamp] = parser.get(sheet, RangeExcel.end)

        starts_timestamps = [convert_date_to_timestamp(start) for start in starts]
        ends_timestamps = [convert_date_to_timestamp(end) for end in ends]

        ranges = RangeConfig.reconstruct(
            names=names,
            starts=starts_timestamps,
            ends=ends_timestamps,
        )

        return ranges
