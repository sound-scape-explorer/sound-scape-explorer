import collections
import pathlib
from datetime import datetime

from pandas import pandas

from processing.constants import AUDIO_SUFFIX, FEATURE_BASE, GENERATED_BASE, \
    OTHER_BASE, AUDIO_BASE


def digest_xtable_columns(xpath, xt, c_key, c_values=None, yield_type=None,
                          disable_prefix=False, allow_duplicate=False):
    if c_values is None:
        c_values = ''
    simple = False
    if type(c_values) == str:
        c_values = [c_values]
        simple = True

    if not disable_prefix:
        c_values = [c_key + '_' + c for c in c_values]

    types = []
    for c_val in c_values:
        if ':' in c_val:
            t = c_val.split(':')[1]
            types.append({
                             'I': int,
                             'D': lambda v: datetime.strptime(v, '%Y%m%d_%H%M'),
                             'L': lambda v: v.split(','),
                             'L-': lambda v: v.split('-'),
                             'L-D': lambda v: [
                                 datetime.strptime(vv, '%Y%m%d_%H%M') for vv in
                                 v.split('-')],
                         }[t])
        else:
            types.append(str)

    c_values = [c_val.split(':')[0] for c_val in c_values]

    for c in [c_key] + c_values:
        if c not in xt:
            print(xt.columns)
            raise Exception(f'In {xpath}, need a column named "{c}"')

    res = {}  # actually not as we yield
    for i in range(len(xt[c_key])):
        if type(xt[c_key][i]) == str:
            k = xt[c_key][i]
            if k in res and not allow_duplicate:
                raise Exception(
                    f'In {xpath}: column "{c_key}" contains "{k}" twice.')
            if simple:
                v = [types[ic](xt[c][i]) for ic, c in enumerate(c_values)]
                res[k] = v
                yield k, v[0]
            else:
                start = 0 if disable_prefix else len(c_key) + 1
                v = namedtuple_dic({c[start:]: types[ic](xt[c][i]) for ic, c in
                                    enumerate(c_values)}, yield_type)
                res[k] = v
                yield k, v


def namedtuple_dic(d, typename='new'):
    top = collections.namedtuple(typename, [i for i, j in d.items() if
                                            not i.startswith('_')])(
        *[j for i, j in d.items() if not i.startswith('_')])
    return top


def parse_config(path='config.xlsx', sheet=0):
    _xfile = pandas.ExcelFile(path)
    _xtable = _xfile.parse(sheet, converters={'variables_': str})
    _renaming = {i: i.split(' (')[0] for i in _xtable.columns if ' (' in i}
    _xtable.rename(_renaming, inplace=True, axis='columns', errors="raise")

    variables = dict(digest_xtable_columns(path, _xtable, 'variables'))

    if variables['audio_base'] == 'nan':
        variables['audio_base'] = AUDIO_BASE

    if variables['audio_suffix'] == 'nan':
        variables['audio_suffix'] = AUDIO_SUFFIX

    if variables['feature_base'] == 'nan':
        variables['feature_base'] = FEATURE_BASE

    if variables['generated_base'] == 'nan':
        variables['generated_base'] = GENERATED_BASE

    if variables['other_base'] == 'nan':
        variables['other_base'] = OTHER_BASE

    if variables['umap_random'] == 'nan':
        variables['umap_random'] = None

    bands = dict(digest_xtable_columns(path, _xtable, 'bands'))
    umaps = dict(digest_xtable_columns(path, _xtable, 'umaps',
                                       ['integration:I', 'bands:L', 'sites:L',
                                        'ranges:L'], 'UMAP'))
    ranges = dict(digest_xtable_columns(path, _xtable, 'ranges', ':L-D'))
    stringmap = dict(
        digest_xtable_columns(path, _xtable, 'stringmap', ['to', 'color'],
                              'STRINGMAP'))
    files = dict(digest_xtable_columns(path, _xtable, 'files',
                                       'site start:D tags:L'.split(' '),
                                       'FILE'))
    path = str(pathlib.Path(path).absolute())
    return namedtuple_dic(locals(), 'CFG')
