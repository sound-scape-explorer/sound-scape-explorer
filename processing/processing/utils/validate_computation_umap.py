from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.utils.print_no_computation_umap import print_no_computation_umap


def validate_computation_umap(action):
    def decorator(context: Context):
        if not ComputedManager.exists(context):
            print_no_computation_umap()
            return

        return action(context)

    return decorator
