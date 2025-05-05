from h5py import Dataset


# todo: refactor me
def filter_features_by_tag_and_time(
    features: Dataset,
    timestamps: list[int],
    timestamp_start: int,  # UNIX timestamp in milliseconds
    timestamp_end: int,  # UNIX timestamp in milliseconds
    all_tag_names: list[str],
    all_tag_values: list[list[str]],
    trajectory_tag_name: str,
    trajectory_tag_value: str,
) -> tuple[list[list[float]], list[int]]:
    filtered_features = []
    filtered_timestamps: list[int] = []
    tag_name_index = all_tag_names.index(trajectory_tag_name)

    for index, timestamp in enumerate(timestamps):
        tag_values = all_tag_values[index]
        tag_value = tag_values[tag_name_index]

        if (
            timestamp <= timestamp_start
            or timestamp >= timestamp_end
            or tag_value != trajectory_tag_value
        ):
            continue

        filtered_features.append(features[index])
        filtered_timestamps.append(timestamp)

    return filtered_features, filtered_timestamps
