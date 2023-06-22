from enum import Enum


class StoragePath(Enum):
    # Configuration
    configuration = "/configuration"

    # Bands

    bands = "/configuration/bands/names"
    bands_frequencies = "/configuration/bands/frequencies"

    # Integrations

    integrations = "/configuration/integrations/names"
    integrations_seconds = "/configuration/integrations/seconds"

    # Ranges

    ranges = "/configuration/ranges/names"
    ranges_timestamps = "/configuration/ranges/timestamps"

    # Files

    # Example: /files_features/{band}/{file_index}
    files = "/configuration/files/names"
    files_sites = "/configuration/files/sites"
    files_metas = "/configuration/files/metas"

    meta_properties = "/configuration/meta/properties"
    meta_sets = "/configuration/meta/sets"

    # Features
    files_features = "/files_features"
    files_timestamps = "/files_timestamps"
    files_durations = "/files_durations"

    # Actions

    reducers = "/configuration/reducers/names"
    reducers_dimensions = "/configuration/reducers/dimensions"
    reducers_bands = "/configuration/reducers/bands"
    reducers_integrations = "/configuration/reducers/integrations"
    reducers_ranges = "/configuration/reducers/ranges"

    indicators = "/configuration/indicators"
    volumes = "/configuration/volumes"
    matrices = "/configuration/matrices"
    pairings = "/configuration/pairings"

    # Grouped

    # Example: /grouped_features/{band}/{integration}/{file_index}
    grouped_features = "/grouped_features"
    grouped_timestamps = "/grouped_timestamps"
    grouped_durations = "/grouped_durations"

    # Reduced

    # Example: /reduced_{reducer_index}
    reduced_ = "/reduced_"

    # Indicators

    indicator_ = "/indicator_"

    # Volumes

    volume_ = "/volume_"

    # Autocluster

    autocluster = "/autocluster"

    # Matrices
    matrix_ = "/matrix_"

    # Pairings
    pairing_ = "/pairing_"
