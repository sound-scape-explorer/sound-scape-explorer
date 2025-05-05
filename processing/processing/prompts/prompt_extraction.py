from InquirerPy.resolver import prompt

from processing.config.ExtractionConfig import ExtractionConfig
from processing.context import Context


def prompt_extraction(context: Context) -> ExtractionConfig:
    extractions = context.config.extractions

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [e.name for e in extractions],
            "message": "Choose your integration",
        }
    ]

    answers = prompt(questions)
    name: str = str(answers["choices"])

    results = list(filter(lambda e: e.name == name, extractions))
    assert len(results) == 1, f"{len(results)} results for {name}"
    return results[0]
