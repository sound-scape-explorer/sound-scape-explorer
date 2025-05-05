import os

from InquirerPy.resolver import prompt

from processing.context import Context


def prompt_npy_path(context: Context) -> str:
    questions = [
        {
            "type": "input",
            "name": "filename",
            "message": "A .npy file will be created next to your storage file."
            " What should be its name?",
        },
    ]

    answers = prompt(questions)
    filename: str = str(answers["filename"])

    storage_filename = context.config.settings.storage_path.split(os.sep)[-1]

    if filename == "":
        filename = storage_filename

    path = context.config.settings.storage_path.replace(
        storage_filename,
        f"{filename}.npy",
    )

    return path
