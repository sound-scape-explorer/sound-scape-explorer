from typing import List

from processing.config.extractors.ExtractorConfig import ExtractorConfig


def filter_nn_extractors(extractors: List[ExtractorConfig]) -> List[ExtractorConfig]:
    filtered_extractors: List[ExtractorConfig] = []

    for extractor in extractors:
        if extractor.name not in ExtractorConfig.nn_extractors:
            continue

        filtered_extractors.append(extractor)

    return filtered_extractors
