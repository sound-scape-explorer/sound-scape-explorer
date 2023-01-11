import pathlib
from pathlib import Path

from pandas import pandas

from processing.errors.ExcelPathNotFoundError import ExcelPathNotFoundError


class Excel:
    path: str
    __sheet: int

    def __init__(
        self,
        path: str,
        sheet: int,
    ):
        self.path = path
        self.__sheet = sheet

        self.__verify_path()
        self.__load()
        self.__parse()
        self.__sanitize()

    def __verify_path(self):
        if not self.get_path_absolute().exists():
            raise ExcelPathNotFoundError(f'{self.get_path_absolute()}')

    def __load(self) -> None:
        self.__file = pandas.ExcelFile(self.path)

    def __parse(self) -> None:
        self.table = self.__file.parse(
            self.__sheet, converters={
                'variables_': str
            }
        )

    def __sanitize(self) -> None:
        columns_rename_map = {
            i: i.split(' (')[0]
            for i in self.table.columns if ' (' in i
        }

        self.table.rename(
            columns_rename_map,
            inplace=True,
            axis='columns',
            errors='raise',
        )

    def get_path(self):
        return self.path

    def get_path_absolute(self) -> Path:
        return pathlib.Path(self.path).absolute()
