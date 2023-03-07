export enum StoragePath {
  // Configuration
  configuration = '/configuration',
  // Bands
  bands = '/configuration/bands/names',
  bands_frequencies = '/configuration/bands/frequencies',
  // Integrations
  integrations = '/configuration/integrations/names',
  integrations_seconds = '/configuration/integrations/seconds',
  // Ranges
  ranges = '/configuration/ranges/names',
  ranges_timestamps = '/configuration/ranges/timestamps',
  // Files
  files = '/configuration/files/names',
  files_features = '/configuration/files/features',
  files_timestamps = '/configuration/files/timestamps',
  files_sites = '/configuration/files/sites',
  files_metas = '/configuration/files/metas',
  meta_properties = '/configuration/meta/properties',
  meta_sets = '/configuration/meta/sets',
  // Actions
  reducers = '/configuration/reducers/names',
  reducers_dimensions = '/configuration/reducers/dimensions',
  reducers_bands = '/configuration/reducers/bands',
  reducers_integrations = '/configuration/reducers/integrations',
  reducers_ranges = '/configuration/reducers/ranges',
  indicators = '/configuration/indicators',
  volumes = '/configuration/volumes',
  // Grouped
  grouped_features = '/grouped_features',
  grouped_timestamps = '/grouped_timestamps',
  // Reduced
  reduced_ = '/reduced_',
}
