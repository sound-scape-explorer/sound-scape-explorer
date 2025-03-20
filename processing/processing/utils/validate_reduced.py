from processing.context import Context
from processing.new.ReducedManager import ReducedManager
from processing.utils.print_no_reduced import print_no_reduced


def validate_reduced(action):
    """The reduced data validator."""

    def decorator(context: Context):
        if not ReducedManager.exists(context):
            print_no_reduced()
            return

        action(context)

    return decorator
