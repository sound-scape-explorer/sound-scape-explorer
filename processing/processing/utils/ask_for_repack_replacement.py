from InquirerPy.resolver import prompt
from rich import print


def ask_for_repack_replacement() -> bool:
    questions = [
        {
            "type": "confirm",
            "message": "Do you want to replace your old storage file?",
            "name": "replace",
            "default": False,
        },
    ]

    print()
    answers = prompt(questions)
    answer: bool = bool(answers["replace"])
    return answer
