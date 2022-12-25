from openpyxl.reader.excel import load_workbook


def open_excel_file(path: str):
    workbook = load_workbook(path)
    worksheet = workbook["Sheet1"]

    return workbook, worksheet
