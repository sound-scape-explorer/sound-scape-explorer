import os
from typing import List

from pandas import DataFrame, ExcelWriter
from rich import print

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.files.FileSheet import FileSheet


def append_to_config(config_path: str, paths: List[str]) -> None:
    folder_path = os.path.dirname(config_path)
    parser = ConfigParser(config_path, folder_path)
    filenames = parser.get(ExcelSheet.files, FileSheet.name_)

    files_to_append = [path for path in paths if path not in filenames]

    if len(files_to_append) == 0:
        print("No files to append")
        return

    with ExcelWriter(
        path=config_path,
        if_sheet_exists="overlay",
        mode="a",
    ) as writer:
        df = DataFrame([*filenames, *files_to_append], columns=[FileSheet.name_.value])
        df.to_excel(
            writer,
            sheet_name=ExcelSheet.files.value,
            index=False,
        )
        print(f"Files appended to config: {len(files_to_append)}")
