from processing.classes.Filepaths import Filepaths
from processing.cli import cli
from processing.constants import EXCEL_COLUMNS
from processing.utils.close_excel_file import close_excel_file
from processing.utils.get_columns_from_config import get_columns_from_config
from processing.utils.get_columns_from_disk import get_columns_from_disk
from processing.utils.get_config_audio_base_path import \
    get_config_audio_base_path
from processing.utils.open_excel_file import open_excel_file
from processing.utils.write_column_to_excel import write_column_to_excel


@cli.group()
def config():
    # cli group
    pass


@config.command()
def populate_files():
    filepaths = Filepaths()
    filenames = filepaths.get_filenames()
    dates = filepaths.get_times_as_dates()
    path = 'config.xlsx'

    workbook, worksheet = open_excel_file(path)
    write_column_to_excel(worksheet, filenames, 'T', 'files')
    write_column_to_excel(worksheet, dates, 'V', 'files_start')
    close_excel_file(workbook, path)


@config.command()
def populate_columns():
    audio_base_path = get_config_audio_base_path()

    all_columns, _unique_columns, columns_length = get_columns_from_disk(
        audio_base_path
    )

    workbook, worksheet = open_excel_file("config.xlsx")

    for i in range(columns_length):
        excel_column = EXCEL_COLUMNS[i]
        columns = get_columns_from_config()

        values = []

        for column in all_columns:
            values.append(column[i])

        write_column_to_excel(
            worksheet,
            values,
            excel_column,
            f'files_{columns[i]}'
        )

    close_excel_file(workbook, "config.xlsx")
