from InquirerPy.resolver import prompt
from rich import print

from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig


def prompt_integration(extraction: ExtractionConfig) -> IntegrationConfig:
    integrations = extraction.integrations

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [integration.name for integration in integrations],
            "message": "Choose your integration",
        }
    ]

    answers = prompt(questions)
    name: str = str(answers["choices"])

    results = list(filter(lambda i: i.name == name, integrations))
    assert len(results) == 1, f"{len(results)} results for {name}"
    return results[0]
