from enum import Enum
from pathlib import Path
from typing import Optional

from pandas import DataFrame, ExcelFile

from processing.config.ExcelSheet import ExcelSheet


class ConfigParser:
    def __init__(self, path: str) -> None:
        self.path = self.validate(path)
        self.excel = ExcelFile(self.path)

    def validate(self, path: str) -> str:
        assert path is not None, "Please define a path"
        assert Path(path).exists(), f"Path {path} does not exist"
        return path

    def parse(self, sheet_name: ExcelSheet) -> DataFrame:
        return self.excel.parse(sheet_name.value)  # type: ignore

    def parse_column(
        self,
        sheet_name: ExcelSheet,
        column: Enum,
        suffix: Optional[str] = None,
    ):
        if suffix is not None:
            path = f"{column.value}{suffix}"
        else:
            path = column.value

        sheet = self.parse(sheet_name)
        series = sheet[path]
        list_ = [value for value in series]
        return list_
