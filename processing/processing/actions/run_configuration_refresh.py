from processing.context import Context
from processing.new.ConfigManager import ConfigManager
from processing.printers.print_action import print_action


def run_configuration_refresh(context: Context, is_silent: bool = False):
    if not is_silent:
        print_action("Configuration refresh started!", "start")

    ConfigManager.to_storage(context)

    if not is_silent:
        print_action("Configuration refresh completed!", "end")
