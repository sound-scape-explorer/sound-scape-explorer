from processing.context import Context
from processing.printers.print_action import print_action
from processing.repositories.AutoclusterRepository import AutoclusterRepository


def validate_autoclustered(action):
    def decorator(context: Context):
        if not AutoclusterRepository.exists(context):
            print_action("No autocluster data found!", "error")
            return

        action(context)

    return decorator
