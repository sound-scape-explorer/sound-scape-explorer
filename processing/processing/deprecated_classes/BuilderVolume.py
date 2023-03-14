import json
import pathlib
from typing import Any, List, Union

import numpy

from processing.deprecated_classes.Config import Config
from processing.deprecated_utils.iterate_timegroups import iterate_timegroups
from processing.deprecated_utils.load_features_for import load_features_for
from processing.deprecated_utils.timegroup_loaded_features import \
    timegroup_loaded_features


class BuilderVolume:
    """The builder for volumes.

    Depending on time range, integration value, frequency band and sites,
    the builder will load audio features (grouped by integration value) in order
    to compute statistics and metrics.

    The current computed metrics are:
        - `sumvar`
        - `sumstd`
        - `logprodspan`

    TODO: Reduce global complexity.
    TODO: Add indicators to computed metrics.

    Attributes:
        __plot: The user wants to use `matplotlib` to generate a png image.
        __show: The user wants to open the generated image.
        __config: The configuration payload as named tuple.
            TODO: Improve interfacing.
        __sites: The list of sites (aggregation of multiple files).
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

        self.__prepare()
        self.__process()

    def __prepare(self):
        self.__prepare_config()
        self.__prepare_sites()

    def __prepare_config(self):
        self.__config = Config().get()

    def __prepare_sites(self):
        self.__sites = list(set([f.site for f in self.__config.files.values()]))

    # TODO: Reduce complexity
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

                    r = self.__config.ranges[range_name]

                    for site in self.__sites:
                        print('... ... ... ... SITE', site)

                        range_times, range_features, _meta_values = \
                            load_features_for(
                                band,
                                r,
                                site
                            )

                        range_bins, group_starts = timegroup_loaded_features(
                            range_times, r, integration
                        )

                        d_times = []
                        d_bins = []
                        d_sumvar = []
                        d_sumstd = []
                        d_logprodspan = []

                        for g_start, g_end, t_start, g_start_i in \
                                iterate_timegroups(
                                    r, integration, range_bins, group_starts
                                ):
                            d_times.append(t_start)
                            d_bins.append(range_bins[g_start])

                            features = range_features[g_start:g_end, :]

                            d_sumvar.append(
                                float(numpy.sum(numpy.var(features, axis=0)))
                            )

                            d_sumstd.append(
                                float(numpy.sum(numpy.std(features, axis=0)))
                            )

                            eps = numpy.finfo(numpy.float32).eps
                            my_max = numpy.max(features, axis=0)
                            my_min = numpy.min(
                                range_features[g_start:g_end, :],
                                axis=0,
                            )

                            log = numpy.log(eps + my_max - my_min)
                            my_sum = numpy.sum(log)

                            d_logprodspan.append(float(my_sum))

                        # TODO: Inspect
                        info_key = range_name + site

                        info = {
                            'sumvar': d_sumvar,
                            'sumstd': d_sumstd,
                            'logprodspan': d_logprodspan,
                            't': [d.timestamp() for d in d_times],
                            'i': d_bins,
                        }

                        infos['data'][info_key] = info

                out_path = pathlib.Path(
                    self.__config.variables['generated_base']
                ).joinpath(
                    'single', 'volume', str(integration), band + '.json'
                )

                # todo: refactor as save json (and gzip it at some point)

                out_path.absolute().parent.mkdir(parents=True, exist_ok=True)

                with open(out_path, "w") as jsonfile:
                    json.dump(infos, jsonfile)

                if self.__plot:
                    # import here to have matplotlib optional
                    import matplotlib.pyplot as plot

                    for plot_key in [
                        k for k in list(infos['data'].values())[0]
                        if k != 't' and k != 'i'
                    ]:
                        for k, data in infos['data'].items():
                            plot.plot_date(
                                [t / 3600 / 24 for t in data['t']],
                                data[plot_key], label=k, linestyle='-',
                                markersize=2, alpha=.9
                            )

                        plot.legend()

                        plot.title(
                            f'Volume [{plot_key}] b={band}, {integration}sec '
                            f'integration'
                        )

                        plot.savefig(
                            out_path.with_suffix('.' + plot_key + '.png')
                        )

                        if self.__show:
                            plot.show()

                        plot.close()
