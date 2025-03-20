from processing.context import Context


def validate_digesters(action):
    """The digesters configuration objects validator."""

    def decorator(context: Context):
        digesters = context.config.digesters

        if len(digesters) == 0:
            return

        return action(context)

    return decorator
