from processing.context import Context
from processing.new.ConfigManager import ConfigManager
from processing.utils.print_action import print_action


def validate_configuration(action):
    def decorator(context: Context):
        if not ConfigManager.exists(context):
            print_action("No configuration found in storage!", "error")
            return

        return action(context)

    return decorator
