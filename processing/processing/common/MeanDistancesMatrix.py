import numpy as np
from h5py import Dataset
from sklearn import metrics

from processing.config.SettingsConfig import SettingsConfig
from processing.constants import MDM_EMPTY
from processing.lib.console import Console
from processing.utils.calculate_mdm_shape_limit import calculate_mdm_shape_limit


class MeanDistancesMatrix:
    @staticmethod
    def calculate(
        embeddings: list[Dataset],
        settings: SettingsConfig,
    ):
        # Check memory requirements
        shape_req = len(embeddings[0])
        shape_max = calculate_mdm_shape_limit(settings.memory_limit)
        if shape_req > shape_max:
            Console.print_mdm_oom_warning(f"RAM limit: {settings.memory_limit} GB")
            return MDM_EMPTY

        # Calculate pairwise distances and average them
        samples_count = embeddings[0].shape[0]
        mdm = np.zeros([samples_count, samples_count], dtype=np.float32)

        for i, feature_set in enumerate(embeddings):
            # Calculate pairwise distances for this feature set
            current_mdm = metrics.pairwise_distances(feature_set)

            # Ensure diagonal is zero (distances from points to themselves)
            np.fill_diagonal(current_mdm, 0.0)

            # Update average distance matrix
            if i == 0:
                mdm = current_mdm
            else:
                mdm = ((mdm * i) + current_mdm) / (i + 1)

        # Verify that the diagonal is exactly zero
        np.fill_diagonal(mdm, 0.0)

        # Ensure matrix is symmetric
        mdm = (mdm + mdm.T) / 2.0

        # Sanity check: verify non-negative distances
        if np.any(mdm < 0):
            print(
                "Warning: Negative values found in distance matrix! Clipping to zero."
            )
            mdm = np.maximum(mdm, 0.0)

        return mdm
