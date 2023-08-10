import subprocess
from dataclasses import dataclass

import yaml
from joblib.memory import pathlib
from PyInquirer import prompt
from rich import print
from yaml.loader import SafeLoader


@dataclass
class YamlEnv:
    config: str
    storage: str


def does_path_exists(path: str):
    return pathlib.Path(path).exists()


def get_yaml_data():
    file = open("sse.yaml")
    data = yaml.load(file, Loader=SafeLoader)
    file.close()

    config = data["config"]
    assert does_path_exists(config) is True, "Config file does not exist."

    storage = data["storage"]
    return YamlEnv(config=config, storage=storage)


def main():
    env = get_yaml_data()
    print(env)

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

    answers = prompt(questions)
    answer = answers["choices"]
    command = actions[answer]
    subprocess.run(command)


if __name__ == "__main__":
    main()
