from processing.utils.digest_xtable_columns import digest_xtable_columns
from processing.utils.get_columns_from_config import get_columns_from_config
from processing.utils.get_columns_from_disk import get_columns_from_disk
from processing.utils.list_all_sites import list_all_sites


def make_files_from_config(path, table, audio_base):
    [unique_columns, _all_columns, columns_length] = get_columns_from_disk(
        audio_base)

    files_selectors = ['site', 'start:D', 'tags:L']

    columns = get_columns_from_config()

    for i in range(columns_length + 1):
        files_selectors.append(f'{columns[i]}:COLUMN')

    files = dict(digest_xtable_columns(
        path,
        table,
        'files',
        files_selectors,
        'FILE'
    ))

    list_all_sites(files)

    return [files, unique_columns]
