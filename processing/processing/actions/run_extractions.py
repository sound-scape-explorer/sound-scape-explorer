from rich.progress import track

from processing.context import Context
from processing.lib.console import Console
from processing.managers.ExtractionManager import ExtractionManager
from processing.repositories.ExtractionRepository import ExtractionRepository


def run_extractions(context: Context):
    Console.print_header("Extractions started")

    ExtractionRepository.delete(context)

    file_count = 0

    for ei in ExtractionManager.iterate(context):
        Console.print_extraction_iteration(ei)

        for file in track(
            ei.site.files,
            description="Extracting files",
            console=Console.console,
        ):
            file_count += 1
            raw = ei.ex.extract(file.absolute_path)
            extracted = ExtractionRepository.from_raw(raw, file, ei.extractor)
            ExtractionRepository.to_storage(
                context=context,
                extraction=ei.extraction,
                extractor=ei.extractor,
                extracted=extracted,
                band=ei.band,
            )

    Console.print_footer(
        f"Extractions completed",
        f"{file_count} files processed",
    )
