from pandas import pandas


class Excel:
    def __init__(self, path: str, sheet: int):
        self.path = path
        self.sheet = sheet

        self.file, self.table = self.__load(self.path, self.sheet)
        self.__rename()

    @staticmethod
    def __load(path, sheet):
        file = pandas.ExcelFile(path)
        table = file.parse(
            sheet, converters={
                'variables_': str
            }
        )

        return file, table

    def __rename(self):
        renaming = {
            i: i.split(' (')[0] for i in
            self.table.columns if ' (' in i
        }

        self.table.rename(
            renaming,
            inplace=True,
            axis='columns',
            errors='raise',
        )
