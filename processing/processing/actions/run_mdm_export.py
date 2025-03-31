import numpy as np

from processing.askers.ask_band import ask_band
from processing.askers.ask_extractor import ask_extractor
from processing.askers.ask_integration import ask_integration
from processing.askers.ask_path_npy import ask_path_npy
from processing.context import Context
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.printers.print_action import print_action
from processing.validators.validate_configuration import validate_configuration


@validate_configuration
def run_mdm_export(context: Context):
    print_action("Mean distances matrix export started!", "start")

    band = ask_band(context)
    integration = ask_integration(context)
    extractor = ask_extractor(context)

    mdm = MeanDistancesMatrixManager.from_storage(
        context.storage,
        band,
        integration,
        extractor,
    )

    npy_path = ask_path_npy(context)
    np.save(npy_path, mdm)

    print_action("Mean distances matrix export completed!", "end")
