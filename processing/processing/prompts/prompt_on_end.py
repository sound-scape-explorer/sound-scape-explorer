import subprocess

from PyInquirer import prompt


def prompt_on_end():
    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": ["Menu", "Quit"],
            "message": "Go to",
        }
    ]

    print()
    answers = prompt(questions)
    answer = answers["choices"]

    if answer == "Menu":
        subprocess.run(["python3", "processing/cli.py"])
