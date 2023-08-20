export enum StoragePath {
  settings = '/settings',

  // Bands
  bands_names = '/bands/names',
  bands_lows = '/bands/lows',
  bands_highs = '/bands/highs',

  // Integrations
  integrations_names = '/integrations/names',
  integrations_seconds = '/integrations/seconds',

  // Ranges
  ranges_names = '/ranges/names',
  ranges_starts = '/ranges/starts',
  ranges_ends = '/ranges/ends',

  // Files
  files_names = '/files/names',
  files_sites = '/files/sites',
  files_labels = '/files/labels',
  files_timestamps = '/files/timestamps',
  files_durations = '/files/durations',

  // Labels
  labels_properties = '/labels/properties',
  labels_sets = '/labels/sets',

  // Autoclusters
  autoclusters_names = '/autoclusters/names',
  autoclusters_min_cluster_sizes = '/autoclusters/min_cluster_sizes',
  autoclusters_min_samples = '/autoclusters/min_samples',
  autoclusters_alphas = '/autoclusters/alphas',
  autoclusters_epsilons = '/autoclusters/epsilons',

  // Trajectories
  trajectories_names = '/trajectories/names',
  trajectories_starts = '/trajectories/starts',
  trajectories_ends = '/trajectories/ends',

  // Reducers
  reducers_names = '/reducers/names',
  reducers_dimensions = '/reducers/dimensions',
  reducers_bands = '/reducers/bands',
  reducers_integrations = '/reducers/integrations',
  reducers_ranges = '/reducers/ranges',

  // Computation UMAPs (INFO: Optional)
  computation_umap_ = '/computation_umap_',

  // Mean distances matrix (INFO: Optional)
  mean_distances_matrix = '/mean_distances_matrix',

  // Sites
  sites_names = '/sites/names',
  sites_file_indexes = '/sites/file_indexes',

  // Extractors
  extractors_names = '/extractors/names',
  extractors_offsets = '/extractors/offsets',
  extractors_steps = '/extractors/steps',
  extractors_persists = '/extractors/persists',

  // Extracted
  extracted = '/extracted',

  // Aggregations
  aggregated = '/aggregated',
  aggregated_sites = '/aggregated_sites',
  aggregated_interval_details = '/aggregated_interval_details',
  aggregated_timestamps = '/aggregated_timestamps',
  aggregated_labels = '/aggregated_labels',

  // Reductions
  reduced = '/reduced',

  // Autoclusters
  autoclustered = '/autoclustered',
  computation_umap = '/computation_umap',

  // Digestions
  digested = '/digested',

  // Trajectories
  traced = '/traced',
}
