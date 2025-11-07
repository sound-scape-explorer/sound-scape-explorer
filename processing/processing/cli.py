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
    memory_limit: int | None  # MB


def _register_python_path():
    current_path = os.getcwd()
    processing_path = os.path.join(current_path, "processing")

    if processing_path not in sys.path:
        sys.path.append(processing_path)


def _set_memory_limit(max_memory_mb: int):
    """Limit available RAM for the whole process (for testing/debugging)"""
    import resource

    limit_bytes = max_memory_mb * 1024 * 1024
    resource.setrlimit(resource.RLIMIT_AS, (limit_bytes, limit_bytes))
    print(f"[yellow]Memory limit set to {max_memory_mb}MB[/yellow]")


def _prepare(
    max_memory: int | None = None,
):
    if max_memory:
        _set_memory_limit(max_memory)

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

    parser.add_argument(
        "-m",
        "--memory",
        type=int,
        help="Maximum memory limit in MB (for testing/debugging)",
        default=None,
    )

    args = parser.parse_args()

    return _CliArguments(
        config_path=args.config_path,
        verbose=args.verbose,
        memory_limit=args.memory,
    )


def main():
    args = _parse_arguments()
    _prepare(max_memory=args.memory_limit)
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
