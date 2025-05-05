from InquirerPy.resolver import prompt

from processing.config.ExtractionConfig import ExtractionConfig
from processing.context import Context
from processing.config.BandConfig import BandConfig


def prompt_band(extraction: ExtractionConfig) -> BandConfig:
    bands = extraction.bands

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [band.name for band in bands],
            "message": "Choose your band",
        }
    ]

    answers = prompt(questions)
    name: str = str(answers["choices"])

    results = list(filter(lambda b: b.name == name, bands))
    assert len(results) == 1, f"{len(results)} results for {name}"
    return results[0]
