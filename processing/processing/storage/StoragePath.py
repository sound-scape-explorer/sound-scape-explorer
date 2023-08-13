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

    settings = "/settings"
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
    bands_names = "/bands/names"
    """The names of specified bands.

    Each row contains a string.

    Type:
        Dataset
    """

    bands_lows = "/bands/lows"
    """The low frequencies for each band.

    Each row contains one integer for the frequency in Hertz.

    Type:
        Dataset
    """

    bands_highs = "/bands/highs"
    """The high frequencies for each band.

    Each row contains one integer for the frequency in Hertz.

    Type:
        Dataset
    """

    ##############################
    # Configuration/Integrations #
    ##############################

    integrations_names = "/integrations/names"
    """The names of specified integrations.

    Each row contains a string.

    Type:
        Dataset
    """

    integrations_seconds = "/integrations/seconds"
    """The duration in seconds for each band.

    Each row contains an integer.

    Type:
        Dataset
    """

    ########################
    # Configuration/Ranges #
    ########################

    # INFO: This allows duplicates thus can cause collisions.
    # See `Configuration/Bands` annotation for more details.
    ranges_names = "/ranges/names"
    """The names of specified ranges.

    Each row contains a string.

    Type:
        Dataset
    """

    ranges_starts = "/ranges/starts"
    """The start date for each range.

    Each row contains a timestamp as an integer.

    Timestamps are in UNIX format and milliseconds.

    Type:
        Dataset
    """

    ranges_ends = "/ranges/ends"
    """The end date for each range.

    Each row contains a timestamp as an integer.

    Timestamps are in UNIX format and milliseconds.

    Type:
        Dataset
    """

    #########
    # Files #
    #########

    files_names = "/files/names"
    """The file paths relative to the audio folder.

    Each row contains a string.

    Each string starts with a `/`.

    This `/` is a convention because it gets merged with the audio folder path.

    Type:
        Dataset
    """

    files_sites = "/files/sites"
    """The site for each file.

    Each row contains a string.

    Type:
        Dataset
    """

    files_labels = "/files/labels"
    """The labels for each file.

    Each row contains `n` columns of strings.

    Each column has the index of the corresponding label property.

    Type:
        Dataset
    """

    files_timestamps = "/files/timestamps"
    """The timestamp for each file.

    Timestamps are in UNIX format and milliseconds.
    Each row contains an integer.

    Type:
        Dataset
    """

    files_durations = "/files/durations"
    """The audio durations for each file.

    Audio durations are in seconds.
    Each row contains an integer.

    Type:
        Dataset
    """

    ######################
    # Configuration/Meta #
    ######################

    labels_properties = "/labels/properties"
    """The meta properties specified in the configuration file.

    Each row contains a string.

    Type:
        Dataset
    """

    labels_sets = "/labels/sets"
    """The meta unique values (sets).

    Each row contains a variable number of strings (separated as columns).

    Each string represent a possible value given
    the meta property (referenced by its index).

    Meta sets are filled with empty strings `""` to keep the dataset rectangular.

    Type:
        Dataset
    """

    ##############################
    # Configuration/Autoclusters #
    ##############################

    autoclusters_names = "/autoclusters/names"
    """The names of autoclusters requested in the configuration file.

    Each row is a string referring to a particular algorithm.

    Enumeration:
        ../clusterings/ClusteringName.py

    Type:
        Dataset
    """

    autoclusters_min_cluster_sizes = "/autoclusters/min_cluster_sizes"
    """The minimum count of elements within a given cluster.

    Each row contains an integer.

    Type:
        Dataset
    """

    autoclusters_min_samples = "/autoclusters/min_samples"
    """The minimum samples for autoclustering algorithms.

    Each row contains an integer.

    Type:
        Dataset
    """

    autoclusters_alphas = "/autoclusters/alphas"
    """The alpha values for autoclustering algorithms.

    Each row contains a float.

    Type:
        Dataset
    """

    autoclusters_epsilons = "/autoclusters/epsilons"
    """The epsilon values for autoclustering algorithms.

    Each row contains a float.

    Type:
        Dataset
    """

    ##############################
    # Configuration/Trajectories #
    ##############################

    trajectories_names = "/trajectories/names"
    """The names of trajectories requested in the configuration file.

    Each row is a string.

    Type:
        Dataset
    """

    trajectories_starts = "/trajectories/starts"
    """The start date for each trajectory.

    Each row contains a timestamp as an integer.

    Timestamps are in UNIX format and milliseconds.

    Type:
        Dataset
    """

    trajectories_ends = "/trajectories/ends"
    """The end date for each trajectory.

    Each row contains a timestamp as an integer.

    Timestamps are in UNIX format and milliseconds.

    Type:
        Dataset
    """

    ##########################
    # Configuration/Reducers #
    ##########################

    reducers_names = "/reducers/names"
    """The names of reducers requested in the configuration file.

    Each row contains a string.

    Enumeration:
        ../reducers/ReducerName.py

    Factory:
        ../reducers/Reducer.py

    Type:
        Dataset
    """

    reducers_dimensions = "/reducers/dimensions"
    """The dimensions for each reducer.

    Each row contains an integer.

    Type:
        Dataset
    """

    reducers_bands = "/reducers/bands"
    """The bands for each reducer.

    Each row contains an array of strings (stored as columns) corresponding
    to the name of the band.

    Rows are filled with empty strings `""` if needed to keep the dataset rectangular.

    Type:
        Dataset
    """

    reducers_integrations = "/reducers/integrations"
    """The integration names for each reducer.

    Each row contains an array of strings (stored as columns) corresponding
    to the name of the integration.

    Rows are filled with empty strings `""` if needed to keep the dataset rectangular.

    Type:
        Dataset
    """

    reducers_ranges = "/reducers/ranges"
    """The range names for each reducer.

    Each row contains an array of strings (stored as columns) corresponding
    to the name of the range.

    Rows are filled with empty strings `""` if needed to keep the dataset rectangular.

    Type:
        Dataset
    """

    #########################
    # Configuration/Volumes #
    #########################

    volumes_names = "/volumes/names"
    """The volume names requested in the configuration file.

    Each row contains a string.

    Enumeration:
        ../volumes/VolumeName.py

    Factory:
        ../volumes/Volume.py

    Type:
        Dataset
    """

    ##########################
    # Configuration/Matrices #
    ##########################

    matrices_names = "/matrices/names"
    """The matrix names requested in the configuration file.

    Each row contains a string.

    Enumeration:
        ../matrices/MatrixName.py

    Factory:
        ../matrices/Matrix.py

    Type:
        Dataset
    """

    ##########################
    # Configuration/Pairings #
    ##########################

    pairings_names = "/pairings/names"
    """The pairing names requested in the configuration file.

    Each row contains a string.

    Enumeration:
        ../pairings/PairingName.py

    Factory:
        ../pairings/Pairing.py

    Type:
        Dataset
    """

    #####################
    # Computation UMAPs #
    #####################

    computation_umap_ = "/computation_umap_"
    """The computation UMAPs needed for further data generation.

    Computation UMAPs are used for:
        - Mean distances matrix
        - Trajectories

    The number of computation UMAPs is specified in the configuration file.

    The group contains one dataset per computation UMAP index (iteration),
    band and integration value.

    Each dataset is named after the integration value.

    Each row contains an array (columns) of floats.

    This path is to be used as a prefix!

    Example:
        /computation_umap_{computation_umap_index}/{band}/{integration}

    Type:
        Group prefix
    """

    #########################
    # Mean distances matrix #
    #########################

    mean_distances_matrix = "/mean_distances_matrix"
    """The mean distances matrix for further data generation.

    Mean distances matrices are used for:
        - Autoclustering

    The group contains one dataset per band and integration value.
    Each dataset is named after the integration value.
    Each row contains an array (columns) of floats.

    Example:
        /mean_distances_matrix/{band}/{integration}

    Type:
        Group
    """

    #############
    # Data/Site #
    #############

    sites_names = "/sites/names"
    """The unique site names found in the project.

    Each row contains a string.

    Type:
        Dataset
    """

    sites_file_indexes = "/sites/file_indexes"
    """The file indexes for each site.

    Each row contains one or more integers representing file indexes.

    The number of file indexes per site can varry.
    Making rectangular for storage and trimming for reconstructing is therefore needed.

    Type:
        Dataset
    """

    ################
    # Data/Grouped #
    ################

    group_features = "/group_features"
    """The group features for each file.

    The group contains one dataset per band, integration value and file.
    Each dataset is named after the file index.
    Each row contains an array (columns) of 128 floats.

    Example:
        /grouped_features/{band}/{integration}/{file_index}

    Type:
        Group
    """

    group_timestamps = "/group_timestamps"
    """The group timestamps for each file.

    The group contains one dataset per band and integration value.
    Each dataset is named after the integration value.
    Each row contains an integer.
    Each integer is UNIX timestamp in milliseconds.

    Example:
        /grouped_timestamps/{band}/{integration}

    Type:
        Group
    """

    group_site_index = "/group_site_index"
    """The site index for each group.

    Each row contains an integer.

    Example:
        /group_site_index/{band}/{integration}

    Type:
        Group
    """

    ################
    # Data/Reduced #
    ################

    reduced_ = "/reduced_"
    """The reduced features for each grouping.

    The group contains one dataset per reducer, band and integration value.

    Each dataset is named after the integration value.

    Each row contains an array (columns) of `n` dimensions requested
    in the configuration.

    Each value is a float.

    This path is to be used as a prefix!

    Example:
        /reduced_{reducer_index}/{band}/{integration}

    Type:
        Group prefix
    """

    ###################
    # Data/Trajectory #
    ###################

    trajectory_ = "/trajectory_"
    """The trajectories for each reduction.

    The group contains one dataset per reducer, band and integration value.

    Each dataset is named after the integration value.

    This path is to be used as a prefix!

    Example:
        /trajectory_{trajectory_index}/{reducer_index}/{band}/{integration}

    Type:
        Group prefix
    """

    ####################
    # Data/Autocluster #
    ####################

    autocluster_ = "/autocluster_"
    """The autocluster values (labels) for each grouping.

    The group contains one dataset per autocluster, band and integration value.

    Each dataset is named after the integration value.

    Each row contains an integer.

    This path is to be used as a prefix!

    Example:
        /autocluster_{autocluster_index}/{band}/{integration}

    Type:
        Group prefix
    """

    ###############
    # Data/Volume #
    ###############

    volume_ = "/volume_"
    """The volume values for each grouping.

    The group contains one dataset per volume, band, integration value
    and meta property.

    Each dataset is named after the meta property index.

    Each row contains a float.

    This path is to be used as a prefix!

    Example:
        /volume_{volume_index}/{band}/{integration}/{meta_property_index}

    Type:
        Group prefix
    """

    ###############
    # Data/Matrix #
    ###############

    matrix_ = "/matrix_"
    """The matrix values for each grouping.

    The group contains one dataset per matrix, band, integration value
    and meta property.

    Each dataset is named after the meta property index.

    Each row contains a float.

    This path is to be used as a prefix!

    Example:
        /matrix_{matrix_index}/{band}/{integration}/{meta_property_index}

    Type:
        Group prefix
    """

    #################
    # Data/Pairings #
    #################

    pairing_ = "/pairing_"
    """The pairing values for each grouping.

    The group contains one dataset per pairing, band, integration value,
    first meta property and second meta property.

    Each dataset is named after the second meta property index.

    Each row contains a float.

    This path is to be used as a prefix!

    Example:
        /pairing_{pairing_index}/{band}/{integration}/{meta_property_A_index}/{meta_property_B_index}

    Type:
        Group prefix
    """

    extractors = "/extractors"
    extracted = "/extracted"
    aggregated = "/aggregated"
    aggregated_timestamps = "/aggregated_timestamps"
    aggregated_labels = "/aggregated_labels"
    reduced = "/reduced"
    autoclustered = "/autoclustered"
    computation_umap = "/computation_umap"
    traced = "/traced"
    digested = "/digested"
