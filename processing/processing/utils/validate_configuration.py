from processing.context import Context
from processing.new.ConfigManager import ConfigManager
from processing.utils.print_no_configuration import print_no_configuration


def validate_configuration(action):
    def decorator(context: Context):
        if not ConfigManager.exists(context):
            print_no_configuration()
            return

        return action(context)

    return decorator
