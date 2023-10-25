from typing import List

from InquirerPy.resolver import prompt
from rich import print

from processing.config.integrations.IntegrationConfig import IntegrationConfig


def ask_integration(integrations: List[IntegrationConfig]) -> IntegrationConfig:
    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [integration.name for integration in integrations],
            "message": "Choose your integration",
        }
    ]

    print()
    answers = prompt(questions)
    name: str = str(answers["choices"])

    results: List[IntegrationConfig] = list(
        filter(lambda i: i.name == name, integrations)
    )

    assert len(results) == 1, f"{len(results)} results for {name}"

    integration = results[0]

    return integration
