export enum StoragePath {
  /**
   * Configuration
   */
  configuration = '/configuration',

  /**
   * Configuration/Bands
   */
  bands_names = '/configuration/bands/names',
  bands_lows = '/configuration/bands/lows',
  bands_highs = '/configuration/bands/highs',

  /**
   * Configuration/Integrations
   */
  integrations_names = '/configuration/integrations/names',
  integrations_durations = '/configuration/integrations/durations',

  /**
   * Configuration/Ranges
   */
  ranges_names = '/configuration/ranges/names',
  ranges_starts = '/configuration/ranges/starts',
  ranges_ends = '/configuration/ranges/ends',

  /**
   * Configuration/Files
   */
  files_names = '/configuration/files/names',
  files_sites = '/configuration/files/sites',
  files_metas = '/configuration/files/metas',
  files_timestamps = '/files_timestamps',
  files_durations = '/files_durations',

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
   * Data/Files
   */
  files_features = '/files_features',
  files_group_counts = '/files_group_counts',

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
