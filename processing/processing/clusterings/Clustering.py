from processing.clusterings.ClusteringName import ClusteringName


class Clustering:
    names = set(name.value for name in ClusteringName)

    @staticmethod
    def validate_name(name: str) -> None:
        """The validator for clustering names.

        Args:
            name: The clustering name to validate.

        Returns:
            None

        Raises:
            KeyError: An error occured because the clustering name has not been found.
        """
        if name in Clustering.names:
            return

        raise KeyError(f"Clustering {name} not found!")
