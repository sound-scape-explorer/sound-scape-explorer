import numpy as np

from processing.context import Context
from processing.lib.console import Console
from processing.prompts.prompt_band import prompt_band
from processing.prompts.prompt_extraction import prompt_extraction
from processing.prompts.prompt_integration import prompt_integration
from processing.prompts.prompt_npy_path import prompt_npy_path
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)


def run_mdm_export(context: Context):
    Console.print_header("Mean distances matrix export started")

    extraction = prompt_extraction(context)
    band = prompt_band(extraction)
    integration = prompt_integration(extraction)

    mdm = MeanDistancesMatrixRepository.from_storage(
        context=context,
        extraction=extraction,
        band=band,
        integration=integration,
    )

    npy_path = prompt_npy_path(context)
    np.save(npy_path, mdm)

    Console.print_footer("Mean distances matrix export completed")
