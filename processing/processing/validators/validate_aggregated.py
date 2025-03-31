from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.printers.print_action import print_action


# TODO: This could have more depth
def validate_aggregated(action):
    def decorator(context: Context):
        if not AggregatedManager.exists(context):
            print_action("No aggregated data found in storage!", "error")
            return

        action(context)

    return decorator
