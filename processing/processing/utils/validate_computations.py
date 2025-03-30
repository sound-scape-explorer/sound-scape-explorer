from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.utils.print_action import print_action


def validate_computations(action):
    def decorator(context: Context):
        if not ComputedManager.exists(context):
            print_action("No computations found in storage!", "error")
            return

        return action(context)

    return decorator
