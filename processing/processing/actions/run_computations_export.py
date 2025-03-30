import numpy as np

from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.utils.ask_band import ask_band
from processing.utils.ask_extractor import ask_extractor
from processing.utils.ask_integration import ask_integration
from processing.utils.ask_npy_path import ask_npy_path
from processing.utils.print_action import print_action
from processing.utils.validate_mean_distances_matrix import (
    validate_mean_distances_matrix,
)


@validate_mean_distances_matrix
def run_computations_export(context: Context):
    print_action("Computation UMAPs export started!", "start")

    band = ask_band(context)
    integration = ask_integration(context)
    extractor = ask_extractor(context)
    path = ask_npy_path(context)

    computed = ComputedManager.from_storage(context, band, integration, extractor)
    unpacked = [np.array(d[:]) for d in computed]

    np.save(path, np.array(unpacked))

    print_action("Computation UMAPs export completed!", "end")
