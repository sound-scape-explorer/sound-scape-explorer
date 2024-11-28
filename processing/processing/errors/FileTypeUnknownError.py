from processing.utils.print_action import print_action


class FileTypeUnknownError(Exception):
    def __init__(self) -> None:
        message = "File type is unknown"
        print_action(message, "error")
