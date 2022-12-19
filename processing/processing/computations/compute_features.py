import json
import pathlib

from processing.utils.iterate_timegroups import iterate_timegroups
from processing.utils.load_features_for import load_features_for
from processing.utils.timegroup_loaded_features import \
    timegroup_loaded_features


def compute_features(config):
    integrations = [
        int(v) for v in
        config.variables['integration_seconds'].split('-')
    ]

    sites = list(set([f.site for f in config.files.values()]))

    for integration in integrations:
        print('... INTEGRATION', integration)

        for band in config.bands.keys():
            print('... ... BAND', band)

            infos = {
                'integration': integration,
                'band': band,
                'data': {}
            }

            for range_name in config.ranges.keys():
                print('... ... ... RANGE', range_name)

                r = config.ranges[range_name]

                for s in sites:
                    print('... ... ... ... SITE', s)

                    range_times, range_features = load_features_for(band, r, s)

                    range_bins, group_starts = timegroup_loaded_features(
                        range_times, r, integration
                    )

                    d_times = []
                    d_features = []

                    for g_start, g_end, t_start, g_start_i in iterate_timegroups(
                            r, integration, range_bins, group_starts
                    ):
                        d_times.append(t_start)

                        features = range_features[g_start:g_end, :].mean(
                            axis=0
                        )

                        d_features.append(features.tolist())

                    info_key = range_name + ' ' + s

                    info = {
                        't': [d.timestamp() for d in d_times],
                        'features': d_features,
                    }

                    infos['data'][info_key] = info

            out_path = pathlib.Path(
                config.variables['generated_base']
            ).joinpath(
                'features', str(integration), band + '.json'
            )

            out_path.absolute().parent.mkdir(parents=True, exist_ok=True)

            with open(out_path, "w") as jsonfile:
                json.dump(infos, jsonfile)
