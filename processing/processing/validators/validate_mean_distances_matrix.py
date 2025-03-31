from processing.context import Context
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.printers.print_action import print_action


def validate_mean_distances_matrix(action):
    def decorator(context: Context):
        if not MeanDistancesMatrixManager.exists(context.storage):
            print_action("No mean distances matrices found!", "error")
            return

        return action(context)

    return decorator
