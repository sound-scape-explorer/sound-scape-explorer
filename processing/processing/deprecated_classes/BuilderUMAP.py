import json
import pathlib
from typing import Any, List, Type, Union

import numpy
from umap import UMAP

from processing.deprecated_classes.Config import Config
from processing.deprecated_utils.generate_dataset_label import \
    generate_dataset_label
from processing.deprecated_utils.iterate_timegroups import iterate_timegroups
from processing.deprecated_utils.load_features_for import load_features_for
from processing.deprecated_utils.timegroup_loaded_features import \
    timegroup_loaded_features


class BuilderUMAP:
    """The builder for UMAPs.

    Will load grouped audio features depending on user settings in order to
    reduce the input of 128 dimensions with the Uniform Manifold
    Approximation and Projection.

    The requested number of dimensions to approximate to is currently 2.

    TODO: Reduce global complexity.
    TODO: Add approximation to 3 dimensions (for future 3D plotting).

    Attributes:
        __plot: The user wants to use `matplotlib` to generate a png image.
            TODO: Obsolete?
        __show: The user wants to open the generated image.
        __config: The configuration payload as named tuple.
            TODO: Improve interfacing.
        __umap: The UMAP class from `umap` external library.
            TODO: List as project dependencies.
    """
    __plot: bool
    __show: bool
    __config: Union[tuple, Any]
    __umap: Type[UMAP]

    def __init__(
        self,
        plot: bool,
        show: bool,
    ) -> None:
        self.__plot = plot
        self.__show = show

        self.__load_dependencies()
        self.__config = Config().get()

        self.__build()

    def __load_dependencies(self):
        import umap.umap_ as umap
        self.__umap = umap.UMAP

    def __build_something(
        self,
        band,
        range_value,
        range_name,
        site,
        umap,
        dataset_times,
        dataset_meta_values,
        dataset_features,
        dataset_labels,
    ):
        range_times, range_features, meta_values = load_features_for(
            band,
            range_value,
            site
        )

        range_bins, group_starts = timegroup_loaded_features(
            range_times,
            range_value,
            umap.integration
        )

        for g_start, g_end, t_start, g_start_i in \
                iterate_timegroups(
                    range_value,
                    umap.integration,
                    range_bins,
                    group_starts,
                ):
            dataset_times.append(t_start)
            dataset_meta_values.append(meta_values[g_start_i])

            dataset_features.append(
                numpy.mean(
                    range_features[g_start:g_end, :], axis=0
                )
            )

            dataset_labels.append(generate_dataset_label(range_name, site))

    def __validate_ranges(self, ranges: List[str]) -> None:
        if len(ranges) == 0:
            raise ValueError('Excel field `umaps_ranges` is not valid.')

    def __build(self):
        for umap_name, umap in self.__config.umaps.items():
            print('... UMAP', umap_name, umap)

            self.__validate_ranges(umap[3])

            for band in umap.bands:
                print('... ... BAND', band)
                dataset_times = []
                dataset_features = []
                dataset_labels = []
                dataset_meta_values = []

                for range_name in umap.ranges:
                    range_value = self.__config.ranges[range_name]

                    for site in umap.sites:
                        self.__build_something(
                            band,
                            range_value,
                            range_name,
                            site,
                            umap,
                            dataset_times,
                            dataset_meta_values,
                            dataset_features,
                            dataset_labels,
                        )

                x = self.__get_x(dataset_features)

                out_path = pathlib.Path(
                    self.__config.variables['generated_base']
                ).joinpath(
                    'umap', umap_name, band + '.json'
                )

                out_path.absolute().parent.mkdir(parents=True, exist_ok=True)

                with open(out_path, "w") as jsonfile:
                    json.dump(
                        {
                            'X': x.tolist(),
                            't': [d.timestamp() for d in dataset_times],
                            'l': dataset_labels,
                            'binSize': umap.integration,
                            'c': dataset_meta_values,
                        }, jsonfile
                    )

                if self.__plot:
                    self.__build_plot(
                        dataset_labels,
                        band,
                        umap,
                        umap_name,
                        out_path,
                        x
                    )

    def __build_plot(self, dataset_labels, band, umap, umap_name, out_path, x):
        import matplotlib.pyplot as plot  # import here to have
        # matplotlib optional
        import seaborn as sns

        # for gi,g in enumerate(np.unique(dataset_labels)):
        #    sub = np.where(dataset_labels == g)
        #    sns.scatterplot(X[sub,0], X[sub,1], c=X[sub,0]*)

        sns.scatterplot(
            x=x[:, 0], y=x[:, 1], hue=dataset_labels,
            style=dataset_labels, alpha=0.35
        )

        plot.title(
            f'UMAP[{umap_name}] b={band}, {umap.integration}sec '
            f'win.'
        )

        plot.savefig(out_path.with_suffix('.png'))

        if self.__show:
            plot.show()

        plot.close()

    def __get_x(self, dataset_features):
        umap_random = self.__config.variables['umap_random']

        if type(umap_random) is str:
            umap_random = int(umap_random)

        x = self.__umap(random_state=umap_random).fit_transform(
            dataset_features
        )

        return x
