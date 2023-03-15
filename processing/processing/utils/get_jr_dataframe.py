from processing.storage.Storage import Storage


def get_jr_dataframe(
    storage: Storage,
    band: str,
    integration: int,
):
    files = storage.get_config_files()
    files_metas = [file.meta for file in files.values()]
    filenames = storage.get_files()
    grouped_features = storage.get_grouped_features_all_files(band, integration)

    output_filenames = []
    output_timestamps = []
    output_metas = []
    output_features = []

    for group_index, _ in enumerate(grouped_features):
        for file_index, features in enumerate(grouped_features[group_index]):
            timestamps = storage.get_group_timestamps(
                band,
                integration,
                file_index
            )

            output_filenames.append(filenames[group_index])
            output_timestamps.append(timestamps)
            output_metas.append(files_metas[group_index])
            output_features.append(features)

    return output_filenames, output_timestamps, output_metas, output_features
