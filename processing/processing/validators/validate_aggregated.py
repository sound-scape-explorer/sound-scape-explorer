from processing.context import Context
from processing.printers.print_action import print_action
from processing.repositories.AggregationRepository import AggregationRepository


# TODO: This could have more depth
def validate_aggregated(action):
    def decorator(context: Context):
        if not AggregationRepository.exists(context):
            print_action("No aggregated data found in storage!", "error")
            return

        action(context)

    return decorator
