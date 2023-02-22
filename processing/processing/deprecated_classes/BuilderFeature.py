import json
import pathlib
from typing import Any, List, Union

from processing.deprecated_classes.Config import Config
from processing.deprecated_utils.generate_dataset_label import \
    generate_dataset_label
from processing.deprecated_utils.iterate_timegroups import iterate_timegroups
from processing.deprecated_utils.load_features_for import load_features_for
from processing.deprecated_utils.timegroup_loaded_features import \
    timegroup_loaded_features


class BuilderFeature:
    """The builder for features.

    This will load and group 1 second based audio features, then write them
    to disk as JSON files.

    TODO: Code for loading, grouping following user settings can be merged
        between all `Builders`.

    Attributes:
        __config: The configuration payload as named tuple.
            TODO: Improve interfacing.
        __sites: The list of sites (aggregation of multiple files).
    """
    __config: Union[tuple, Any]
    __sites: List[str]

    def __init__(self) -> None:
        self.__prepare()
        self.__process()

    def __prepare(self):
        self.__prepare_config()
        self.__prepare_sites()

    def __prepare_config(self):
        self.__config = Config().get()

    def __prepare_sites(self):
        self.__sites = list(set([f.site for f in self.__config.files.values()]))

    def __process(self):
        for integration in Config().integrations:
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

                        range_times, range_features, _meta_values = \
                            load_features_for(
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

                        info_key = generate_dataset_label(range_name, site)

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
