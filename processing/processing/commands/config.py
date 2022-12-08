from processing.cli import cli
from processing.constants import EXCEL_COLUMNS
from processing.utils.close_excel_file import close_excel_file
from processing.utils.get_columns_from_disk import get_columns_from_disk
from processing.utils.get_config_audio_base_path import \
    get_config_audio_base_path
from processing.utils.open_excel_file import open_excel_file
from processing.utils.write_column_to_excel import write_column_to_excel


@cli.group()
def config():
    pass


@config.command()
def populate_columns():
    audio_base_path = get_config_audio_base_path()
    [_unique_columns, all_columns, columns_length] = get_columns_from_disk(
        audio_base_path
    )
    [workbook, worksheet] = open_excel_file("config.xlsx")

    for i in range(columns_length + 1):
        excel_column = EXCEL_COLUMNS[i]
        values = []

        for column in all_columns:
            values.append(column[i])

        write_column_to_excel(worksheet, values, excel_column)

    close_excel_file(workbook, "config.xlsx")
