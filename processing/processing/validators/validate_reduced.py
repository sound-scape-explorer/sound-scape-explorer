from processing.context import Context
from processing.repositories.ReducedRepository import ReducedRepository
from processing.printers.print_action import print_action


def validate_reduced(action):
    def decorator(context: Context):
        if not ReducedRepository.exists(context):
            print_action("No reduction data found!", "error")
            return

        action(context)

    return decorator
