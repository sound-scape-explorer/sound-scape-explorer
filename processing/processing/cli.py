from processing.actions.run_all import run_all
from processing.lib.logger import init_logger
from processing.utils.prettify_exceptions import prettify_exceptions

init_logger()

import argparse
import os
import sys
from typing import NamedTuple

from rich import print


class _CliArguments(NamedTuple):
    config_path: str
    memory_limit: int | None  # MB
    validate: bool
    auto: bool


def _register_python_path():
    current_path = os.getcwd()
    processing_path = os.path.join(current_path, "processing")

    if processing_path not in sys.path:
        sys.path.append(processing_path)


def _set_memory_limit(memory_limit: int):
    """Limit available RAM (Unix only, for testing/debugging)"""
    import platform

    if platform.system() != "Linux" and platform.system() != "Darwin":
        print(
            f"[dim yellow]Memory limiting only supported on Unix systems[/dim yellow]"
        )
        return

    try:
        import resource

        limit_bytes = memory_limit * 1024 * 1024
        resource.setrlimit(resource.RLIMIT_AS, (limit_bytes, limit_bytes))
        print(f"[yellow]Memory limit set to {memory_limit}MB[/yellow]")
    except (ValueError, OSError) as e:
        print(f"[yellow]Could not set memory limit: {e}[/yellow]")


def _prepare(memory_limit: int | None = None):
    if memory_limit:
        _set_memory_limit(memory_limit)

    _register_python_path()
    from processing.resources.kaggle import set_kaggle_cache

    set_kaggle_cache()


def _parse_arguments():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "config_path",
        help="Path to configuration file",
    )

    parser.add_argument(
        "-c",
        "--cpu",
        help="Disable GPUs and force TensorFlow to use CPU",
        action="store_true",
    )

    parser.add_argument(
        "-m",
        "--memory",
        type=int,
        help="Maximum RAM limit in MB (does not limit GPU VRAM)",
        default=None,
    )

    parser.add_argument(
        "--validate",
        help="Validate config and exit without entering interactive menu",
        action="store_true",
    )

    parser.add_argument(
        "--auto",
        help="Auto run all processing actions without interacting with the menu",
        action="store_true",
    )

    args = parser.parse_args()

    if args.cpu is True:
        os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

    return _CliArguments(
        config_path=args.config_path,
        memory_limit=args.memory,
        validate=args.validate,
        auto=args.auto,
    )


@prettify_exceptions
def main():
    args = _parse_arguments()
    _prepare(memory_limit=args.memory_limit)

    try:
        # user wants only JSON validation
        if args.validate:
            # Just validate config and print settings, then exit
            from processing.context import Context
            from processing.lib.console import Console

            context = Context(args.config_path)
            Console.print_splash()
            Console.print_settings(context)
            Console.print("[green]✓ Configuration valid[/green]")
            sys.exit(0)

        # user wants auto run all
        if args.auto:
            from processing.context import Context

            context = Context(args.config_path)
            run_all(context)
            sys.exit(0)

        from processing.menu import menu

        menu(args.config_path)

    except MemoryError:
        print("[red]ERROR: Memory limit exceeded![/red]")
        print(f"[yellow]Try increasing --memory above {args.memory_limit}MB[/yellow]")
        sys.exit(1)


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


def install_cuda():
    """Install CUDA support for TensorFlow (Linux/WSL2 only)"""
    import subprocess
    import sys

    subprocess.check_call(
        [
            sys.executable,
            "-m",
            "pip",
            "install",
            "tensorflow[and-cuda]",
        ]
    )
