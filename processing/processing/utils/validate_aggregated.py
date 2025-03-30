from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.utils.print_no_aggregated import print_no_aggregated


# TODO: This could have more depth
def validate_aggregated(action):
    """The aggregated data validator."""

    def decorator(context: Context):
        if not AggregatedManager.exists(context):
            print_no_aggregated()
            return

        action(context)

    return decorator
