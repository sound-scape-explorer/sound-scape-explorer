from processing.storage.Storage import Storage


def get_jr_dataframe(
    storage: Storage,
    band: str,
    integration: int,
):
    grouped_features = storage.read_grouped_features_all_files(
        band,
        integration,
        unwrap=True,
    )

    grouped_timestamps = storage.get_grouped_timestamps_all_files(
        band,
        integration,
    )

    files = storage.read_config_files()
    metas = [file.meta for file in files.values()]
    filenames = storage.read_files()

    output_filenames = []
    output_metas = []

    for file_index, _ in storage.enumerate_group_indexes(band, integration):
        output_filenames.append(filenames[file_index])
        output_metas.append(metas[file_index])

    reducers = storage.get_grouped_reducers(band, integration)
    reduced_features = storage.get_reduced_features(reducers, band, integration)

    indicators = storage.get_indicators()
    indicators_values = storage.get_indicators_values(band, integration)

    volumes = storage.read_volumes()
    volumes_values = storage.get_volumes_values(band, integration)

    return output_filenames, \
        grouped_timestamps, \
        output_metas, \
        grouped_features, \
        reducers, \
        reduced_features, \
        indicators[:], \
        indicators_values, \
        volumes[:], \
        volumes_values
