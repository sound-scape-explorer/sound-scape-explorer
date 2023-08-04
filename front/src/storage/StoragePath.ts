export enum StoragePath {
  /**
   * Configuration
   */
  configuration = '/configuration',

  /**
   * Configuration/Bands
   */
  bands_names = '/bands/names',
  bands_lows = '/bands/lows',
  bands_highs = '/bands/highs',

  /**
   * Configuration/Integrations
   */
  integrations_names = '/integrations/names',
  integrations_milliseconds = '/integrations/milliseconds',

  /**
   * Configuration/Ranges
   */
  ranges_names = '/configuration/ranges/names',
  ranges_starts = '/configuration/ranges/starts',
  ranges_ends = '/configuration/ranges/ends',

  /**
   * Files
   */
  files_names = '/files/names',
  files_sites = '/files/sites',
  files_labels = '/files/labels',
  files_timestamps = '/files/timestamps',
  files_durations = '/files/durations',
  files_group_counts = '/files/interval_counts',
  files_features = '/files_features',

  /**
   * Configuration/Meta
   */
  meta_properties = '/configuration/meta/properties',
  meta_sets = '/configuration/meta/sets',

  /**
   * Configuration/Autoclusters
   */
  autoclusters_names = '/configuration/autoclusters/names',
  autoclusters_min_cluster_sizes = '/configuration/autoclusters/min_cluster_sizes',
  autoclusters_min_samples = '/configuration/autoclusters/min_samples',
  autoclusters_alphas = '/configuration/autoclusters/alphas',
  autoclusters_epsilons = '/configuration/autoclusters/epsilons',

  /**
   * Config/Trajectories
   */
  trajectories_names = '/configuration/trajectories/names',
  trajectories_starts = '/configuration/trajectories/starts',
  trajectories_ends = '/configuration/trajectories/ends',

  /**
   * Configuration/Reducers
   */
  reducers_names = '/configuration/reducers/names',
  reducers_dimensions = '/configuration/reducers/dimensions',
  reducers_bands = '/configuration/reducers/bands',
  reducers_integrations = '/configuration/reducers/integrations',
  reducers_ranges = '/configuration/reducers/ranges',

  /**
   * Configuration/Indicators
   */
  indicators_names_names = '/configuration/indicators',

  /**
   * Configuration/Volumes
   */
  volumes_names_names = '/configuration/volumes',

  /**
   * Configuration/Matrices
   */
  matrices_names_names = '/configuration/matrices',

  /**
   * Configuration/Pairings
   */
  pairings_names_names = '/configuration/pairings',

  /**
   * Computation UMAPs
   * INFO: Optional
   */
  computation_umap_ = '/computation_umap_',

  /**
   * Mean distances matrix
   * INFO: Optional
   */
  mean_distances_matrix = '/mean_distances_matrix',

  /**
   * Data/Site
   */
  site_names = '/site_names',
  site_file_indexes = '/site_file_indexes',

  /**
   * Data/Grouped
   */
  group_features = '/group_features',
  group_timestamps = '/group_timestamps',
  group_site_index = '/group_site_index',

  /**
   * Data/Reduced
   */
  reduced_ = '/reduced_',

  /**
   * Data/Trajectory
   */
  trajectory_ = '/trajectory_',

  /**
   * Data/Autocluster
   */
  autocluster_ = '/autocluster_',

  /**
   * Data/Indicator
   */
  indicator_ = '/indicator_',

  /**
   * Data/Volume
   */
  volume_ = '/volume_',

  /**
   * Data/Matrix
   */
  matrix_ = '/matrix_',

  /**
   * Data/Pairing
   */
  pairing_ = '/pairing_',
}
