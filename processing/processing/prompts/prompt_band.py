from InquirerPy.resolver import prompt

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig


def prompt_band(extraction: ExtractionConfig) -> BandConfig:
    bands = extraction.bands

    # noinspection PyProtectedMember
    from InquirerPy.utils import InquirerPyQuestions

    questions: InquirerPyQuestions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [band.name for band in bands],
            "message": "Choose your band",
        }
    ]

    answers = prompt(questions, vi_mode=True)
    name: str = str(answers["choices"])

    results = list(filter(lambda b: b.name == name, bands))
    assert len(results) == 1, f"{len(results)} results for {name}"
    return results[0]
