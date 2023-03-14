import json
import pathlib
from typing import Any, List, Union

import numpy

from processing.deprecated_classes.Config import Config
from processing.deprecated_utils.iterate_timegroups import iterate_timegroups
from processing.deprecated_utils.load_features_for import load_features_for
from processing.deprecated_utils.timegroup_loaded_features import \
    timegroup_loaded_features


class BuilderCovering:
    """The builder for coverings.

    Will load two groups of audio features and compare them together using
    distance of means.

    TODO: Reduce global complexity.
    TODO: Merge redundant code with other `Builders`.

    Attributes:
         __plot: The user wants to use `matplotlib` to generate a png image.
            TODO: Obsolete?
        __show: The user wants to open the generated image.
        __config: The configuration payload as named tuple.
            TODO: Improve interfacing.
        __sites: The list of all sites.
            TODO: Why transform value coming from Config?
    """
    __plot: bool
    __show: bool
    __config: Union[tuple, Any]
    __sites: List[str]

    def __init__(
        self,
        plot: bool,
        show: bool,
    ) -> None:
        self.__plot = plot
        self.__show = show

        self.__config = Config().get()

        self.__get_sites()

        self.__process_integrations()

    def __get_sites(self):
        self.__sites = list(
            set(
                [site for site in Config().get_all_sites()]
            )
        )

    def __process_integrations(self):
        for integration in Config().integrations:
            print('... INTEGRATION', integration)
            self.__process_bands(integration)

    def __process_bands(self, integration):
        for band in self.__config.bands.keys():
            print('... ... BAND', band)

            infos = {
                'integration': integration,
                'band': band,
                'data': {},
            }

            self.__process_ranges(integration, band, infos)

    def __process_ranges(self, integration, band, infos):
        for range_name in self.__config.ranges.keys():
            print('... ... ... RANGE', range_name)
            range_value = self.__config.ranges[range_name]

            self.__process_sites(
                integration,
                band,
                infos,
                range_name,
                range_value
            )

    def __process_sites(
        self,
        integration,
        band,
        infos,
        range_name,
        range_value
    ):
        for site in self.__sites:
            print('... ... ... ... SITE', site)

            range_times, range_features, _meta_values = load_features_for(
                band,
                range_value,
                site
            )

            range_bins, group_starts = timegroup_loaded_features(
                range_times,
                range_value,
                integration
            )

            self.__process_s2(
                integration,
                band,
                infos,
                range_name,
                range_value,
                site,
                range_bins,
                range_features,
                group_starts
            )

    def __process_s2(
        self,
        integration,
        band,
        infos,
        range_name,
        range_value,
        site,
        range_bins,
        range_features,
        group_starts
    ):
        for s2 in [s2 for s2 in self.__sites if s2 != site]:
            print('... ... ... ... ... SITE2', s2)

            range_times2, range_features2, _meta_values2 = load_features_for(
                band,
                range_value,
                s2
            )

            range_bins2, group_starts2 = timegroup_loaded_features(
                range_times2, range_value, integration
            )

            s2_features = {}

            for g_start, g_end, t_start, g_start_i in iterate_timegroups(
                    range_value,
                    integration,
                    range_bins2,
                    group_starts2,
            ):
                s2_features[t_start] = range_features2[g_start:g_end, :]

            # compare all s features to s2 ones
            d_distofmeans = []
            d_times = []

            for g_start, g_end, t_start, g_start_i in iterate_timegroups(
                    range_value,
                    integration,
                    range_bins,
                    group_starts
            ):

                if t_start not in s2_features:
                    continue

                d_times.append(t_start)

                feats = range_features[g_start:g_end, :]

                d_distofmeans.append(
                    float(
                        numpy.sum(
                            numpy.abs(
                                numpy.mean(feats, axis=0) - numpy.mean(
                                    s2_features[t_start], axis=0
                                )
                            )
                        )
                    )
                )

            # TODO: Inspect
            info_key = range_name + ' ' + site + ' ' + s2

            info = {
                'meandist': d_distofmeans,
                't': [d.timestamp() for d in d_times],
            }

            infos['data'][info_key] = info

        out_path = pathlib.Path(
            self.__config.variables['generated_base']
        ).joinpath(
            'pairwise', 'covering', str(integration), band + '.json'
        )

        # todo: here and in volume, reconsider the use of compound keys
        # todo: refactor as save json (and gzip it at some point)
        out_path.absolute().parent.mkdir(parents=True, exist_ok=True)

        with open(out_path, "w") as jsonfile:
            json.dump(infos, jsonfile)

        if self.__plot:
            self.__do_plot(integration, band, infos, out_path)

    def __do_plot(self, integration, band, infos, out_path):
        import matplotlib.pyplot as plot  # import here to have
        # matplotlib optional

        for kplot in [k for k in list(infos['data'].values())[0] if
                      k != 't']:

            for k, data in infos['data'].items():
                print(k)
                plot.plot_date(
                    [t / 3600 / 24 for t in data['t']],
                    data[kplot], label=k, linestyle='-',
                    markersize=2, alpha=.9
                )
            plot.legend()
            plot.title(
                f'Covering [{kplot}] b={band}, {integration}sec integration'
            )
            plot.savefig(out_path.with_suffix('.' + kplot + '.png'))

            if self.__show:
                plot.show()
            plot.close()
