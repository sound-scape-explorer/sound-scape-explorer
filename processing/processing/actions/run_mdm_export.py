import numpy as np

from processing.context import Context
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.utils.ask_band import ask_band
from processing.utils.ask_extractor import ask_extractor
from processing.utils.ask_integration import ask_integration
from processing.utils.ask_npy_path import ask_npy_path
from processing.utils.print_action import print_action
from processing.utils.validate_configuration import validate_configuration


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

    npy_path = ask_npy_path(context)
    np.save(npy_path, mdm)

    print_action("Mean distances matrix export completed!", "end")
