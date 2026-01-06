from processing.context import Context
from processing.lib.console import Console
from processing.repositories.ComputationRepository import ComputationRepository


def validate_computations(action):
    def decorator(context: Context):
        if not ComputationRepository.exists(context):
            Console.print_error("No computations found")
            return

        return action(context)

    return decorator
