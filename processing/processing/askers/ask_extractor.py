from typing import List

from InquirerPy.resolver import prompt
from rich import print

from processing.context import Context
from processing.new.ExtractorConfigNew import ExtractorConfigNew


def ask_extractor(context: Context):
    extractors = context.config.extractors

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [ex.name for ex in extractors],
            "message": "Choose your integration",
        }
    ]

    print()
    answers = prompt(questions)
    name: str = str(answers["choices"])

    results: List[ExtractorConfigNew] = list(
        filter(lambda i: i.name == name, extractors)
    )

    assert len(results) == 1, f"{len(results)} results for {name}"

    integration = results[0]

    return integration
