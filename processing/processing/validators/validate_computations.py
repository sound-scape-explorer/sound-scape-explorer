from processing.context import Context
from processing.printers.print_action import print_action
from processing.repositories.ComputationRepository import ComputationRepository


def validate_computations(action):
    def decorator(context: Context):
        if not ComputationRepository.exists(context):
            print_action("No computations found!", "error")
            return

        return action(context)

    return decorator
