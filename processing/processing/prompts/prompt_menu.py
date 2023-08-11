import subprocess
from enum import Enum

from PyInquirer import prompt

from processing.common.YamlEnv import YamlEnv


class MenuChoice(Enum):
    RefreshConfig = "Refresh configuration"
    ExtractAggregate = "Extract and aggregate"
    Repack = "Repack with `h5repack`"
    Quit = "Quit"


def prompt_menu(env: YamlEnv):
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

    if answer == MenuChoice.Quit.value:
        exit()
    elif answer == MenuChoice.RefreshConfig.value:
        subprocess.run(
            [
                "python3",
                "processing/processing/actions/run_config.py",
                "--config",
                env.config,
                "--storage",
                env.storage,
            ]
        )
    elif answer == MenuChoice.ExtractAggregate.value:
        subprocess.run(
            [
                "python3",
                "processing/processing/actions/run_extractions.py",
                "--config",
                env.config,
                "--storage",
                env.storage,
            ]
        )
    elif answer == MenuChoice.Repack.value:
        subprocess.run(
            [
                "h5repack",
                env.storage,
                f"{env.storage.replace('.h5', '.repack.h5')}",
            ]
        )
        prompt_menu(env)
