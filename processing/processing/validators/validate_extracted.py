from processing.context import Context
from processing.repositories.ExtractedRepository import ExtractedRepository
from processing.printers.print_action import print_action


def validate_extracted(action):
    def decorator(context: Context):
        if not ExtractedRepository.exists(context):
            print_action("No extracted data found in storage!", "error")
            return

        action(context)

    return decorator
