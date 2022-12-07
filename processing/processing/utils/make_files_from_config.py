from processing.constants import EXCEL_COLUMNS
from processing.utils.digest_xtable_columns import digest_xtable_columns
from processing.utils.get_config_columns import get_config_columns
from processing.utils.list_all_sites import list_all_sites


def make_files_from_config(path, table, audio_base):
    [unique_columns, _all_columns, columns_length] = get_config_columns(
        audio_base)

    files_selectors = ['site', 'start:D', 'tags:L']

    for i in range(columns_length + 1):
        files_selectors.append(f'{EXCEL_COLUMNS[i]}:COLUMN')

    files = dict(digest_xtable_columns(
        path,
        table,
        'files',
        files_selectors,
        'FILE'
    ))

    list_all_sites(files)

    return [files, unique_columns]
