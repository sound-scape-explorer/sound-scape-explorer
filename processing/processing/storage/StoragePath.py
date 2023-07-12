from enum import Enum


class StoragePath(Enum):
    # Configuration
    configuration = "/configuration"

    # Bands

    bands = "/configuration/bands/names"
    bands_frequencies = "/configuration/bands/frequencies"

    # Integrations

    integrations = "/configuration/integrations/names"
    integrations_seconds = "/configuration/integrations/seconds"

    # Ranges

    ranges = "/configuration/ranges/names"
    ranges_timestamps = "/configuration/ranges/timestamps"

    # Files

    # Example: /files_features/{band}/{file_index}
    files = "/configuration/files/names"
    files_sites = "/configuration/files/sites"
    files_metas = "/configuration/files/metas"

    meta_properties = "/configuration/meta/properties"
    meta_sets = "/configuration/meta/sets"

    ################
    # Autoclusters #
    ################

    autoclusters_names = "/configuration/autoclusters/names"
    autoclusters_min_cluster_sizes = "/configuration/autoclusters/min_cluster_sizes"
    autoclusters_min_samples = "/configuration/autoclusters/min_samples"
    autoclusters_alphas = "/configuration/autoclusters/alphas"
    autoclusters_epsilons = "/configuration/autoclusters/epsilons"

    ############
    # Features #
    ############

    """The 128D features for each second of audio.

    The group contains one dataset per band.
    Each dataset is named after the band.
    Each row of each dataset represents one second of audio by a table of 128 floats.

    Path example: /files_features/{BAND}
    """
    files_features = "/files_features"

    """The timestamps for each file.

    Each row is one timestamp in UNIX format.
    """
    files_timestamps = "/files_timestamps"

    """The audio durations in seconds for each file.

    Each rows is the audio length in seconds for given file index.
    """
    files_durations = "/files_durations"

    """The groups count for each file.

    The group contains one dataset per integration.
    Each dataset is named after the integration value.
    Each row represents how many groups (integrations) have been processed.

    Path example: /files_groups_count/{INTEGRATION}
    """
    files_group_counts = "/files_groups_count"

    # Actions

    reducers = "/configuration/reducers/names"
    reducers_dimensions = "/configuration/reducers/dimensions"
    reducers_bands = "/configuration/reducers/bands"
    reducers_integrations = "/configuration/reducers/integrations"
    reducers_ranges = "/configuration/reducers/ranges"

    indicators = "/configuration/indicators"
    volumes = "/configuration/volumes"
    matrices = "/configuration/matrices"
    pairings = "/configuration/pairings"

    # Grouped

    # Example: /grouped_features/{band}/{integration}/{file_index}
    grouped_features = "/grouped_features"
    grouped_timestamps = "/grouped_timestamps"

    # Reduced

    # Example: /reduced_{reducer_index}
    reduced_ = "/reduced_"

    # Indicators

    indicator_ = "/indicator_"

    # Volumes

    volume_ = "/volume_"

    # Autocluster

    autocluster = "/autocluster"

    # Matrices
    matrix_ = "/matrix_"

    # Pairings
    pairing_ = "/pairing_"
