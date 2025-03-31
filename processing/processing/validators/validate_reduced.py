from processing.context import Context
from processing.new.ReducedManager import ReducedManager
from processing.printers.print_action import print_action


def validate_reduced(action):
    def decorator(context: Context):
        if not ReducedManager.exists(context):
            print_action("No reduction data found!", "error")
            return

        action(context)

    return decorator
