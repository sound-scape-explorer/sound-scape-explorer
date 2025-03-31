from processing.context import Context
from processing.printers.print_action import print_action


def validate_autoclusters(action):
    def decorator(context: Context):
        autoclusters = context.config.autoclusters

        if len(autoclusters) == 0:
            print_action("No autoclusters configured!", "warning")
            return

        action(context)

    return decorator
