from processing.context import Context
from processing.new.ConfigManager import ConfigManager
from processing.utils.print_action import print_action


def run_configuration_refresh(context: Context):
    print_action("Configuration refresh started!", "start")
    ConfigManager.to_storage(context)
    print_action("Configuration refresh completed!", "end")
