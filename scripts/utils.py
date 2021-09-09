
import collections
import pathlib
import pandas as pd
import subprocess

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
    
    for c in [c_key] + c_values:
        if c not in xt:
            print(xt.columns)
            raise Exception(f'In {xpath}, need a column named "{c}"')

    res = {} # actually not as we yield
    for i in range(len(xt[c_key])):
        if type(xt[c_key][i]) == str:
            k = xt[c_key][i]
            if k in res and not allow_duplicate:
                raise Exception(f'In {xpath}: column "variables" contains "{k}" twice.')
            if simple:
                v = [xt[c][i] for c in c_values]
                res[k] = v
                yield k,v[0]
            else:
                v = namedtuple_dic({c[len(c_key)+1:]: xt[c][i] for c in c_values}, yield_type)
                res[k] = v
                yield k,v

    

def parse_config(xlsx='config.xlsx', sheet=0):
    _xfile = pd.ExcelFile(xlsx)
    _xtable = _xfile.parse(sheet, converters={'variables_': str})
    _renaming = {i: i.split(' (')[0] for i in _xtable.columns if ' (' in i}
    _xtable.rename(_renaming, inplace=True, axis='columns', errors="raise")
    
    variables = dict(digest_xtable_columns(xlsx, _xtable, 'variables'))
    bands = dict(digest_xtable_columns(xlsx, _xtable, 'bands'))
    timeranges = dict(digest_xtable_columns(xlsx, _xtable, 'timeranges'))
    stringmap = dict(digest_xtable_columns(xlsx, _xtable, 'stringmap', 'to'))
    files = dict(digest_xtable_columns(xlsx, _xtable, 'files', 'location datetime tags'.split(' '), 'FILE'))
    xlsx = str(pathlib.Path(xlsx).absolute())
    return namedtuple_dic(locals(), 'CFG')


def iterate_audio_files(cfg, *more):
    suffix = cfg.variables['audio_suffix']
    esr = cfg.variables['audio_expected_sample_rate']
    for band,spec in cfg.bands.items():
        for fname,info in cfg.files.items():
            input_path = pathlib.Path(cfg.variables['audio_base']).joinpath(fname+suffix)
            res = [esr,band,spec,fname,info,input_path]
            for path, ext in more:
                p = pathlib.Path(cfg.variables[path[1:]] if path.startswith('@') else path)
                res.append(p.joinpath(band, fname+suffix).with_suffix(ext))
            yield res
