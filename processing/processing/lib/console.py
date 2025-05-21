from typing import Callable

from rich import box
from rich.console import Console as RichConsole
from rich.panel import Panel
from rich.text import Text

from processing.config.BandConfig import BandConfig
from processing.interfaces import ExtractionIteration, SiteIteration
from processing.services.SiteService import SiteWithFiles


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
    def print_error(*messages: str):
        message_string = " | ".join(messages)
        message = f"💥 {message_string}"

        panel = Console._to_panel(message, "bold red")
        _console.print()
        _console.print(panel)

    @staticmethod
    def print_warning(*messages: str):
        message_string = " | ".join(messages)
        message = f"⚠️ {message_string}"

        panel = Console._to_panel(message, "yellow")
        _console.print()
        _console.print(panel)

    @staticmethod
    def mute_outputs(func: Callable):
        def wrapper(*args, **kwargs):
            with _console.capture() as _:
                return func(*args, **kwargs)

        return wrapper

    @staticmethod
    def _get_site_info(site: SiteWithFiles):
        return f"Site: [bold cyan]{site.name}[/bold cyan] with {len(site.files)} files"

    @staticmethod
    def _get_band_info(band: BandConfig):
        return f"Band: [bold blue]#{band.index} {band.name}[/bold blue]"

    @staticmethod
    def print_extraction_iteration(ei: ExtractionIteration):
        site_info = Console._get_site_info(ei.site)
        extraction_info = f"Extraction: [bold yellow]#{ei.extraction.index} {ei.extraction.name}[/bold yellow]"
        extractor_info = f"Extractor: [bold magenta]#{ei.extractor.index} {ei.extractor.impl.value}[/bold magenta]"
        band_info = Console._get_band_info(ei.band)
        window_info = f"Window: [bold green]{ei.extractor.window} ms[/bold green]"
        hop_info = f"Hop: [bold green]{ei.extractor.hop} ms[/bold green]"

        _console.print("")
        _console.print(f"[bold]Extraction Iteration #{ei.i}[/bold]")
        _console.print(f"  {site_info}")
        _console.print(f"  {extraction_info}")
        _console.print(f"  {extractor_info}")
        _console.print(f"  {band_info}")
        _console.print(f"  {window_info}")
        _console.print(f"  {hop_info}")
        _console.print("")

    @staticmethod
    def print_site_iteration(si: SiteIteration):
        site_info = Console._get_site_info(si.site)
        band_info = Console._get_band_info(si.band)

        _console.print("")
        _console.print(f"[bold]Site Iteration #{si.i}[/bold]")
        _console.print(f"  {site_info}")
        _console.print(f"  {band_info}")
        _console.print("")
