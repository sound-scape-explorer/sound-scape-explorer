from enum import Enum

from PyInquirer import prompt
from rich import print


class MenuChoice(Enum):
    RefreshConfig = "Refresh configuration"
    ExtractAggregate = "Run extractions and aggregations"
    Reduce = "Run reductions"
    Repack = "Repack storage with `h5repack` (UNIX only)"
    Quit = "Quit"


def ask_menu() -> str:
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
    answer: str = answers["choices"]
    return answer
