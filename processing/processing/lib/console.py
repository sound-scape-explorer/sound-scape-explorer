from enum import Enum
from typing import Callable

from rich import box
from rich.console import Console as RichConsole
from rich.panel import Panel
from rich.table import Table
from rich.text import Text

from processing.config.AutoclusterConfig import AutoclusterConfig
from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.ExtractorConfig import ExtractorConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.config.MetricConfig import MetricConfig
from processing.config.ReducerConfig import ReducerConfig
from processing.config.TrajectoryConfig import TrajectoryConfig
from processing.constants import STATE_MISSING, STATE_PRESENT, STATE_UNDEFINED, APP_NAME
from processing.context import Context
from processing.interfaces import ExtractionIteration, SiteIteration
from processing.lib.app import App
from processing.lib.time import convert_timestamp_to_date_string, format_milliseconds
from processing.services.SiteService import SiteWithFiles
from processing.services.TrajectoryService import TrajectoryGroups, TrajectoryService


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
    def print(*messages: str):
        _console.print()
        for message in messages:
            _console.print(message)

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

    @staticmethod
    def print_metrics(
        metrics: list[MetricConfig],
    ):
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Index")
        table.add_column("Digester")
        table.add_column("Is pairing")

        for metric in metrics:
            table.add_row(
                str(metric.index),
                metric.impl.name,
                "Yes" if metric.is_pairwise else "No",
            )

        _console.print(table)

    @staticmethod
    def print_trajectories(
        trajectories: list[TrajectoryConfig],
    ):
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("trajectory")
        table.add_column("start")
        table.add_column("end")
        table.add_column("tag name")
        table.add_column("tag value")
        table.add_column("smoothing window")

        for trajectory in trajectories:
            table.add_row(
                trajectory.name,
                convert_timestamp_to_date_string(trajectory.start),
                convert_timestamp_to_date_string(trajectory.end),
                trajectory.tag_name,
                trajectory.tag_value,
                format_milliseconds(trajectory.smoothing_window),
            )

        _console.print(table)

    @staticmethod
    def print_trajectory_groups(
        groups: TrajectoryGroups,
    ):
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Group index")
        table.add_column("Tag name")
        table.add_column("Tag value")
        table.add_column("Trajectory count")

        index = 1

        for ti in TrajectoryService.iterate_groups(groups):
            table.add_row(
                str(index),
                str(ti.tag_name),
                str(ti.tag_value),
                str(len(ti.trajectories)),
            )

            index += 1

        _console.print(table)

    @staticmethod
    def print_autoclusters(
        autoclusters: list[AutoclusterConfig],
    ):
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Autocluster")
        table.add_column("Min cluster size")
        table.add_column("Min samples")
        table.add_column("Alpha")
        table.add_column("Epsilon")

        for autocluster in autoclusters:
            table.add_row(
                autocluster.impl.name,
                str(autocluster.min_cluster_size),
                str(autocluster.min_samples),
                str(autocluster.alpha),
                str(autocluster.epsilon),
            )

        _console.print(table)

    # todo: not used?
    @staticmethod
    def print_extractors(
        extractors: list[ExtractorConfig],
    ):
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("index")
        table.add_column("extractor")
        table.add_column("window (ms)")
        table.add_column("hop (ms)")

        for extractor in extractors:
            table.add_row(
                str(extractor.index),
                extractor.impl.name,
                str(extractor.window),
                str(extractor.hop),
            )

        _console.print(table)

    @staticmethod
    def print_menu_legend():
        _console.print("State in storage:")
        _console.print(f"[red]{STATE_MISSING} Missing[/red]")
        _console.print(f"[green]{STATE_PRESENT} Present[/green]")
        _console.print(f"[white]{STATE_UNDEFINED} Not configured[/white]")
        _console.print()

        _console.print(
            "[yellow]"
            "⚠️ Remember to [b]Quit[/b] before loading file into the visualisation module"
            "[/yellow]"
        )
        _console.print()

    @staticmethod
    def print_mdm_oom_warning(*messages: str):
        base = f"The mean distances matrix exceeds the available RAM."
        Console.print_warning(base, *messages)

    @staticmethod
    def print_mdm_empty_warning(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        message = (
            f"Extraction {extraction.name}"
            f", band {band.name}"
            f", integration {integration.name}"
            f": Mean distances matrix is empty, skipping..."
        )

        Console.print_warning(message)

    @staticmethod
    def print_settings(context: Context):
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Setting")
        table.add_column("Value")

        for k, v in vars(context.config.settings).items():
            if k == "timeline_origin":
                v = convert_timestamp_to_date_string(v)

            if isinstance(v, Enum):
                v = v.name

            table.add_row(str(k), str(v))

        _console.print(table)

    # todo: not used?
    @staticmethod
    def print_reducers(reducers: list[ReducerConfig]):
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Index")
        table.add_column("Reducer")
        table.add_column("Dimensions")

        for reducer in reducers:
            table.add_row(
                str(reducer.index),
                reducer.impl.name,
                str(reducer.dimensions),
            )

        _console.print(table)

    @staticmethod
    def print_splash():
        version = App.get_version()

        _console.print(
            f"[green]"
            f"👋 Welcome to [bold]{APP_NAME}[/bold]"
            f" "
            f"[italic]v{version}[/italic]"
            f"[/green]"
        )
