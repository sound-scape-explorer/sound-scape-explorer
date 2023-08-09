from typing import List

from pandas import pandas

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorSheet import ExtractorSheet
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.extractors.Extractor import Extractor
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
        persists_ints = storage.read(ExtractorStorage.persists)
        persists = [True if p == 1 else False for p in persists_ints]

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

        df = pandas.DataFrame(
            [
                parser.get(sheet, ExtractorSheet.name_),
                parser.get(sheet, ExtractorSheet.offset),
                parser.get(sheet, ExtractorSheet.step),
                parser.get(sheet, ExtractorSheet.persist),
            ]
        )
        df = df.T
        df = df.dropna(how="all")
        df.columns = ["names", "offsets", "steps", "persists"]

        names = df["names"].tolist()
        offsets = df["offsets"].tolist()
        steps = df["steps"].tolist()
        persists = [True if p == 1 else False for p in df["persists"].tolist()]

        extractors = ExtractorConfig.reconstruct(
            names=names,
            offsets=offsets,
            steps=steps,
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

    @staticmethod
    def instanciate_from_storage(
        storage: Storage,
        settings: SettingsConfig,
    ) -> List[Extractor]:
        configs = ExtractorStorage.read_from_storage(storage)

        extractors: List[Extractor] = []

        for config in configs:
            extractor: Extractor = config.create_instance(settings)
            extractors.append(extractor)

        return extractors
