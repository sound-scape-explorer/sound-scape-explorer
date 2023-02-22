from enum import Enum


class ConfigExcelColumn(Enum):
    settings = 'variables'
    settings_values = 'variables_'
    bands = 'bands'
    bands_values = 'bands_'
    ranges = 'ranges'
    ranges_values = 'ranges_'
    files = 'files'
    files_dates = 'files_start'
    files_sites = 'files_site'
    files_tags = 'files_tags'
    umaps = 'umaps'
    umaps_integration = 'umaps_integration'
    umaps_bands = 'umaps_bands'
    umaps_ranges = 'umaps_ranges'
    umaps_sites = 'umaps_sites'
