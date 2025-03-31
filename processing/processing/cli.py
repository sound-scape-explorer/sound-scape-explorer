import argparse
import os
import platform
import sys

from processing.menu import menu


def _update_python_path():
    current_path = os.getcwd()

    if platform.system() == "Windows":
        processing_path = f"{current_path}\\processing"
    else:
        processing_path = f"{current_path}/processing"

    # Append `processing` path to PYTHONPATH
    if processing_path not in sys.path:
        sys.path.append(processing_path)


def _parse_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument("config_path", help="Path to configuration file")
    parser.add_argument("--debug", action="store_true", help="Enable debug mode")
    args = parser.parse_args()

    config_path: str = args.config_path
    is_debug: bool = args.debug

    return config_path, is_debug


def start_processing():
    _update_python_path()
    config_path, is_debug = _parse_arguments()
    menu(config_path, is_debug)


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
