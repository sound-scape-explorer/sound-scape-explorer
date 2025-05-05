from processing.context import Context
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.printers.print_action import print_action


# TODO: This could have more depth
def validate_aggregated(action):
    def decorator(context: Context):
        if not AggregatedRepository.exists(context):
            print_action("No aggregated data found in storage!", "error")
            return

        action(context)

    return decorator
