from processing.context import Context
from processing.lib.console import Console
from processing.repositories.ReductionRepository import ReductionRepository


def validate_reductions(action):
    def decorator(context: Context):
        if not ReductionRepository.exists(context):
            Console.print_error("No reduction data found")
            return

        action(context)

    return decorator
