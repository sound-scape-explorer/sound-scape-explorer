from PyInquirer import prompt
from rich import print

from processing.common.YamlEnv import YamlEnv


def ask_csv_path(env: YamlEnv) -> str:
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
    filename: str = answers["filename"]
    storage_filename = env.storage.split("/")[-1]
    path = env.storage.replace(storage_filename, f"{filename}.csv")
    return path
