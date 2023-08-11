from enum import Enum

from PyInquirer import prompt
from rich import print


class MenuChoice(Enum):
    RefreshConfig = "Refresh configuration"
    ExtractAggregate = "Extract and aggregate"
    Repack = "Repack with `h5repack`"
    Quit = "Quit"


def ask_menu():
    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [choice.value for choice in MenuChoice],
            "message": "Choose your action",
        }
    ]

    print()
    answers = prompt(questions)
    answer = answers["choices"]
    return answer
