from processing.globals import all_sites as global_all_sites

all_sites = global_all_sites


def list_all_sites(files):
    global all_sites

    for f in files:
        file = files[f]
        site = file[0]

        if site not in all_sites:
            all_sites.append(site)
