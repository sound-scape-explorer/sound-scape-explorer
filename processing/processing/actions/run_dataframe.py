import argparse

from main import Arguments
from pandas import DataFrame

from processing.storage.Storage import Storage


def run_dataframe(
    storage: Storage,
    band: str,
    integration: int,
) -> DataFrame:
    payload = {}

    # Indexes
    payload["point_index"] = []  # Flat index
    payload["file_index"] = []
    payload["group_index"] = []
    payload["file_name"] = []
    payload["file_timestamp"] = []
    payload["file_duration"] = []

    point_index = 0
    filenames = storage.read_files()

    for (
        file_index,
        groups_count,
        file_timestamp,
        file_duration,
        _,
    ) in storage.enumerate_files(band=band, integration=integration):
        for group_index in range(groups_count):
            payload["point_index"].append(point_index)
            payload["file_index"].append(file_index)
            payload["group_index"].append(group_index)
            payload["file_name"].append(filenames[file_index])
            payload["file_timestamp"].append(file_timestamp)
            payload["file_duration"].append(file_duration)

            point_index += 1

    # Timestamps
    payload["group_timestamp"] = []
    for group_timestamp in storage.read_grouped_timestamps(band, integration):
        payload["group_timestamp"].append(group_timestamp[0])

    # Durations
    payload["group_duration"] = []
    durations = storage.read_grouped_durations(band=band, integration=integration)
    for _, g in storage.enumerate_group_indexes(band=band, integration=integration):
        group_duration = durations[g][0]
        payload["group_duration"].append(group_duration)

    # Autocluster
    try:
        payload["meta_AUTOCLUSTER"] = storage.read_autocluster(band, integration)
    except KeyError:
        print("Autocluster data not found!")

    # Metas
    files = storage.read_config_files()
    meta_properties = storage.read_meta_properties()
    meta_properties = meta_properties[1:]
    meta_properties = [f"meta_{property}" for property in meta_properties]
    metas = [file.meta for file in files.values()]

    for mp, meta_property in enumerate(meta_properties):
        payload[meta_property] = []

        for f, _ in storage.enumerate_group_indexes(band, integration):
            meta_value = metas[f][mp]
            payload[meta_property].append(meta_value)

    # Reducers
    try:
        reducers = storage.get_grouped_reducers(band, integration)
        reduced_features = storage.get_reduced_features(reducers, band, integration)
        for reducer in reducers:
            for d in range(reducer.dimensions):
                name = f"{reducer.name}{reducer.index}_{d+1}"
                payload[name] = [rf[d] for rf in reduced_features[reducer.index]]
    except KeyError:
        print("Reducers data not found!")

    # Grouped features
    grouped_features = storage.read_grouped_features_all_files(band, integration)
    for feature_index in range(128):
        name = f"f_{feature_index+1}"
        payload[name] = [gf[feature_index] for gf in grouped_features[:]]

    df = DataFrame(payload)

    return df


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(Arguments.band[0], Arguments.band[1])
    parser.add_argument(Arguments.integration[0], Arguments.integration[1])
    parser.add_argument(Arguments.storage[0], Arguments.storage[1])
    parser.add_argument(Arguments.output[0], Arguments.output[1])

    args = parser.parse_args()

    storage = Storage(path=str(args.storage))
    band = str(args.band)
    integration = int(args.integration)

    df = run_dataframe(storage=storage, band=band, integration=integration)

    print(df)

    output = str(args.output)
    df.to_csv(path_or_buf=output, index=False)
