import subprocess
from enum import Enum

from PyInquirer import prompt


class OnEndChoice(Enum):
    Menu = "Menu"
    Quit = "Quit"


def prompt_on_end():
    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [choice.value for choice in OnEndChoice],
            "message": "Go to",
        }
    ]

    print()
    answers = prompt(questions)
    answer = answers["choices"]

    if answer == OnEndChoice.Quit.value:
        exit()
    elif answer == OnEndChoice.Menu.value:
        subprocess.run(["python3", "processing/processing/prompts/prompt_main.py"])
