from typing import List

from pandas import pandas

from processing.config.ConfigParser import ConfigParser
from processing.config.digesters.DigesterConfig import DigesterConfig
from processing.config.digesters.DigesterSheet import DigesterSheet
from processing.config.ExcelSheet import ExcelSheet
from processing.storage.Storage import Storage


class DigesterStorage:
    names = "/digesters/names"

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(DigesterStorage.names)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(DigesterStorage.names)

    @staticmethod
    def write_to_storage(digesters: List[DigesterConfig], storage: Storage) -> None:
        names = DigesterConfig.flatten(digesters)

        storage.write(path=DigesterStorage.names, data=names)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[DigesterConfig]:
        names_dataset = storage.read(DigesterStorage.names)
        names = storage.convert_dataset_to_string_list(names_dataset)
        digests = DigesterConfig.reconstruct(names)
        return digests

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[DigesterConfig]:
        sheet = ExcelSheet.digesters

        df = pandas.DataFrame([parser.get(sheet, DigesterSheet.name_)])
        df = df.T
        df = df.dropna(how="all")
        df.columns = ["names"]

        names = df["names"].tolist()

        digests = DigesterConfig.reconstruct(names)
        return digests
