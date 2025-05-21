import numpy as np

from processing.context import Context
from processing.lib.console import Console
from processing.prompts.prompt_band import prompt_band
from processing.prompts.prompt_extraction import prompt_extraction
from processing.prompts.prompt_integration import prompt_integration
from processing.prompts.prompt_npy_path import prompt_npy_path
from processing.repositories.ComputationRepository import ComputationRepository


def run_computations_export(context: Context):
    Console.print_header("Computations export started")

    extraction = prompt_extraction(context)
    band = prompt_band(extraction)
    integration = prompt_integration(extraction)
    path = prompt_npy_path(context)

    computations = ComputationRepository.from_storage(
        context=context,
        extraction=extraction,
        band=band,
        integration=integration,
    )

    unpacked = [np.array(d[:]) for d in computations]
    np.save(path, np.array(unpacked))

    Console.print_footer("Computations export completed")
