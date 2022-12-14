import json
import pathlib

import numpy as np

from processing.utils.iterate_timegroups import iterate_timegroups
from processing.utils.load_features_for import load_features_for
from processing.utils.timegroup_loaded_features import \
    timegroup_loaded_features


def compute_coverings(cfg, plot, show):
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
                    range_times, range_features = load_features_for(band, r, s)
                    range_bins, group_starts = timegroup_loaded_features(
                        range_times, r, inte)

                    for s2 in [s2 for s2 in sites if s2 != s]:
                        print('... ... ... ... ... SITE2', s2)
                        range_times2, range_features2 = load_features_for(
                            band,
                            r,
                            s2,
                        )

                        range_bins2, group_starts2 = timegroup_loaded_features(
                            range_times2, r, inte)
                        #  gather data from s2 in a time-indexed dict
                        s2_features = {}

                        for g_start, g_end, t_start, g_start_i in iterate_timegroups(
                                r, inte, range_bins2, group_starts2):
                            s2_features[t_start] = range_features2[
                                                   g_start:g_end, :]
                        # compare all s features to s2 ones
                        d_distofmeans = []
                        d_times = []

                        for g_start, g_end, t_start, g_start_i in iterate_timegroups(
                                r, inte, range_bins, group_starts):
                            if t_start not in s2_features:
                                continue
                            d_times.append(t_start)
                            feats = range_features[g_start:g_end, :]
                            d_distofmeans.append(float(np.sum(np.abs(
                                np.mean(feats, axis=0) - np.mean(
                                    s2_features[t_start], axis=0)))))

                        info_key = r_name + ' ' + s + ' ' + s2
                        info = {
                            'meandist': d_distofmeans,
                            't': [d.timestamp() for d in d_times],
                        }
                        infos['data'][info_key] = info
            out_path = pathlib.Path(cfg.variables['generated_base']).joinpath(
                'pairwise', 'covering', str(inte), band + '.json')
            # todo: here and in volume, reconsider the use of compound keys
            # todo: refactor as save json (and gzip it at some point)
            out_path.absolute().parent.mkdir(parents=True, exist_ok=True)

            with open(out_path, "w") as jsonfile:
                json.dump(infos, jsonfile)

            if plot:
                import \
                    matplotlib.pyplot as plt  # import here to have matplotlib optional

                for kplot in [k for k in list(infos['data'].values())[0] if
                              k != 't']:
                    # import seaborn as sns
                    for k, data in infos['data'].items():
                        print(k)
                        plt.plot_date([t / 3600 / 24 for t in data['t']],
                                      data[kplot], label=k, linestyle='-',
                                      markersize=2, alpha=.9)
                    plt.legend()
                    plt.title(
                        f'Covering [{kplot}] b={band}, {inte}sec integration')
                    plt.savefig(out_path.with_suffix('.' + kplot + '.png'))

                    if show:
                        plt.show()
                    plt.close()
