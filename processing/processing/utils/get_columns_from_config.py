from processing.constants import EXCEL_COLUMNS
from processing.utils.close_excel_file import close_excel_file
from processing.utils.open_excel_file import open_excel_file


def get_columns_from_config():
    path = 'config.xlsx'

    workbook, _worksheet = open_excel_file(path)
    sheet_ranges = workbook['Sheet1']
    close_excel_file(workbook, path)

    payload = []

    for i in range(len(EXCEL_COLUMNS)):
        value = sheet_ranges[f'{EXCEL_COLUMNS[i]}1'].value

        if value is None:
            break

        # trim `files_`
        value = value.split('_')[1:][0]

        payload.append(value)

    return payload
