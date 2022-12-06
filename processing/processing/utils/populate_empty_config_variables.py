from processing.constants import AUDIO_BASE, AUDIO_SUFFIX, FEATURE_BASE, \
    GENERATED_BASE, OTHER_BASE


def populate_empty_config_variables(variables):
    if variables['audio_base'] == 'nan':
        variables['audio_base'] = AUDIO_BASE

    if variables['audio_suffix'] == 'nan':
        variables['audio_suffix'] = AUDIO_SUFFIX

    if variables['feature_base'] == 'nan':
        variables['feature_base'] = FEATURE_BASE

    if variables['generated_base'] == 'nan':
        variables['generated_base'] = GENERATED_BASE

    if variables['other_base'] == 'nan':
        variables['other_base'] = OTHER_BASE

    if variables['umap_random'] == 'nan':
        variables['umap_random'] = None

    return variables
