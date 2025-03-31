import os

from InquirerPy.resolver import prompt
from rich import print

from processing.context import Context


def ask_path_csv(context: Context):
    config = context.config

    questions = [
        {
            "type": "input",
            "name": "filename",
            "message": "A .csv file will be created next to your storage file."
            " What should be its name?",
        },
    ]

    print()
    answers = prompt(questions)
    filename: str = str(answers["filename"])

    storage_filename = config.settings.storage_path.split(os.sep)[-1]

    if filename == "":
        filename = storage_filename

    path = config.settings.storage_path.replace(storage_filename, f"{filename}.csv")
    return path
