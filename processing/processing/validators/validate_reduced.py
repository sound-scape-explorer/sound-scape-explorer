from processing.context import Context
from processing.printers.print_action import print_action
from processing.repositories.ReductionRepository import ReductionRepository


def validate_reduced(action):
    def decorator(context: Context):
        if not ReductionRepository.exists(context):
            print_action("No reduction data found!", "error")
            return

        action(context)

    return decorator
