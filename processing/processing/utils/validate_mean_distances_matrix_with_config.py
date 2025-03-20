from processing.context import Context
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.utils.print_no_mean_distances_matrices import (
    print_no_mean_distances_matrices,
)


# TODO: refactor me
def validate_mean_distances_matrix_with_config(action):
    def decorator(context: Context):
        if not MeanDistancesMatrixManager.exists(context.storage):
            print_no_mean_distances_matrices()
            return

        return action(context)

    return decorator
