from pandas import pandas

from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def print_extractors(storage: Storage):
    print_new_line()
    print("Extractors")

    extractors = ExtractorStorage.read_from_storage(storage)

    columns = ["name", "extractor", "offset", "step", "persist"]
    data = []

    for extractor in extractors:
        data.append(
            [
                extractor.name,
                ExtractorConfig.extractors[extractor.name].__name__,
                extractor.offset,
                extractor.step,
                extractor.persist,
            ]
        )

    df = pandas.DataFrame(data, columns=columns)
    print(df)
