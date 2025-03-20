from processing.context import Context
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.utils.print_no_mean_distances_matrices import (
    print_no_mean_distances_matrices,
)


def validate_mean_distances_matrix(action):
    def decorator(context: Context):
        if not MeanDistancesMatrixManager.exists(context.storage):
            print_no_mean_distances_matrices()
            return

        return action(context)

    return decorator
