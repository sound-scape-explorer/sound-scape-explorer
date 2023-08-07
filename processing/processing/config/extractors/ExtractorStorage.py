from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorExcel import ExtractorExcel
from processing.storage.Storage import Storage


class ExtractorStorage:
    names = "/extractors/names"
    offsets = "/extractors/offsets"
    steps = "/extractors/steps"
    persists = "/extractors/persists"

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(ExtractorStorage.names)
        storage.delete(ExtractorStorage.offsets)
        storage.delete(ExtractorStorage.steps)
        storage.delete(ExtractorStorage.persists)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[ExtractorConfig]:
        names_dataset = storage.read(ExtractorStorage.names)
        names = storage.convert_dataset_to_string_list(names_dataset)

        offsets = storage.read(ExtractorStorage.offsets)
        steps = storage.read(ExtractorStorage.steps)
        persists = storage.read(ExtractorStorage.persists)

        extractors = ExtractorConfig.reconstruct(
            names=names,
            offsets=offsets[:],
            steps=steps[:],
            persists=persists[:],
        )

        return extractors

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[ExtractorConfig]:
        sheet = ExcelSheet.extractors

        names = parser.get(sheet, ExtractorExcel.name_)
        offsets = parser.get(sheet, ExtractorExcel.offset)
        steps = parser.get(sheet, ExtractorExcel.step)
        persists_strings = parser.get(sheet, ExtractorExcel.persist)
        persists = [True if ps == "yes" else False for ps in persists_strings]

        extractors = ExtractorConfig.reconstruct(
            names=names,
            offsets=offsets[:],
            steps=steps[:],
            persists=persists,
        )

        return extractors

    @staticmethod
    def write_to_storage(extractors: List[ExtractorConfig], storage: Storage) -> None:
        names, offsets, steps, persists = ExtractorConfig.flatten(extractors)
        storage.write(ExtractorStorage.names, names)
        storage.write(ExtractorStorage.offsets, offsets)
        storage.write(ExtractorStorage.steps, steps)
        storage.write(ExtractorStorage.persists, persists)
