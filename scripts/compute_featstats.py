
import pathlib
import utils
import json
import gzip
import pickle
import numpy as np
import datetime as dt

def volumes(cfg):
    integrations = [int(v) for v in cfg.variables['integration_seconds'].split('-')]
    sites = list(set([f.site for f in cfg.files.values()]))
    for inte in integrations:
        print('... INTEGRATION', inte)
        for band in cfg.bands.keys():
            print('... ... BAND', band)
            infos = {
                'integration': inte,
                'band': band,
                'data': {}
            }
            for r_name in cfg.ranges.keys():
                print('... ... ... RANGE', r_name)
                r = cfg.ranges[r_name]
                for s in sites:
                    print('... ... ... ... SITE', s)
                    range_times, range_features = load_features_for(cfg, band, r, s)
                    range_bins, group_starts = timegroup_loaded_features(range_times, r, inte)
                    d_times = []
                    d_sumvar = []
                    d_sumstd = []
                    d_logprodspan = []
                    for g_start,g_end,t_start,g_start_i in iterate_timegroups(r, inte, range_bins, group_starts):
                        d_times.append(t_start)
                        d_sumvar.append(float(np.sum(np.var(range_features[g_start:g_end,:], axis=0))))
                        d_sumstd.append(float(np.sum(np.std(range_features[g_start:g_end,:], axis=0))))
                        d_logprodspan.append(float(np.sum(np.log(np.finfo(float).eps + np.max(range_features[g_start:g_end,:], axis=0)-np.min(range_features[g_start:g_end,:], axis=0)))))
                    info_key = r_name + ' ' + s
                    info = {
                        'sumvar': d_sumvar,
                        'sumstd': d_sumstd,
                        'logprodspan': d_logprodspan,
                        't': [d.timestamp() for d in d_times],
                    }
                    infos['data'][info_key] = info
            out_path = pathlib.Path(cfg.variables['generated_base']).joinpath('single', 'volume', str(inte), band+'.json')
            # todo: refactor as save json (and gzip it at some point)
            out_path.absolute().parent.mkdir(parents=True, exist_ok=True)
            with open(out_path, "w") as jsonfile:
                json.dump(infos, jsonfile)


def load_features_for(cfg, band, r, s):
    range_times = []
    range_features = []
    for fname,info,audio,pklz in utils.iterate_audio_files(cfg, band, ['@feature_base', '.pklz']):
        if info.site != s: continue
        with gzip.open(pklz, "rb") as f:
            data = pickle.loads(f.read())
        dur = dt.timedelta(seconds=0.92 * len(data))
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
    return range_times, range_features

def timegroup_loaded_features(range_times, r, integration):
    range_bins = (range_times - r[0]) // dt.timedelta(seconds=integration)
    group_starts = np.unique(range_bins, return_index=True)[1]
    return range_bins, group_starts

def iterate_timegroups(r, integration, range_bins, group_starts):
    for g_start_i,g_start in enumerate(group_starts):
        t_start = r[0] + range_bins[g_start] * dt.timedelta(seconds=integration)
        g_end = None if g_start_i == len(group_starts)-1 else group_starts[g_start_i+1]
        yield g_start,g_end,t_start,g_start_i

def umaps(cfg, plot, show):
    # we do the import here as it is very very slow
    import umap.umap_ as umap # Why!!!!
    UMAP = umap.UMAP # as we use "umap" a lot below
    for umap_name,umap in cfg.umaps.items():
        print('... UMAP', umap_name, umap)
        for band in umap.bands:
            print('... ... BAND', band)
            dataset_times = []
            dataset_features = []
            dataset_labels = []
            for r_name in umap.ranges:
                r = cfg.ranges[r_name]
                for s in umap.sites:
                    range_times, range_features = load_features_for(cfg, band, r, s)
                    range_bins, group_starts = timegroup_loaded_features(range_times, r, umap.integration)
                    for g_start,g_end,t_start,g_start_i in iterate_timegroups(r, umap.integration, range_bins, group_starts):
                        dataset_times.append(t_start)
                        dataset_features.append(np.mean(range_features[g_start:g_end,:], axis=0))
                        dataset_labels.append(f'{r_name}/{s}')
   
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
                import matplotlib.pyplot as plt # import here to have matplotlib optional
                import seaborn as sns
                #for gi,g in enumerate(np.unique(dataset_labels)):
                #    sub = np.where(dataset_labels == g)
                #    sns.scatterplot(X[sub,0], X[sub,1], c=X[sub,0]*)
                sns.scatterplot(x=X[:,0], y=X[:,1], hue=dataset_labels, style=dataset_labels, alpha=0.35)
                plt.title(f'UMAP[{umap_name}] {band}, {umap.integration}sec win.')
                plt.savefig(out_path.with_suffix('.png'))
                if show:
                    plt.show()
                plt.close()