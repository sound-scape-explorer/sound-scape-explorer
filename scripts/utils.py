
import collections
import pathlib
import pandas as pd
import subprocess
from datetime import datetime

def own_call(cmd, **kwargs):
    return subprocess.call(['_sse-'+cmd[0]] + cmd[1:], **kwargs)

def namedtuple_dic(d, typename='new'):
    top = collections.namedtuple(typename, [i for i,j in d.items() if not i.startswith('_')])(*[j for i,j in d.items() if not i.startswith('_')])
    return top

def digest_xtable_columns(xpath, xt, c_key, c_values=None, yield_type=None, disable_prefix=False, allow_duplicate=False):
    if c_values is None:
        c_values = ''
    simple = False
    if type(c_values) == str:
        c_values = [c_values]
        simple = True

    if not disable_prefix:
        c_values = [c_key+'_'+c for c in c_values]

    types = []
    for c_val in c_values:
        if ':' in c_val:
            t = c_val.split(':')[1]
            types.append({
                'I': int,
                'D': lambda v: datetime.strptime(v, '%Y%m%d_%H%M'),
                'L': lambda v: v.split(','),
                'L-': lambda v: v.split('-'),
                'L-D': lambda v: [datetime.strptime(vv, '%Y%m%d_%H%M') for vv in v.split('-')],
                }[t])
        else:
            types.append(str)

    c_values = [c_val.split(':')[0] for c_val in c_values]

    for c in [c_key] + c_values:
        if c not in xt:
            print(xt.columns)
            raise Exception(f'In {xpath}, need a column named "{c}"')

    res = {} # actually not as we yield
    for i in range(len(xt[c_key])):
        if type(xt[c_key][i]) == str:
            k = xt[c_key][i]
            if k in res and not allow_duplicate:
                raise Exception(f'In {xpath}: column "{c_key}" contains "{k}" twice.')
            if simple:
                v = [types[ic](xt[c][i]) for ic,c in enumerate(c_values)]
                res[k] = v
                yield k,v[0]
            else:
                start = 0 if disable_prefix else len(c_key)+1
                v = namedtuple_dic({c[start:]: types[ic](xt[c][i]) for ic,c in enumerate(c_values)}, yield_type)
                res[k] = v
                yield k,v

    

def parse_config(xlsx, sheet=0):
    _xfile = pd.ExcelFile(xlsx)
    _xtable = _xfile.parse(sheet, converters={'variables_': str})
    _renaming = {i: i.split(' (')[0] for i in _xtable.columns if ' (' in i}
    _xtable.rename(_renaming, inplace=True, axis='columns', errors="raise")
    
    variables = dict(digest_xtable_columns(xlsx, _xtable, 'variables'))
    bands = dict(digest_xtable_columns(xlsx, _xtable, 'bands'))
    umaps = dict(digest_xtable_columns(xlsx, _xtable, 'umaps', ['integration:I', 'bands:L', 'sites:L', 'ranges:L'], 'UMAP'))
    ranges = dict(digest_xtable_columns(xlsx, _xtable, 'ranges', ':L-D'))
    stringmap = dict(digest_xtable_columns(xlsx, _xtable, 'stringmap', ['to', 'color'], 'STRINGMAP'))
    files = dict(digest_xtable_columns(xlsx, _xtable, 'files', 'site start:D tags:L'.split(' '), 'FILE'))
    xlsx = str(pathlib.Path(xlsx).absolute())
    return namedtuple_dic(locals(), 'CFG')

def iterate_audio_files_with_bands(cfg, *more):
    esr = cfg.variables['audio_expected_sample_rate']
    for band,spec in cfg.bands.items():
        for r in iterate_audio_files(cfg, band, *more):
            yield [esr, band, spec] + r

def iterate_audio_files(cfg, prefix, *more):
    suffix = cfg.variables['audio_suffix']
    for fname,info in cfg.files.items():
        input_path = pathlib.Path(cfg.variables['audio_base']).joinpath(fname+suffix)
        res = [fname,info,input_path]
        for path, ext in more:
            p = pathlib.Path(cfg.variables[path[1:]] if path.startswith('@') else path)
            res.append(p.joinpath(prefix, fname+suffix).with_suffix(ext))
        yield res
