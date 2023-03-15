from processing.storage.Storage import Storage


def get_jr_dataframe(
    storage: Storage,
    band: str,
    integration: int,
):
    grouped_features = storage.get_grouped_features_all_files(
        band,
        integration,
        unwrap=True,
    )

    grouped_timestamps = storage.get_grouped_timestamps_all_files(
        band,
        integration,
    )

    files = storage.get_config_files()
    metas = [file.meta for file in files.values()]
    filenames = storage.get_files()

    output_filenames = []
    output_metas = []

    for file_index, _ in storage.enumerate_group_indexes(band, integration):
        output_filenames.append(filenames[file_index])
        output_metas.append(metas[file_index])

    return output_filenames, grouped_timestamps, output_metas, grouped_features
