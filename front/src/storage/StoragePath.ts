export enum StoragePath {
  /**
   * Configuration
   */
  configuration = '/configuration',

  /**
   * Configuration/Bands
   */
  bands_names = '/configuration/bands/names',
  bands_frequencies = '/configuration/bands/frequencies',

  /**
   * Configuration/Integrations
   */
  integrations_names = '/configuration/integrations/names',
  integrations_seconds = '/configuration/integrations/seconds',

  /**
   * Configuration/Ranges
   */
  ranges_names = '/configuration/ranges/names',
  ranges_timestamps = '/configuration/ranges/timestamps',

  /**
   * Configuration/Files
   */
  files = '/configuration/files/names',
  files_sites = '/configuration/files/sites',
  files_metas = '/configuration/files/metas',

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
   * Configuration/Reducers
   */
  reducers = '/configuration/reducers/names',
  reducers_dimensions = '/configuration/reducers/dimensions',
  reducers_bands = '/configuration/reducers/bands',
  reducers_integrations = '/configuration/reducers/integrations',
  reducers_ranges = '/configuration/reducers/ranges',

  /**
   * Configuration/Indicators
   */
  indicators = '/configuration/indicators',

  /**
   * Configuration/Volumes
   */
  volumes = '/configuration/volumes',

  /**
   * Configuration/Matrices
   */
  matrices = '/configuration/matrices',

  /**
   * Configuration/Pairings
   */
  pairings = '/configuration/pairings',

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
   * Data/Files
   */
  files_features = '/files_features',
  files_timestamps = '/files_timestamps',
  files_durations = '/files_durations',
  files_group_counts = '/files_group_counts',

  /**
   * Data/Grouped
   */
  grouped_features = '/grouped_features',
  grouped_timestamps = '/grouped_timestamps',

  /**
   * Data/Reduced
   */
  reduced_ = '/reduced_',

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
