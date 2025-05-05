from rich.progress import track

from processing.context import Context
from processing.interfaces import ExtractionIteration
from processing.lib.console import (
    console,
    print_header,
    print_footer,
)
from processing.managers.ExtractionManager import ExtractionManager
from processing.repositories.ExtractedRepository import ExtractedRepository


def print_extractions(ei: ExtractionIteration, extraction_count: int):
    site_info = f"Site: [bold cyan]{ei.site.name}[/bold cyan]"
    extraction_info = f"Extraction: [bold yellow]#{ei.extraction.index} {ei.extraction.name}[/bold yellow]"
    extractor_info = f"Extractor: [bold magenta]#{ei.extractor.index} {ei.extractor.impl.value}[/bold magenta]"
    band_info = f"Band: [bold blue]#{ei.band.index} {ei.band.name}[/bold blue]"
    window_info = f"Window: [bold green]{ei.extractor.window} ms[/bold green]"
    hop_info = f"Hop: [bold green]{ei.extractor.hop} ms[/bold green]"

    console.print(f"\n[bold]Extraction Iteration #{extraction_count}[/bold]")
    console.print(f"  {site_info}")
    console.print(f"  {extraction_info}")
    console.print(f"  {extractor_info}")
    console.print(f"  {band_info}")
    console.print(f"  {window_info}")
    console.print(f"  {hop_info}\n")


def run_extractions(context: Context):
    print_header("Extractions started")

    ExtractedRepository.delete(context)

    extraction_count = 0
    file_count = 0

    for ei in ExtractionManager.iterate(context):
        extraction_count += 1
        print_extractions(ei, extraction_count)

        for file in track(
            ei.site.files,
            description="Extracting files",
            console=console,
        ):
            file_count += 1
            raw = ei.ex.extract(file.absolute_path)
            extracted = ExtractedRepository.from_raw(raw, file, ei.extractor)
            ExtractedRepository.to_storage(
                context=context,
                extraction=ei.extraction,
                extractor=ei.extractor,
                extracted=extracted,
                band=ei.band,
            )

    print_footer(
        f"Extractions completed! | {extraction_count} extractions | {file_count} files processed"
    )
