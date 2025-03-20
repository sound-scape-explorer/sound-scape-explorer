from typing import List

from InquirerPy.resolver import prompt
from rich import print

from processing.context import Context
from processing.new.IntegrationConfigNew import IntegrationConfigNew


def ask_integration(context: Context):
    integrations = context.config.integrations

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

    results: List[IntegrationConfigNew] = list(
        filter(lambda i: i.name == name, integrations)
    )

    assert len(results) == 1, f"{len(results)} results for {name}"

    integration = results[0]

    return integration
