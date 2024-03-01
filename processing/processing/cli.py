import argparse
import os
import platform
import subprocess
import sys
from distutils.spawn import find_executable

from processing.main import main
from processing.utils.append_to_config import append_to_config
from processing.utils.extract_config_from_storage import extract_config_from_storage
from processing.utils.read_audio_path_from_config import read_audio_path_from_config
from processing.utils.trim_quotes_if_needed import trim_quotes_if_needed
from processing.utils.walk_directory import walk_directory


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


def start_visualisation():
    update_python_path()
    config_path = parse_arguments()

    # parse config
    audio_path = read_audio_path_from_config(config_path)

    # navigate to app root directory
    venv_path = sys.exec_prefix
    os.chdir(venv_path)
    os.chdir("..")

    # get paths
    ffmpeg_path = find_executable("ffmpeg")
    ffprobe_path = find_executable("ffprobe")
    audio_path = trim_quotes_if_needed(audio_path)

    # create commands
    audio_command = ["pnpm", "audio", ffmpeg_path, ffprobe_path, audio_path]
    front_command = ["pnpm", "front"]

    # spawn
    audio_process = subprocess.Popen(audio_command)
    front_process = subprocess.Popen(front_command)

    audio_process.wait()
    front_process.wait()


def extract_config():
    update_python_path()
    storage_path = parse_arguments()
    extract_config_from_storage(storage_path)


def start_fill():
    update_python_path()
    config_path = parse_arguments()
    audio_path = read_audio_path_from_config(config_path)
    paths = walk_directory(audio_path)
    append_to_config(config_path, paths)


def start_audio():
    update_python_path()
    config_path = parse_arguments()

    # parse config
    audio_path = read_audio_path_from_config(config_path)

    # navigate to app root directory
    venv_path = sys.exec_prefix
    os.chdir(venv_path)
    os.chdir("..")

    # spawn audio and front modules
    if platform.system() == "Windows":
        audio_path = trim_quotes_if_needed(audio_path)
        audio_command = ["pnpm", "audio", audio_path]
        audio_process = subprocess.Popen(audio_command)
        audio_process.wait()
    else:
        command = ["pnpm", "audio", audio_path]
        subprocess.run(command)
