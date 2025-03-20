from processing.context import Context
from processing.utils.print_no_autoclusters import print_no_autoclusters


def validate_autoclusters(action):
    """The autoclusters configuration objects validator."""

    def decorator(context: Context):
        autoclusters = context.config.autoclusters

        if len(autoclusters) == 0:
            print_no_autoclusters()
            return

        action(context)

    return decorator
