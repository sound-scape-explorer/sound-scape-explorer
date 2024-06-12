from processing.common.Interval import Interval
from processing.config.files.FileConfig import FileConfig
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date


class TimelineIntervalOverlapError(Exception):
    def __init__(
        self,
        existing_interval: Interval,
        new_file: FileConfig,
        existing_file: FileConfig,
    ) -> None:
        super().__init__(
            f"\n"
            f"Interval details:"
            f"\nstart: {convert_timestamp_to_date(existing_interval.start)}"
            f"\nend: {convert_timestamp_to_date(existing_interval.end)}"
            f"\n\n"
            f"Unable to add duplicate block for file #{new_file.index}:"
            f"\nname: {new_file.name}"
            f"\nsite: {new_file.site}"
            f"\nstart: {convert_timestamp_to_date(new_file.start)}"
            f"\nend: {convert_timestamp_to_date(new_file.end)}"
            f"\n\n"
            f"Overlap with file #{existing_file.index}:"
            f"\nname: {existing_file.name}"
            f"\nsite: {existing_file.site}"
            f"\nstart: {convert_timestamp_to_date(existing_file.start)}"
            f"\nend: {convert_timestamp_to_date(existing_file.end)}"
        )
