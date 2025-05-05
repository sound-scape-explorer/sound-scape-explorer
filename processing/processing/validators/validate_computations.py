from processing.context import Context
from processing.repositories.ComputedRepository import ComputedRepository
from processing.printers.print_action import print_action


def validate_computations(action):
    def decorator(context: Context):
        if not ComputedRepository.exists(context):
            print_action("No computations found!", "error")
            return

        return action(context)

    return decorator
