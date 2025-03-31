from processing.printers.print_action import print_action


class MeanDistancesMatrixOutOfMemoryWarning(Exception):
    def __init__(self, shape: str, additional_message: str) -> None:
        message = f"The mean distances matrix {shape} exceeds the available RAM."
        print_action(message, "warning")
        print_action(additional_message, "warning")
