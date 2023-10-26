from typing import List

from InquirerPy.resolver import prompt

from processing.config.bands.BandConfig import BandConfig


def ask_band(bands: List[BandConfig]) -> BandConfig:
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

    results: List[BandConfig] = list(filter(lambda b: b.name == name, bands))

    assert len(results) == 1, f"{len(results)} results for {name}"

    band = results[0]

    return band
