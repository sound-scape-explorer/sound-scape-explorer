import json
import pathlib

from processing.classes.Config import Config
from processing.utils.iterate_timegroups import iterate_timegroups
from processing.utils.load_features_for import load_features_for
from processing.utils.timegroup_loaded_features import timegroup_loaded_features


class BuilderFeature:
    def __init__(self):
        self.__prepare()
        self.__process()

    def __prepare(self):
        self.__prepare_config()
        self.__prepare_integrations()
        self.__prepare_sites()

    def __prepare_config(self):
        self.__config = Config().get()

    def __prepare_integrations(self):
        self.__integrations = [
            int(variable) for variable in
            self.__config.variables['integration_seconds'].split('-')
        ]

    def __prepare_sites(self):
        self.__sites = list(set([f.site for f in self.__config.files.values()]))

    def __process(self):
        for integration in self.__integrations:
            print('... INTEGRATION', integration)

            for band in self.__config.bands.keys():
                print('... ... BAND', band)

                infos = {
                    'integration': integration,
                    'band': band,
                    'data': {}
                }

                for range_name in self.__config.ranges.keys():
                    print('... ... ... RANGE', range_name)

                    range_value = self.__config.ranges[range_name]

                    for site in self.__sites:
                        print('... ... ... ... SITE', site)

                        range_times, range_features, _meta_values = load_features_for(
                            band,
                            range_value,
                            site
                        )

                        range_bins, group_starts = timegroup_loaded_features(
                            range_times, range_value, integration
                        )

                        d_times = []
                        d_features = []

                        for g_start, g_end, t_start, g_start_i in \
                                iterate_timegroups(
                                    range_value,
                                    integration,
                                    range_bins,
                                    group_starts
                                ):
                            d_times.append(t_start)

                            features = range_features[g_start:g_end, :].mean(
                                axis=0
                            )

                            d_features.append(features.tolist())

                        info_key = range_name + ' ' + site

                        info = {
                            't': [d.timestamp() for d in d_times],
                            'features': d_features,
                        }

                        infos['data'][info_key] = info

                out_path = pathlib.Path(
                    self.__config.variables['generated_base']
                ).joinpath(
                    'features', str(integration), band + '.json'
                )

                out_path.absolute().parent.mkdir(parents=True, exist_ok=True)

                with open(out_path, "w") as jsonfile:
                    json.dump(infos, jsonfile)
