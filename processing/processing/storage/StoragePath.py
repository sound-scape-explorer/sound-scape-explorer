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
    bands_names = "/configuration/bands/names"
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
    integrations_names = "/configuration/integrations/names"
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
    ranges_names = "/configuration/ranges/names"
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

    #######################
    # Configuration/Files #
    #######################

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
    """The site for each file.

    Each row contains a string.

    Type:
        Dataset
    """

    files_metas = "/configuration/files/metas"
    """The meta values for each file.

    Each row contains `n` columns of meta values as strings.

    Each column has the index of the corresponding meta property.

    Type:
        Dataset
    """

    ######################
    # Configuration/Meta #
    ######################

    meta_properties = "/configuration/meta/properties"
    """The meta properties specified in the configuration file.

    Each row contains a string.

    Type:
        Dataset
    """

    meta_sets = "/configuration/meta/sets"
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

    autoclusters_names = "/configuration/autoclusters/names"
    """The names of autoclusters requested in the configuration file.

    Each row is a string referring to a particular algorithm.

    Enumeration:
        ../clusterings/ClusteringName.py

    Type:
        Dataset
    """

    autoclusters_min_cluster_sizes = "/configuration/autoclusters/min_cluster_sizes"
    """The minimum count of elements within a given cluster.

    Each row contains an integer.

    Type:
        Dataset
    """

    autoclusters_min_samples = "/configuration/autoclusters/min_samples"
    """The minimum samples for autoclustering algorithms.

    Each row contains an integer.

    Type:
        Dataset
    """

    autoclusters_alphas = "/configuration/autoclusters/alphas"
    """The alpha values for autoclustering algorithms.

    Each row contains a float.

    Type:
        Dataset
    """

    autoclusters_epsilons = "/configuration/autoclusters/epsilons"
    """The epsilon values for autoclustering algorithms.

    Each row contains a float.

    Type:
        Dataset
    """

    ##############################
    # Configuration/Trajectories #
    ##############################

    trajectories_names = "/configuration/trajectories/names"
    """The names of trajectories requested in the configuration file.

    Each row is a string.

    Type:
        Dataset
    """

    trajectories_starts = "/configuration/trajectories/starts"
    """The start date for each trajectory.

    Each row contains a timestamp as an integer.

    Timestamps are in UNIX format and milliseconds.

    Type:
        Dataset
    """

    trajectories_ends = "/configuration/trajectories/ends"
    """The end date for each trajectory.

    Each row contains a timestamp as an integer.

    Timestamps are in UNIX format and milliseconds.

    Type:
        Dataset
    """

    ##########################
    # Configuration/Reducers #
    ##########################

    reducers = "/configuration/reducers/names"
    """The names of reducers requested in the configuration file.

    Each row contains a string.

    Enumeration:
        ../reducers/ReducerName.py

    Factory:
        ../reducers/Reducer.py

    Type:
        Dataset
    """

    reducers_dimensions = "/configuration/reducers/dimensions"
    """The dimensions for each reducer.

    Each row contains an integer.

    Type:
        Dataset
    """

    reducers_bands = "/configuration/reducers/bands"
    """The bands for each reducer.

    Each row contains an array of strings (stored as columns) corresponding
    to the name of the band.

    Rows are filled with empty strings `""` if needed to keep the dataset rectangular.

    Type:
        Dataset
    """

    reducers_integrations = "/configuration/reducers/integrations"
    """The integration names for each reducer.

    Each row contains an array of strings (stored as columns) corresponding
    to the name of the integration.

    Rows are filled with empty strings `""` if needed to keep the dataset rectangular.

    Type:
        Dataset
    """

    reducers_ranges = "/configuration/reducers/ranges"
    """The range names for each reducer.

    Each row contains an array of strings (stored as columns) corresponding
    to the name of the range.

    Rows are filled with empty strings `""` if needed to keep the dataset rectangular.

    Type:
        Dataset
    """

    ############################
    # Configuration/Indicators #
    ############################

    indicators = "/configuration/indicators"
    """The indicator names requested in the configuration file.

    Each row contains a string.

    Enumeration:
        ../indicators/IndicatorName.py

    Factory:
        ../indicators/Indicator.py

    Type:
        Dataset
    """

    #########################
    # Configuration/Volumes #
    #########################

    volumes = "/configuration/volumes"
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

    matrices = "/configuration/matrices"
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

    pairings = "/configuration/pairings"
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

    ##############
    # Data/Files #
    ##############

    files_features = "/files_features"
    """The 128D features for each second of audio.

    The group contains one dataset per band.
    Each dataset is named after the band.
    Each row contains an array (columns) of 128 floats.

    Example:
        /files_features/{band}

    Type:
        Group
    """

    files_timestamps = "/files_timestamps"
    """The timestamp for each file.

    Timestamps are in UNIX format and milliseconds.
    Each row contains an integer.

    Type:
        Dataset
    """

    files_durations = "/files_durations"
    """The audio durations for each file.

    Audio durations are in seconds.
    Each row contains an integer.

    Type:
        Dataset
    """

    files_group_counts = "/files_group_counts"
    """The group counts for each file.

    The group contains one dataset per integration.

    Each dataset is named after the integration value.

    Each row contains an integer.

    Each integer represents how many groups (integrations) fits within
    the file's audio duration.

    Example:
        /files_groups_count/{integration}

    Type:
        Group
    """

    ################
    # Data/Grouped #
    ################

    grouped_features = "/grouped_features"
    """The grouped (integrated) features for each file.

    The group contains one dataset per band, integration value and file.
    Each dataset is named after the file index.
    Each row contains an array (columns) of 128 floats.

    Example:
        /grouped_features/{band}/{integration}/{file_index}

    Type:
        Group
    """

    grouped_timestamps = "/grouped_timestamps"
    """The grouped timestamps for each file.

    The group contains one dataset per band and integration value.
    Each dataset is named after the integration value.
    Each row contains an integer.
    Each integer is UNIX timestamp in milliseconds.

    Example:
        /grouped_timestamps/{band}/{integration}

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
        /trajectory_{reducer_index}/{band}/{integration}

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

    ##################
    # Data/Indicator #
    ##################

    indicator_ = "/indicator_"
    """The indicator values for each grouping.

    The group contains one dataset per indicator, band and integration value.

    Each dataset is named after the integration value.

    Each row contains a float.

    This path is to be used as a prefix!

    Example:
        /indicator_{indicator_index}/{band}/{integration}

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
