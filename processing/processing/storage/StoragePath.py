from enum import Enum


class StoragePath(Enum):
    # Configuration
    configuration = '/configuration'

    # Bands

    bands = '/configuration/bands/names'
    bands_frequencies = '/configuration/bands/frequencies'

    # Integrations

    integrations = '/configuration/integrations/names'
    integrations_seconds = '/configuration/integrations/seconds'

    # Ranges

    ranges = '/configuration/ranges/names'
    ranges_timestamps = '/configuration/ranges/timestamps'

    # Files

    # Example: /files_features/{band}/{file_index}
    files = '/configuration/files/names'
    files_sites = '/configuration/files/sites'
    files_metas = '/configuration/files/metas'

    meta_properties = '/configuration/meta/properties'
    meta_sets = '/configuration/meta/sets'

    # Features
    features = '/files_features'
    timestamps = '/files_timestamps'

    # Actions

    reducers = '/configuration/reducers/names'
    reducers_dimensions = '/configuration/reducers/dimensions'
    reducers_bands = '/configuration/reducers/bands'
    reducers_integrations = '/configuration/reducers/integrations'
    reducers_ranges = '/configuration/reducers/ranges'

    indicators = '/configuration/indicators'

    volumes = '/configuration/volumes'

    # Grouped

    # Example: /grouped_features/{band}/{integration}/{file_index}
    group_features = '/grouped_features'
    group_timestamps = '/grouped_timestamps'

    # Reduced

    # Example: /reduced_{reducer_index}
    reduced_ = '/reduced_'

    # Indicators

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

    volume_sum_var = '/volume_sum_var'
    volume_sum_std = '/volume_sum_std'
    volume_mean_std = '/volume_mean_std'
    volume_mean_spreading = '/volume_mean_spreading'
