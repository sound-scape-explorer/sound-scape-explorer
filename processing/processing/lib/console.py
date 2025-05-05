from typing import Callable

from rich import box
from rich.console import Console
from rich.panel import Panel
from rich.text import Text


console = Console()


def print_header(message: str, style="bold green"):
    message = f"🚀 {message}"
    console.print()
    console.print(Panel(Text(message, style=style), box=box.ROUNDED, expand=False))
    console.print()


def print_footer(message: str, style="bold green"):
    message = f"🎉 {message}"
    console.print()
    console.print(Panel(Text(message, style=style), box=box.ROUNDED, expand=False))
    console.print()


def mute_console_output(func: Callable):
    def wrapper(*args, **kwargs):
        with console.capture() as _:
            return func(*args, **kwargs)

    return wrapper
