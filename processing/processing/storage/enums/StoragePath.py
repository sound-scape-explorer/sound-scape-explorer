from enum import Enum


class StoragePath(Enum):
    configuration = '/configuration'

    files = '/files'
    # Example: /files_features/{band}/{file_index}
    files_features = '/files_features'
    files_timestamps = '/files_timestamps'
    files_sites = '/files_sites'
    files_tags = '/files_tags'
    files_metas = '/files_metas'

    meta_properties = '/meta_properties'
    meta_sets = '/meta_sets'

    ranges = '/ranges'
    ranges_timestamps = '/ranges_timestamps'

    bands = '/bands'
    bands_frequencies = '/bands_frequencies'

    umaps = '/umaps'
    umaps_integrations = '/umaps_integrations'
    umaps_bands = '/umaps_bands'
    umaps_ranges = '/umaps_ranges'
    umaps_sites = '/umaps_sites'

    # Example: /groups_features/{band}/{integration}/{file_index}
    groups_features = '/groups_features'
    groups_timestamps = '/groups_timestamps'

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
