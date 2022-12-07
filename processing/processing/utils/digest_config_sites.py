from processing.globals import all_sites as global_all_sites

all_sites = global_all_sites


def digest_config_sites(sites):
    global all_sites
    string = str(sites)

    if string == 'nan':
        return all_sites

    return string.split(',')
