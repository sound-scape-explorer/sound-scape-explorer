import json
import pathlib

import numpy

from processing.classes.Config import Config
from processing.utils.iterate_timegroups import iterate_timegroups
from processing.utils.load_features_for import load_features_for
from processing.utils.timegroup_loaded_features import timegroup_loaded_features


class BuilderUMAP:
    def __init__(self, plot, show):
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
            dataset_columns,
            dataset_features,
            dataset_labels,
    ):
        range_times, range_features = load_features_for(
            band,
            range_value,
            site
        )

        columns = [*self.__config.files[site][3:]]

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
            dataset_columns.append(columns)

            dataset_features.append(
                numpy.mean(
                    range_features[g_start:g_end, :], axis=0
                )
            )

            dataset_labels.append(f'{range_name}/{site}')

    def __build(self):
        for umap_name, umap in self.__config.umaps.items():
            sites = umap.sites if len(
                umap.sites
            ) != 0 else Config().get_all_sites()

            print('... UMAP', umap_name, umap)

            for band in umap.bands:
                print('... ... BAND', band)
                dataset_times = []
                dataset_features = []
                dataset_labels = []
                dataset_columns = []

                for range_name in umap.ranges:
                    range_value = self.__config.ranges[range_name]

                    for site in sites:
                        self.__build_something(
                            band,
                            range_value,
                            range_name,
                            site,
                            umap,
                            dataset_times,
                            dataset_columns,
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
                            'c': dataset_columns,
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
