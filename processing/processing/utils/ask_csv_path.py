from InquirerPy.resolver import prompt
from rich import print

from processing.config.Config import Config


def ask_csv_path(config: Config) -> str:
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

    storage_filename = config.settings.storage_path.split("/")[-1]

    if filename == "":
        filename = storage_filename

    path = config.settings.storage_path.replace(storage_filename, f"{filename}.csv")
    return path
