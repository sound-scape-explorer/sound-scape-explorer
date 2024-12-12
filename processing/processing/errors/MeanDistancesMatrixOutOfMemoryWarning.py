from rich import print

from processing.utils.print_action import print_action


class MeanDistancesMatrixOutOfMemoryWarning(Exception):
    def __init__(self, additional_message: str) -> None:
        message = "The mean distances matrix exceeds allowed memory allocation."
        print_action(message, "warning")
        print(additional_message)
