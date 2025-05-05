import numpy as np

from processing.context import Context
from processing.printers.print_action import print_action
from processing.prompts.prompt_band import prompt_band
from processing.prompts.prompt_extraction import prompt_extraction
from processing.prompts.prompt_integration import prompt_integration
from processing.prompts.prompt_npy_path import prompt_npy_path
from processing.repositories.ComputedRepository import ComputedRepository


def run_computations_export(context: Context):
    print_action("Computations export started!", "start")

    extraction = prompt_extraction(context)
    band = prompt_band(extraction)
    integration = prompt_integration(extraction)
    path = prompt_npy_path(context)

    computed = ComputedRepository.from_storage(
        context=context,
        extraction=extraction,
        band=band,
        integration=integration,
    )

    unpacked = [np.array(d[:]) for d in computed]
    np.save(path, np.array(unpacked))

    print_action("Computations export completed!", "end")
