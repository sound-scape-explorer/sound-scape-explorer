from InquirerPy import prompt
from rich import print

from processing.common.YamlEnv import YamlEnv


def ask_path_npy(env: YamlEnv) -> str:
    questions = [
        {
            "type": "input",
            "name": "filename",
            "message": "A .npy file will be created next to your storage file."
            " What should be its name?",
        },
    ]

    print()
    answers = prompt(questions)
    filename: str = str(answers["filename"])

    storage_filename = env.storage.split("/")[-1]

    if filename == "":
        filename = storage_filename

    path = env.storage.replace(storage_filename, f"{filename}.npy")
    return path
