import argparse
import os
import platform
import sys

from processing.menu import menu
from processing.utils.append_to_config import append_to_config
from processing.utils.extract_config_from_storage import extract_config_from_storage
from processing.utils.prettify_exceptions import prettify_exceptions
from processing.utils.read_audio_path_from_config import read_audio_path_from_config
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


def parse_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument("config_path", help="Path to configuration file")
    parser.add_argument("--debug", action="store_true", help="Enable debug mode")
    args = parser.parse_args()

    config_path: str = args.config_path
    is_debug: bool = args.debug

    return config_path, is_debug


def start_processing():
    update_python_path()
    config_path, is_debug = parse_arguments()
    menu(config_path, is_debug)


# TODO: to remove
@prettify_exceptions
def extract_config():
    update_python_path()
    storage_path, _ = parse_arguments()
    extract_config_from_storage(storage_path)


# TODO: to remove
@prettify_exceptions
def fill_config():
    update_python_path()
    config_path, _ = parse_arguments()
    audio_path = read_audio_path_from_config(config_path)
    paths = walk_directory(audio_path)
    append_to_config(config_path, paths)


def download():
    """Download dictionaries for offline use"""

    from rich import print
    from torch import hub

    hub.load_state_dict_from_url(
        "https://github.com/harritaylor/torchvggish/"
        "releases/download/v0.1/vggish-10086976.pth",
        progress=True,
    )

    print("You are now ready for offline use!")
