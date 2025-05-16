import numpy as np
from h5py import Dataset
from scipy import spatial
from sklearn.neighbors import NearestNeighbors

from processing.interfaces import TrajectoryData, TrajectoryStatistics


class RelativeTrajectoryService:
    @staticmethod
    def compute_reference_point(trajectory_data: list[TrajectoryData]):
        """
        Compute the common reference point from a list of trajectories.

        Args:
            trajectory_data: List of trajectory data objects

        Returns:
            numpy.ndarray: The average of the first points, shape (1, dimensions)
        """
        paths = [d.path for d in trajectory_data]
        first_point = paths[0][0].reshape(1, -1)

        starting_sum = np.zeros_like(first_point)
        for path in paths:
            starting_sum += path[0].reshape(1, -1)

        starting_point = starting_sum / len(paths)
        return starting_point

    @staticmethod
    def compute_normalization_factor(
        embeddings: np.ndarray | Dataset,
        reference_point: np.ndarray,
        n_neighbors: int = 100,
    ) -> float:
        """
        Compute a normalization factor using nearest neighbors distance.

        Args:
            embeddings: Full embedding space for the computation
            reference_point: The reference point to use
            n_neighbors: Number of neighbors to consider

        Returns:
            float: Mean distance to nearest neighbors
        """
        knner = NearestNeighbors(n_neighbors=n_neighbors)
        knner.fit(embeddings)
        dknn, _ = knner.kneighbors(reference_point)
        return float(np.mean(dknn))

    @staticmethod
    def compute_relative_distances(
        path: np.ndarray,
        reference_point: np.ndarray,
        normalization_factor: float,
    ) -> np.ndarray:
        """
        Compute distances of each trajectory path point to the reference
        point, normalized by the given factor.

        Args:
            path: Array of points forming a trajectory
            reference_point: Reference point to measure distances from
            normalization_factor: Factor to normalize distances

        Returns:
            numpy.ndarray: Normalized distances
        """
        # Calculate Euclidean distances from each point to reference
        distances = spatial.distance.cdist(
            path,
            reference_point,
            metric="euclidean",
        )

        # Normalize by factor and return a flattened array
        return (distances / normalization_factor).flatten()

    @staticmethod
    def compute_statistics(
        distances: list[np.ndarray],
        timestamps: list[np.ndarray],
    ) -> TrajectoryStatistics:
        """
        Compute statistics across computations for a specific trajectory.

        Args:
            distances: Relative distances series for each computation
            timestamps: Timestamps series for each computation

        Returns:
            Named tuple containing:
            - median_distances: Median of relative distances across computations
            - median_timestamps: Median of timestamps across computations
            - lower_deciles: 10th percentile of distances
            - upper_deciles: 90th percentile of distances
        """
        median_distances = np.median(distances, axis=0)
        median_timestamps = np.median(timestamps, axis=0)
        lower_deciles = np.percentile(distances, 10, axis=0)
        upper_deciles = np.percentile(distances, 90, axis=0)

        return TrajectoryStatistics(
            median_distances=median_distances,
            median_timestamps=median_timestamps,
            lower_deciles=lower_deciles,
            upper_deciles=upper_deciles,
        )
