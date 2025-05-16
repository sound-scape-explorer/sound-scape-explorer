from processing.context import Context
from processing.repositories.ExtractionRepository import ExtractionRepository
from processing.printers.print_action import print_action


def validate_extracted(action):
    def decorator(context: Context):
        if not ExtractionRepository.exists(context):
            print_action("No extracted data found in storage!", "error")
            return

        action(context)

    return decorator
