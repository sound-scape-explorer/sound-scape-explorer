from enum import Enum


class StoragePath(Enum):
    # Configuration
    configuration = '/configuration'

    # Bands

    bands = '/bands'
    bands_frequencies = '/bands_frequencies'

    # Integrations

    integrations = '/integrations'
    integrations_seconds = '/integrations_seconds'

    # Ranges

    ranges = '/ranges'
    ranges_timestamps = '/ranges_timestamps'

    # Files

    files = '/files'  # Example: /files_features/{band}/{file_index}
    files_features = '/files_features'
    files_timestamps = '/files_timestamps'
    files_sites = '/files_sites'
    files_metas = '/files_metas'

    meta_properties = '/meta_properties'
    meta_sets = '/meta_sets'

    # Grouped

    # Example: /grouped_features/{band}/{integration}/{file_index}
    grouped_features = '/grouped_features'
    grouped_timestamps = '/grouped_timestamps'

    # Reducers

    reducers = '/reducers'
    reducers_dimensions = '/reducers_dimensions'
    reducers_bands = '/reducers_bands'
    reducers_integrations = '/reducers_integrations'
    reducers_ranges = '/reducers_ranges'

    # Reduced

    reduced_ = '/reduced_'  # Example: /reduced_{reducer_index}

    # Indicators

    indicators = '/indicators'

    indicator_leq_enes = '/indicator_Leq_T_enes'
    indicator_leq_maad = '/indicator_Leq_T_maad'
    indicator_temporal_median = '/indicator_MED'
    indicator_temporal_entropy = '/indicator_Ht'
    indicator_frequency_entropy = '/indicator_Hf'
    indicator_acoustic_complexity_index = '/indicator_ACI'
    indicator_acoustic_diversity_index = '/indicator_ADI'
    indicator_bioacoustics_index = '/indicator_BI'
    indicator_soundscape_index = '/indicator_NDSI'

    # Volumes

    volumes = '/volumes'

    volume_sum_var = '/volume_sum_var'
    volume_sum_std = '/volume_sum_std'
    volume_mean_std = '/volume_mean_std'
    volume_mean_spreading = '/volume_mean_spreading'

    # Misc

    umaps = '/umaps'
    umaps_integrations = '/umaps_integrations'
    umaps_bands = '/umaps_bands'
    umaps_ranges = '/umaps_ranges'
    umaps_sites = '/umaps_sites'

    groups_features_reduced_umap_2d = '/groups_features_reduced_umap_2d'
    groups_features_reduced_umap_3d = '/groups_features_reduced_umap_3d'

    groups_features_reduced_pca_2d = '/groups_features_reduced_pca_2d'
    groups_features_reduced_pca_3d = '/groups_features_reduced_pca_3d'

    groups_features_reduced_sparse_pca_2d = \
        '/groups_features_reduced_sparse_pca_2d'
    groups_features_reduced_sparse_pca_3d = \
        '/groups_features_reduced_sparse_pca_3d'

    groups_features_reduced_vae_2d = '/groups_features_reduced_vae_2d'
    groups_features_reduced_vae_3d = '/groups_features_reduced_vae_3d'
