from openpyxl.reader.excel import load_workbook

from processing.constants import EXCEL_COLUMNS


class ExcelOpen:
    def __init__(self, path: str):
        self.__path = path

        self.__open()
        self.__read_columns()
        self.__close()

    def __open(self):
        self.__workbook = load_workbook(self.__path)
        self.__worksheet = self.__workbook["Sheet1"]

    def __close(self):
        self.__workbook.save(self.__path)

    def __read_columns(self):
        payload = []

        for i in range(len(EXCEL_COLUMNS)):
            value = self.__worksheet[f'{EXCEL_COLUMNS[i]}1'].value

            if value is None:
                break

            # trim `files_`
            value = value.split('_')[1:][0]

            payload.append(value)

        self.columns = payload
