from typing import List, Tuple

from h5py import Dataset


def filter_features_by_label_and_time(
    features: Dataset,
    timestamps: Dataset,
    timestamp_start: int,  # UNIX timestamp in milliseconds
    timestamp_end: int,  # UNIX timestamp in milliseconds
    labels_properties: List[str],
    labels_values: Dataset,
    trajectory_label_property: str,
    trajectory_label_value: str,
) -> Tuple[List[List[float]], List[int]]:
    filtered_features = []
    filtered_timestamps: List[int] = []
    label_property_index = labels_properties.index(trajectory_label_property)

    for index, timestamp in enumerate(timestamps):
        label_values = labels_values[index]
        label_value = label_values[label_property_index].decode("utf-8")

        if (
            timestamp[0] <= timestamp_start
            or timestamp[0] >= timestamp_end
            or label_value != trajectory_label_value
        ):
            continue

        filtered_features.append(features[index])
        filtered_timestamps.append(timestamp[0])

    return filtered_features, filtered_timestamps
