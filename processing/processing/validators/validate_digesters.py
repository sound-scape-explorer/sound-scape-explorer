from processing.context import Context
from processing.printers.print_action import print_action


def validate_digesters(action):
    def decorator(context: Context):
        digesters = context.config.digesters

        if len(digesters) == 0:
            print_action("No digesters configured!", "warning")
            return

        return action(context)

    return decorator
