from processing.context import Context
from processing.lib.console import Console
from processing.repositories.ExtractionRepository import ExtractionRepository


def validate_extractions(action):
    def decorator(context: Context):
        if not ExtractionRepository.exists(context):
            Console.print_error("No extracted data found in storage")
            return

        action(context)

    return decorator
