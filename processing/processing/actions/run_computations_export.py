import numpy as np

from processing.askers.ask_band import ask_band
from processing.askers.ask_extractor import ask_extractor
from processing.askers.ask_integration import ask_integration
from processing.askers.ask_path_npy import ask_path_npy
from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.printers.print_action import print_action
from processing.validators.validate_mean_distances_matrix import (
    validate_mean_distances_matrix,
)


@validate_mean_distances_matrix
def run_computations_export(context: Context):
    print_action("Computation UMAPs export started!", "start")

    band = ask_band(context)
    integration = ask_integration(context)
    extractor = ask_extractor(context)
    path = ask_path_npy(context)

    computed = ComputedManager.from_storage(context, band, integration, extractor)
    unpacked = [np.array(d[:]) for d in computed]

    np.save(path, np.array(unpacked))

    print_action("Computation UMAPs export completed!", "end")
