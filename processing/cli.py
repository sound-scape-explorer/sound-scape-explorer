import subprocess

import yaml
from joblib.memory import pathlib
from PyInquirer import prompt
from rich.console import Console
from rich.table import Table
from yaml.loader import SafeLoader

from processing.common.YamlEnv import YamlEnv


def does_path_exists(path: str):
    return pathlib.Path(path).exists()


def get_yaml_data():
    file = open("sse.yaml")
    data = yaml.load(file, Loader=SafeLoader)
    file.close()

    config = data["config"]
    assert does_path_exists(config) is True, "Config file does not exist."

    storage = data["storage"]
    env = YamlEnv(config=config, storage=storage)

    return env


def main():
    env = get_yaml_data()

    console = Console()
    table = Table(show_header=True, header_style="bold magenta")

    table.add_column("File")
    table.add_column("Path")

    table.add_row("config", env.config)
    table.add_row("storage", env.storage)

    console.print(table)

    actions = {
        "Refresh configuration": [
            "python3",
            "processing/processing/actions/run_config.py",
            "--config",
            env.config,
            "--storage",
            env.storage,
        ],
        "Run extractions and aggregations": [
            "python3",
            "processing/processing/actions/run_extractions.py",
            "--config",
            env.config,
            "--storage",
            env.storage,
        ],
        "Repack with `h5repack`": [
            "h5repack",
            env.storage,
            f"{env.storage.replace('.h5', '.repack.h5')}",
        ],
    }

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [a for a in actions.keys()],
            "message": "Choose your action",
        }
    ]

    print()
    answers = prompt(questions)
    answer = answers["choices"]
    command = actions[answer]
    subprocess.run(command)


if __name__ == "__main__":
    main()
