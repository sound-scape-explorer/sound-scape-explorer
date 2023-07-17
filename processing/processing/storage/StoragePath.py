from enum import Enum


class StoragePath(Enum):
    """The paths for all data located in the storage file.

    File type:
        HDF

    Details:
        https://www.wikiwand.com/en/Hierarchical_Data_Format
    """

    #################
    # Configuration #
    #################

    configuration = "/configuration"
    """The information gathered from the configuration file.

    This will contain multiple groups and datasets corresponding to each tab
    of the user Excel configuration file.

    User will need to refresh using `pnpm process:config` to update data located
    inside the storage file.

    Type:
        Group
    """

    #######################
    # Configuration/Bands #
    #######################

    # INFO: This allows duplicates that can cause collisions because bands
    # are referenced by their names and not absolute indexes.
    # A solution would be to reference by index or force user to have unique names.
    bands = "/configuration/bands/names"
    """The names of specified bands.

    Each row contains a string.

    Type:
        Dataset
    """

    bands_frequencies = "/configuration/bands/frequencies"
    """The frequencies of requested bands.

    Each row contains 2 columns for each integer (low and high frequency in Hertz).

    Type:
        Dataset
    """

    ##############################
    # Configuration/Integrations #
    ##############################

    # INFO: This allows duplicates thus can cause collisions.
    # See `Configuration/Bands` annotation for more details.
    integrations = "/configuration/integrations/names"
    """The names of specified integrations.

    Each row contains a string.

    Type:
        Dataset
    """

    integrations_seconds = "/configuration/integrations/seconds"
    """The values in seconds for each band.

    Each row contains an integer.

    Type:
        Dataset
    """

    ########################
    # Configuration/Ranges #
    ########################

    # INFO: This allows duplicates thus can cause collisions.
    # See `Configuration/Bands` annotation for more details.
    ranges = "/configuration/ranges/names"
    """The names of specified ranges.

    Each row contains a string.

    Type:
        Dataset
    """

    ranges_timestamps = "/configuration/ranges/timestamps"
    """The timestamps for each range.

    Each row contains two columns of integers.
    The first column is the start date.
    The second column is the end date.

    Each date is in `milliseconds` in UNIX format.

    Type:
        Dataset
    """

    #########
    # Files #
    #########

    files = "/configuration/files/names"
    """The file paths relative to the audio folder.

    Each row contains a string.
    Each string starts with a `/`.
    This `/` is a convention because it gets merged with the audio folder path.

    Example:
        /files_features/{band}/{file_index}

    Type:
        Dataset
    """

    files_sites = "/configuration/files/sites"
    files_metas = "/configuration/files/metas"
    meta_properties = "/configuration/meta/properties"
    meta_sets = "/configuration/meta/sets"

    #####################
    # Computation UMAPs #
    #####################

    computation_umap_ = "/computation_umap_"
    """Example: /computation_umap_{computation_umap_index}/{band}/{integration}
    """

    #########################
    # Mean distances matrix #
    #########################

    mean_distances_matrix = "/mean_distances_matrix"
    """Example: /mean_distances_matrix/{band}/{integration}
    """

    ################
    # Configuration/Autoclusters #
    ################

    autoclusters_names = "/configuration/autoclusters/names"
    """The names of autoclusters requested in the configuration file.

    Each row is a string referring to a particular algorithm.

    See enumeration at
    ../clusterings/ClusteringName.py
    """

    autoclusters_min_cluster_sizes = "/configuration/autoclusters/min_cluster_sizes"
    """The minimum count of elements within a given cluster.

    Each row is an integer.
    """

    autoclusters_min_samples = "/configuration/autoclusters/min_samples"
    autoclusters_alphas = "/configuration/autoclusters/alphas"
    autoclusters_epsilons = "/configuration/autoclusters/epsilons"

    ############
    # Features #
    ############

    files_features = "/files_features"
    """The 128D features for each second of audio.

    The group contains one dataset per band.
    Each dataset is named after the band.
    Each row of each dataset represents one second of audio by a table of 128 floats.

    Example: /files_features/{band}
    """

    files_timestamps = "/files_timestamps"
    """The timestamps for each file.

    Each row is one timestamp in UNIX format.
    """

    files_durations = "/files_durations"
    """The audio durations in seconds for each file.

    Each rows is the audio length in seconds for given file index.
    """

    files_group_counts = "/files_groups_count"
    """The groups count for each file.

    The group contains one dataset per integration.
    Each dataset is named after the integration value.
    Each row represents how many groups (integrations) have been processed.

    Example: /files_groups_count/{integration}
    """

    ##########################
    # Configuration/Reducers #
    ##########################

    reducers = "/configuration/reducers/names"
    """The names of specified reducers.

    Each row contains a string.

    See enumeration at:
        ../reducers/ReducerName.py

    Type: Dataset
    """

    reducers_dimensions = "/configuration/reducers/dimensions"
    """The dimensions for each reducer.

    Each row contains an integer.

    Type: Dataset
    """

    reducers_bands = "/configuration/reducers/bands"
    """The bands for each reducer.

    Each row contains a string corresponding to the name of the band.

    Type: Dataset
    """

    reducers_integrations = "/configuration/reducers/integrations"
    reducers_ranges = "/configuration/reducers/ranges"

    ###########
    # Grouped #
    ###########

    grouped_features = "/grouped_features"
    """Example: /grouped_features/{band}/{integration}/{file_index}
    """

    grouped_timestamps = "/grouped_timestamps"

    ###########
    # Reduced #
    ###########

    reduced_ = "/reduced_"
    """Example: /reduced_{reducer_index}/{band}/{integration}
    """

    ################
    # Trajectories #
    ################

    trajectory_ = "/trajectory_"
    """Example: /trajectory_{reducer_index}/{band}/{integration}
    """

    ###############
    # Autocluster #
    ###############

    autocluster_ = "/autocluster_"
    """Example: /autocluster_{autocluster_index}/{band}/{integration}
    """

    # Actions
    indicators = "/configuration/indicators"
    volumes = "/configuration/volumes"
    matrices = "/configuration/matrices"
    pairings = "/configuration/pairings"

    # Indicators
    indicator_ = "/indicator_"

    # Volumes
    volume_ = "/volume_"

    # Matrices
    matrix_ = "/matrix_"

    # Pairings
    pairing_ = "/pairing_"
