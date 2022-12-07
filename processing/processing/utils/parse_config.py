import pathlib

from pandas import pandas

from processing.utils.digest_xtable_columns import digest_xtable_columns
from processing.utils.get_app_version import get_app_version
from processing.utils.make_files_from_config import make_files_from_config
from processing.utils.namedtuple_dic import namedtuple_dic
from processing.utils.populate_empty_config_variables import \
    populate_empty_config_variables


def parse_config(path='config.xlsx', sheet=0):
    _xfile = pandas.ExcelFile(path)
    _xtable = _xfile.parse(sheet, converters={'variables_': str})
    _renaming = {i: i.split(' (')[0] for i in _xtable.columns if ' (' in i}
    _xtable.rename(_renaming, inplace=True, axis='columns', errors="raise")

    variables = dict(digest_xtable_columns(path, _xtable, 'variables'))

    variables = populate_empty_config_variables(variables)

    [files, columns] = make_files_from_config(path, _xtable,
                                              variables['audio_base'])

    bands = dict(digest_xtable_columns(path, _xtable, 'bands'))

    umaps = dict(digest_xtable_columns(
        path,
        _xtable,
        'umaps',
        ['integration:I', 'bands:L', 'sites:SITES', 'ranges:L'],
        'UMAP'
    ))

    ranges = dict(digest_xtable_columns(path, _xtable, 'ranges', ':L-D'))

    stringmap = dict(digest_xtable_columns(
        path,
        _xtable,
        'stringmap',
        ['to', 'color'],
        'STRINGMAP'
    ))

    path = str(pathlib.Path(path).absolute())

    app_version = get_app_version()

    return namedtuple_dic(locals(), 'CFG')
