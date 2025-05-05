from processing.context import Context
from processing.repositories.AutoclusteredRepository import AutoclusteredRepository
from processing.printers.print_action import print_action


def validate_autoclustered(action):
    def decorator(context: Context):
        if not AutoclusteredRepository.exists(context):
            print_action("No autocluster data found!", "error")
            return

        action(context)

    return decorator
