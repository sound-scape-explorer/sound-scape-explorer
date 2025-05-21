from typing import Callable

from rich import box
from rich.console import Console as RichConsole
from rich.panel import Panel
from rich.text import Text

from processing.interfaces import ExtractionIteration


_console = RichConsole()


class Console:
    console = _console

    @staticmethod
    def _to_panel(message: str, style="bold green"):
        return Panel(
            Text(message, style=style),
            box=box.ROUNDED,
            expand=False,
        )

    @staticmethod
    def print_header(message: str):
        message = f"🚀 {message}"

        panel = Console._to_panel(message)
        _console.print()
        _console.print(panel)

    @staticmethod
    def print_footer(*messages: str):
        message_string = " | ".join(messages)
        message = f"🎉 {message_string}"

        panel = Console._to_panel(message)
        _console.print()
        _console.print(panel)

    @staticmethod
    def mute_outputs(func: Callable):
        def wrapper(*args, **kwargs):
            with _console.capture() as _:
                return func(*args, **kwargs)

        return wrapper

    @staticmethod
    def print_extraction_iteration(ei: ExtractionIteration):
        site_info = f"Site: [bold cyan]{ei.site.name}[/bold cyan]"
        files_info = f"Files: [bold cyan]{len(ei.site.files)}[/bold cyan]"
        extraction_info = f"Extraction: [bold yellow]#{ei.extraction.index} {ei.extraction.name}[/bold yellow]"
        extractor_info = f"Extractor: [bold magenta]#{ei.extractor.index} {ei.extractor.impl.value}[/bold magenta]"
        band_info = f"Band: [bold blue]#{ei.band.index} {ei.band.name}[/bold blue]"
        window_info = f"Window: [bold green]{ei.extractor.window} ms[/bold green]"
        hop_info = f"Hop: [bold green]{ei.extractor.hop} ms[/bold green]"

        _console.print("")
        _console.print(f"[bold]Extraction Iteration #{ei.i}[/bold]")
        _console.print(f"  {site_info}")
        _console.print(f"  {files_info}")
        _console.print(f"  {extraction_info}")
        _console.print(f"  {extractor_info}")
        _console.print(f"  {band_info}")
        _console.print(f"  {window_info}")
        _console.print(f"  {hop_info}")
        _console.print("")
