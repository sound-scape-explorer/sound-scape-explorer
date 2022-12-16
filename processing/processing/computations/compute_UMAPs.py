import json
import pathlib

import numpy as np

from processing.utils.get_config import get_config
from processing.utils.iterate_timegroups import iterate_timegroups
from processing.utils.load_features_for import load_features_for
from processing.utils.timegroup_loaded_features import \
    timegroup_loaded_features


def compute_UMAPs(cfg, plot, show):
    # we do the import here as it is very very slow
    import umap.umap_ as umap  # Why!!!!
    UMAP = umap.UMAP  # as we use "umap" a lot below

    config = get_config()

    for umap_name, umap in cfg.umaps.items():
        print('... UMAP', umap_name, umap)

        for band in umap.bands:
            print('... ... BAND', band)
            dataset_times = []
            dataset_features = []
            dataset_labels = []
            dataset_columns = []

            for r_name in umap.ranges:
                r = cfg.ranges[r_name]

                for s in umap.sites:
                    range_times, range_features = load_features_for(
                        band,
                        r,
                        s
                    )

                    columns = [*config.files[s][3:]]

                    range_bins, group_starts = timegroup_loaded_features(
                        range_times,
                        r,
                        umap.integration
                    )

                    for g_start, g_end, t_start, g_start_i in iterate_timegroups(
                            r,
                            umap.integration,
                            range_bins,
                            group_starts,
                    ):
                        dataset_times.append(t_start)
                        dataset_columns.append(columns)

                        dataset_features.append(np.mean(
                            range_features[g_start:g_end, :], axis=0
                        ))

                        dataset_labels.append(f'{r_name}/{s}')

            # print(np.shape(dataset_times), np.shape(dataset_features))
            umap_random = cfg.variables['umap_random']

            if type(umap_random) is str:
                umap_random = int(umap_random)

            X = UMAP(random_state=umap_random).fit_transform(dataset_features)

            out_path = pathlib.Path(cfg.variables['generated_base']).joinpath(
                'umap', umap_name, band + '.json')

            out_path.absolute().parent.mkdir(parents=True, exist_ok=True)

            with open(out_path, "w") as jsonfile:
                json.dump({
                    'X': X.tolist(),
                    't': [d.timestamp() for d in dataset_times],
                    'l': dataset_labels,
                    'binSize': umap.integration,
                    'c': dataset_columns,
                }, jsonfile)

            if plot:
                import \
                    matplotlib.pyplot as plt  # import here to have matplotlib optional
                import seaborn as sns
                # for gi,g in enumerate(np.unique(dataset_labels)):
                #    sub = np.where(dataset_labels == g)
                #    sns.scatterplot(X[sub,0], X[sub,1], c=X[sub,0]*)
                sns.scatterplot(x=X[:, 0], y=X[:, 1], hue=dataset_labels,
                                style=dataset_labels, alpha=0.35)
                plt.title(
                    f'UMAP[{umap_name}] b={band}, {umap.integration}sec win.')
                plt.savefig(out_path.with_suffix('.png'))
                if show:
                    plt.show()
                plt.close()
