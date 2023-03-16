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

    indicator_ = '/indicator_'

    # Volumes

    volume_ = '/volume_'
