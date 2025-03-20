from processing.context import Context
from processing.new.AutoclusteredManager import AutoclusteredManager
from processing.utils.print_no_autoclustered import print_no_autoclustered


def validate_autoclustered(action):
    """The autoclusters generated data validator."""

    def decorator(context: Context):
        if not AutoclusteredManager.exists(context):
            print_no_autoclustered()
            return

        action(context)

    return decorator
