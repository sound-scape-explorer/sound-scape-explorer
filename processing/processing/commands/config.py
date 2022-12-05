import os

from processing.cli import cli
from processing.constants import EXCEL_COLUMNS
from processing.utils.add_unique_value_only_to_array import \
    add_unique_value_only_to_array
from processing.utils.check_or_create_index_in_array import \
    check_or_create_index_in_array
from processing.utils.close_excel_file import close_excel_file
from processing.utils.config.get_config import get_config
from processing.utils.get_columns import get_columns
from processing.utils.get_directories_and_files import get_directories_and_files
from processing.utils.open_excel_file import open_excel_file
from processing.utils.write_column_to_excel import write_column_to_excel


@cli.group()
def config():
    pass


@config.command()
def populate_columns():
    cwd = os.getcwd()
    cfg = get_config()

    audio_base = cfg.variables['audio_base']
    path = os.path.join(cwd, audio_base)

    [_directories, files] = get_directories_and_files(path)

    unique_columns = []
    all_columns = []
    columns_length = -1
    [workbook, worksheet] = open_excel_file("config.xlsx")

    for file in files:
        columns = get_columns(file)
        all_columns.append(columns)

        for c, column in enumerate(columns):
            check_or_create_index_in_array(unique_columns, c)
            add_unique_value_only_to_array(unique_columns[c], column)
            if c > columns_length:
                columns_length = c

    for i in range(columns_length + 1):
        excel_column = EXCEL_COLUMNS[i]
        values = []

        for column in all_columns:
            values.append(column[i])

        write_column_to_excel(worksheet, values, excel_column)

    close_excel_file(workbook, "config.xlsx")
