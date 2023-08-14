from typing import List

from PyInquirer import prompt
from rich import print

from processing.config.extractors.ExtractorConfig import ExtractorConfig


def ask_extractor(extractors: List[ExtractorConfig]) -> ExtractorConfig:
    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [extractor.name for extractor in extractors],
            "message": "Choose your extractor",
        }
    ]

    print()
    answers = prompt(questions)
    name: str = answers["choices"]

    results: List[ExtractorConfig] = list(
        filter(lambda ex: ex.name == name, extractors)
    )

    assert len(results) == 1, f"{len(results)} results for {name}"

    extractor = results[0]

    return extractor
