
import click
from click import echo
from click import secho
import utils
from utils import own_call
import subprocess
import pprint
from json import dumps as json_dumps
import pathlib

import json
import gzip
import pickle
import numpy as np
import datetime as dt

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
        print(json_dumps(cfg._asdict(), default=lambda o: o.isoformat())) # might need a more complex method if we push the idea of parsing the config even further
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
        #own_call(['preview-features', input_path, output_path, spec, expected_sr, start_sec, dur_sec])
        import sys
        sys.argv = ['extract_features.py', input_path, output_path, spec, expected_sr, start_sec, dur_sec]
        import extract_features
        extract_features.preview()

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
        #own_call(['band-freqs', expected_sr, spec, band]) # too slow...
        import sys
        sys.argv = ['extract_features.py', expected_sr, spec, band]
        import extract_features
        extract_features.print_band_freq_bounds()


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
        #own_call(['extract-features', input_path, output_path, spec, esr])
        import sys
        sys.argv = ['extract_features.py', input_path, output_path, spec, esr]
        import extract_features
        extract_features.go()

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
@click.option('--plot/--no-plot', '-p', default=True)
@click.option('--show/--no-show', '-s', default=False)
def umap(plot, show):
    cfg = get_config()
    # we do it here as it is very very slow
    import umap.umap_ as umap # Why!!!!
    UMAP = umap.UMAP # as we use "umap" a lot below
    for umap_name,umap in cfg.umaps.items():
        print(umap_name, umap)
        for band in umap.bands:
            print(band)
            dataset_times = []
            dataset_features = []
            dataset_labels = []
            for r_name in umap.ranges:
                r = cfg.ranges[r_name]
                for s in umap.sites:
                    range_times = []
                    range_features = []
                    for fname,info,audio,pklz in utils.iterate_audio_files(cfg, band, ['@feature_base', '.pklz']):
                        if info.location != s: continue
                        with gzip.open(pklz, "rb") as f:
                            data = pickle.loads(f.read())
                        dur = dt.timedelta(seconds=0.92 * len(r))
                        if r[0] > info.start + dur: continue
                        if r[1] < info.start: continue
                        for i in range(len(data)):
                            start = info.start + dt.timedelta(seconds=0.92 * i)
                            if start < r[0] or start > r[1]: continue
                            range_times.append(start)
                            range_features.append(data[i])
                    ind = np.argsort(range_times)
                    range_times = np.array(range_times)[ind]
                    range_features = np.array(range_features)[ind]
                    range_bins = (range_times - r[0]) // dt.timedelta(seconds=umap.integration)
                    group_starts = np.unique(range_bins, return_index=True)[1]
                    #range_groups = np.split(range_features, group_starts[1:])
                    for g_start_i,g_start in enumerate(group_starts):
                        dataset_times.append(r[0] + range_bins[g_start] * dt.timedelta(seconds=umap.integration))
                        g_end = None if g_start_i == len(group_starts)-1 else group_starts[g_start_i+1]
                        dataset_features.append(np.mean(range_features[g_start:g_end,:], axis=0))
                        dataset_labels.append(f'{r_name}/{s}')
                    #print(r_name, s, len(dataset_features))
   
            #print(np.shape(dataset_times), np.shape(dataset_features))
            X = UMAP(random_state=42000).fit_transform(dataset_features)
            out_path = pathlib.Path(cfg.variables['generated_base']).joinpath('umap', umap_name, band+'.json')
            out_path.absolute().parent.mkdir(parents=True, exist_ok=True)
            with open(out_path, "w") as jsonfile:
                json.dump({
                    'X': X.tolist(),
                    't': [d.timestamp() for d in dataset_times],
                    'l': dataset_labels,
                    'binSize': umap.integration,
                }, jsonfile)
            if plot:
                import matplotlib.pyplot as plt
                import seaborn as sns
                #for gi,g in enumerate(np.unique(dataset_labels)):
                #    sub = np.where(dataset_labels == g)
                #    sns.scatterplot(X[sub,0], X[sub,1], c=X[sub,0]*)
                sns.scatterplot(X[:,0], X[:,1], hue=dataset_labels, style=dataset_labels, alpha=0.35)
                plt.title(f'UMAP[{umap_name}] {band}, {umap.integration}sec win.')
                plt.savefig(out_path.with_suffix('.png'))
                if show:
                    plt.show()
                plt.close()



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




