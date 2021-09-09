
import click
from click import echo
from click import secho
import utils
from utils import own_call
import subprocess
import pprint
from json import dumps as json_dumps
import pathlib

import gzip
import pickle
import numpy as np

##############
@click.group()
def cli():
    pass
##############


###### standalone commands
@cli.command()
def test():
    print('test (toplevel)')

@cli.command()
@click.option('--json/--dict', default=False)
def show_config(json):
    cfg = get_config()
    if json:
        print(json_dumps(cfg._asdict()))
    else:
        pprint.pprint(cfg._asdict())

###### COMMAND extract
@cli.group()
def extract():
    pass

@extract.command()
@click.option('--file', '-f', default=None)
@click.option('--start', '-s', '-ss', default=None)
@click.option('--duration', '-dur', '-t', default=None)
@click.option('--no-ffmpeg', '--ffmpeg', default=False)
def preview(file, start, duration, no_ffmpeg):
    cfg = get_config()
    suffix = cfg.variables['audio_suffix']
    expected_sr = cfg.variables['audio_expected_sample_rate']
    start_sec = cfg.variables.get('preview_file_start', '0') if start is None else start
    dur_sec = cfg.variables.get('preview_file_dur', '10') if duration is None else duration
    fname = cfg.variables['preview_file'] if file is None else file
    for band,spec in cfg.bands.items():
        input_path = pathlib.Path(cfg.variables['audio_base']).joinpath(fname+suffix)
        output_path = pathlib.Path(cfg.variables['generated_base']).joinpath('preview-spectrogram', band+'.png')
        own_call(['preview-features', input_path, output_path, spec, expected_sr, start_sec, dur_sec])
    if not no_ffmpeg:
        print('... generating wav extracts, use --no-ffmpeg to skip in case of error')
        output_path = pathlib.Path(cfg.variables['generated_base']).joinpath('preview-audio', 'normal.wav')
        output_path.parent.mkdir(parents=True, exist_ok=True)
        subprocess.call(['ffmpeg', '-loglevel', 'error', '-ss', start_sec, '-t', dur_sec, '-i', input_path, output_path])
        output_path = pathlib.Path(cfg.variables['generated_base']).joinpath('preview-audio', 'hzdiv10.wav')
        subprocess.call(['ffmpeg', '-loglevel', 'error', '-ss', start_sec, '-t', dur_sec, '-i', input_path, '-af', f'asetrate={expected_sr}*.1,aresample={expected_sr},atempo=1/.1', output_path])

@extract.command()
def band_freqs():
    cfg = get_config()
    expected_sr = cfg.variables['audio_expected_sample_rate']
    for band,spec in cfg.bands.items():
        own_call(['band-freqs', expected_sr, spec, band])

@extract.command()
@click.option('--force/--no-force', '-f', default=False)
@click.option('--skip-existing/--no-skip-existing', '-s', default=False)
def all(force, skip_existing):
    cfg = get_config()
    for esr,band,spec,fname,info,input_path,output_path in utils.iterate_audio_files_with_bands(cfg, ['@feature_base', '.pklz']):
        if output_path.exists() and not force:
            if skip_existing:
                print(f'... skipping {output_path}')
                continue
            raise Exception(f'"{output_path}" exists (-s to skip existing, or -f to overwrite).')
        own_call(['extract-features', input_path, output_path, spec, esr])

@extract.command()
def show_features_size():
    cfg = get_config()
    for esr,band,spec,fname,info,input_path,feat_path in utils.iterate_audio_files_with_bands(cfg, ['@feature_base', '.pklz']):
        if feat_path.exists():
            with gzip.open(feat_path, "rb") as f:
                r = pickle.loads(f.read())
                print(f'... {feat_path} {np.shape(r)}') # e.g. (65, 128) where 65 ~ 60sec/0.92(s/window)




###### COMMAND compute
@cli.group()
def compute():
    pass

@compute.command()
def umap():
    cfg = get_config()
    for umap_name,umap in cfg.umaps.items():
        print(umap_name, umap)
        for r in umap.ranges:
            print(f'... {r}: {cfg.ranges[r]}')

######################################################################
# config handling etc
_cache_config = None
def get_config():
    global _cache_config
    if _cache_config is None:
        _cache_config = utils.parse_config()
    return _cache_config




######################################################################
# msg = for most of the thing it must be installed with pip and used with sse
if __name__ == '__main__':
    from pathlib import Path
    import sys
    print('######################################################################')
    print('                                                                     #')
    print('For most features, it is supposed that this is "pip installed, run:  #')
    path = Path(sys.argv[0]).parent.absolute().relative_to(Path.cwd())
    print(('    pip install -U ' + str(path) + '/' + ' '*99)             [:69]+'#')
    print('                                                                     #')
    print('and then to use the sse command, as in:                              #')
    print('    sse --help                                                       #')
    print('                                                                     #')
    print('you can also enable bash autocompletion by running:                  #')
    print('    eval "$(_SSE_COMPLETE=bash_source sse)"                          #')
    print('                                                                     #')
    print('######################################################################')
    print('')
    cli()




