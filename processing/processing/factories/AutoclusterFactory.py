from processing.config.AutoclusterConfig import AutoclusterConfig
from processing.enums import AutoclusterImpl
from processing.lib.console import Console
from processing.types import Mdm, AutoclusterLabels


class AutoclusterFactory:
    @staticmethod
    def _create(autocluster: AutoclusterConfig):
        from sklearn.cluster import HDBSCAN

        if autocluster.impl is AutoclusterImpl.HDBSCAN_EOM:
            method = "eom"
        elif autocluster.impl is AutoclusterImpl.HDBSCAN_LEAF:
            method = "leaf"
        else:
            raise Exception(f"Unknown autocluster implementation: {autocluster.impl}")

        min_samples = (
            None
            if autocluster.min_samples == autocluster.none_string
            else int(autocluster.min_samples)
        )

        return HDBSCAN(
            min_cluster_size=autocluster.min_cluster_size,
            min_samples=min_samples,
            alpha=autocluster.alpha,
            cluster_selection_epsilon=autocluster.epsilon,
            cluster_selection_method=method,
            metric="precomputed",
            algorithm="auto",
            leaf_size=50,
            n_jobs=-1,
            # todo: legacy params, assess with business
            # p=None,
            # algorithm="best",
            # approx_min_span_tree=True,
            # gen_min_span_tree=False,
            # core_dist_n_jobs=-1,
            # match_reference_implementation=False,
        )

    @staticmethod
    def create_and_run(
        autocluster: AutoclusterConfig,
        mean_distances_matrix: Mdm,
    ) -> AutoclusterLabels:
        try:
            ac = AutoclusterFactory._create(autocluster)
            clustering = ac.fit(mean_distances_matrix[:])
            # noinspection PyUnresolvedReferences
            labels: list[int] = clustering.labels_.tolist()
        except MemoryError:
            Console.print_mdm_oom_warning()
            labels = [-1] * mean_distances_matrix.shape[0]

        return labels
