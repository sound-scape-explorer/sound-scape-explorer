import json
import pathlib

import numpy as np

from processing.utils.iterate_timegroups import iterate_timegroups
from processing.utils.load_features_for import load_features_for
from processing.utils.timegroup_loaded_features import \
    timegroup_loaded_features


def compute_volumes(cfg, plot, show):
    integrations = [int(v) for v in
                    cfg.variables['integration_seconds'].split('-')]
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
                    range_times, range_features = load_features_for(cfg, band,
                                                                    r, s)
                    range_bins, group_starts = timegroup_loaded_features(
                        range_times, r, inte)
                    d_times = []
                    d_bins = []
                    d_sumvar = []
                    d_sumstd = []
                    d_logprodspan = []
                    for g_start, g_end, t_start, g_start_i in iterate_timegroups(
                            r, inte, range_bins, group_starts):
                        d_times.append(t_start)
                        d_bins.append(range_bins[g_start])
                        feats = range_features[g_start:g_end, :]
                        d_sumvar.append(float(np.sum(np.var(feats, axis=0))))
                        d_sumstd.append(float(np.sum(np.std(feats, axis=0))))
                        d_logprodspan.append(float(np.sum(np.log(
                            np.finfo(np.float32).eps + np.max(feats,
                                                              axis=0) - np.min(
                                range_features[g_start:g_end, :], axis=0)))))
                    info_key = r_name + ' ' + s
                    info = {
                        'sumvar': d_sumvar,
                        'sumstd': d_sumstd,
                        'logprodspan': d_logprodspan,
                        't': [d.timestamp() for d in d_times],
                        'i': d_bins,
                    }
                    infos['data'][info_key] = info
            out_path = pathlib.Path(cfg.variables['generated_base']).joinpath(
                'single', 'volume', str(inte), band + '.json')
            # todo: refactor as save json (and gzip it at some point)
            out_path.absolute().parent.mkdir(parents=True, exist_ok=True)
            with open(out_path, "w") as jsonfile:
                json.dump(infos, jsonfile)
            if plot:
                import \
                    matplotlib.pyplot as plt  # import here to have matplotlib optional
                for kplot in [k for k in list(infos['data'].values())[0] if
                              k != 't' and k != 'i']:
                    # import seaborn as sns
                    for k, data in infos['data'].items():
                        plt.plot_date([t / 3600 / 24 for t in data['t']],
                                      data[kplot], label=k, linestyle='-',
                                      markersize=2, alpha=.9)
                    plt.legend()
                    plt.title(
                        f'Volume [{kplot}] b={band}, {inte}sec integration')
                    plt.savefig(out_path.with_suffix('.' + kplot + '.png'))
                    if show:
                        plt.show()
                    plt.close()
