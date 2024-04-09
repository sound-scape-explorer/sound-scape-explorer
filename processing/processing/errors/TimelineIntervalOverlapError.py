from processing.config.files.FileConfig import FileConfig


class TimelineIntervalOverlapError(Exception):
    def __init__(self, new_file: FileConfig, existing_file: FileConfig) -> None:
        super().__init__(
            f"Unable to add duplicate file #{new_file.index}."
            f" Interval overlapping with file #{existing_file.index}."
        )
