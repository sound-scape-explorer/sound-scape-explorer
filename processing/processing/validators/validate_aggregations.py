from processing.context import Context
from processing.lib.console import Console
from processing.repositories.AggregationRepository import AggregationRepository


# TODO: This could have more depth
def validate_aggregations(action):
    def decorator(context: Context):
        if not AggregationRepository.exists(context):
            Console.print_error("No aggregations found in storage")
            return

        action(context)

    return decorator
