import argparse
import os
import platform
import subprocess
import sys

from processing.main import main
from processing.utils.extract_config_from_storage import extract_config_from_storage
from processing.utils.read_audio_path_from_config import read_audio_path_from_config


def update_python_path():
    current_path = os.getcwd()

    if platform.system() == "Windows":
        processing_path = f"{current_path}\\processing"
    else:
        processing_path = f"{current_path}/processing"

    # Append `processing` path to PYTHONPATH
    if processing_path not in sys.path:
        sys.path.append(processing_path)


def parse_arguments() -> str:
    parser = argparse.ArgumentParser()
    parser.add_argument("config_path")
    args = parser.parse_args()
    return args.config_path


def start_processing():
    update_python_path()
    config_path = parse_arguments()

    main(config_path=config_path)


def start_front():
    update_python_path()
    config_path = parse_arguments()

    # Parse config
    audio_path = read_audio_path_from_config(config_path)

    # Navigate to SSE root directory
    venv_path = sys.exec_prefix
    os.chdir(venv_path)
    os.chdir("..")

    # Spawn audio and front modules
    if platform.system() == "Windows":
        subprocess.run(
            [
                "pnpm",
                "audio:front:windows",
                audio_path,
            ],
            shell=True,
        )
    else:
        subprocess.run(
            [
                "pnpm",
                "audio:front",
                audio_path,
            ],
        )


def extract_config():
    update_python_path()
    storage_path = parse_arguments()
    extract_config_from_storage(storage_path)