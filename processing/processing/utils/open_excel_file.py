import openpyxl


def open_excel_file(path: str):
    workbook = openpyxl.load_workbook(path)
    worksheet = workbook["Sheet1"]

    return [workbook, worksheet]
