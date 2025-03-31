from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.printers.print_action import print_action


def validate_computations(action):
    def decorator(context: Context):
        if not ComputedManager.exists(context):
            print_action("No computations found!", "error")
            return

        return action(context)

    return decorator
