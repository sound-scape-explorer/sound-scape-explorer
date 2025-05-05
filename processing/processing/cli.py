from processing.lib.cuda import disable_cuda
from processing.lib.logger import init_logger


disable_cuda()
init_logger()

import argparse
import os
import sys
from typing import NamedTuple

from rich import print

from processing.menu import menu


class _CliArguments(NamedTuple):
    config_path: str
    verbose: bool


def _register_python_path():
    current_path = os.getcwd()
    processing_path = os.path.join(current_path, "processing")

    if processing_path not in sys.path:
        sys.path.append(processing_path)


def _prepare():
    _register_python_path()

    from processing.resources.kaggle import set_kaggle_cache

    set_kaggle_cache()


def _parse_arguments():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "config_path",
        help="Path to configuration file",
    )

    parser.add_argument("-v", "--verbose", action="store_true")

    args = parser.parse_args()

    config_path: str = args.config_path
    verbose: bool = args.verbose

    return _CliArguments(
        config_path=config_path,
        verbose=verbose,
    )


def main():
    _prepare()
    args = _parse_arguments()
    menu(args.config_path)


def download():
    _prepare()

    from processing.resources.BirdNetResource import BirdNetResource
    from processing.resources.MusicClassifierResource import MusicClassifierResource
    from processing.resources.PerchResource import PerchResource
    from processing.resources.SurfPerchResource import SurfPerchResource
    from processing.resources.VggishResource import VggishResource
    from processing.resources.YamNetResource import YamNetResource

    VggishResource.download()
    PerchResource.download()
    SurfPerchResource.download()
    YamNetResource.download()
    BirdNetResource.download()
    MusicClassifierResource.download()

    print("[b]You are now ready for offline use![/b]")
