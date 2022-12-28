from typing import List

from openpyxl.reader.excel import load_workbook
from openpyxl.utils import get_column_letter


class ExcelOpen:
    meta_titles: List[str]

    def __init__(self, path: str):
        self.__path = path

        self.__open()
        self.__get_columns()
        self.__get_meta_titles()
        self.__close()

    def __open(self):
        self.__workbook = load_workbook(self.__path)
        self.__worksheet = self.__workbook["Sheet1"]

    def __close(self):
        self.__workbook.save(self.__path)

    def __get_columns(self):
        self.columns = {
            cell.value: {
                'letter': get_column_letter(cell.column),
                'number': cell.column - 1
            } for cell in self.__worksheet[1] if cell.value
        }

    def __get_meta_titles(self):
        self.meta_titles = []

        for column_key in self.columns.keys():
            if 'files' not in column_key:
                continue
            if 'files_start' in column_key:
                continue
            if 'files_tags' in column_key:
                continue
            if 'files_site' in column_key:
                continue
            if column_key == 'files':
                continue

            # trim `files_`
            meta_title = column_key.split('_')[1:][0]
            self.meta_titles.append(meta_title)
