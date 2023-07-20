import argparse

from main import Arguments
from pandas import DataFrame

from processing.storage.Storage import Storage


def run_dataframe(
    storage: Storage,
    band_name: str,
    integration_duration: int,
) -> DataFrame:
    band = storage.find_config_band_by_name(band_name=band_name)
    integration = storage.find_config_integration_by_duration(
        integration_duration=integration_duration
    )

    payload = {}

    # Indexes
    payload["point_index"] = []  # Flat index
    payload["file_index"] = []
    payload["group_index"] = []
    payload["file_name"] = []
    payload["file_timestamp"] = []
    payload["file_duration"] = []

    filenames = storage.read_files_names()

    for (
        file_index,
        groups_count,
        file_timestamp,
        file_duration,
        _,
    ) in storage.enumerate_files(band=band, integration=integration):
        for group_index in range(groups_count):
            point_index = storage.generate_point_index(
                file_index, group_index, groups_count
            )

            payload["point_index"].append(point_index)
            payload["file_index"].append(file_index)
            payload["group_index"].append(group_index)
            payload["file_name"].append(filenames[file_index])
            payload["file_timestamp"].append(file_timestamp)
            payload["file_duration"].append(file_duration)

    # Timestamps
    payload["group_timestamp"] = []
    for group_timestamp in storage.read_grouped_timestamps(
        band=band, integration=integration
    ):
        payload["group_timestamp"].append(group_timestamp[0])

    # Autocluster
    autoclusters = storage.read_autoclusters_values(band=band, integration=integration)
    for autocluster_index, autocluster in enumerate(autoclusters):
        label = f"autocluster_{autocluster_index}"
        payload[label] = []

        for file_index, groups_count, _, _, _ in storage.enumerate_files(
            band=band,
            integration=integration,
        ):
            for group_index in range(groups_count):
                point_index = storage.generate_point_index(
                    file_index, group_index, groups_count
                )
                value = autocluster[point_index]
                payload[label].append(value)

    # Metas
    files = storage.read_config_files()
    meta_properties = storage.read_meta_properties()
    autoclusters_count = len(autoclusters)
    meta_properties = meta_properties[autoclusters_count:]
    meta_properties = [f"meta_{property}" for property in meta_properties]
    metas = [file.meta for file in files]

    for mp, meta_property in enumerate(meta_properties):
        payload[meta_property] = []

        for f, _ in storage.enumerate_group_indexes(band, integration):
            meta_value = metas[f][mp]
            payload[meta_property].append(meta_value)

    # Reducers
    try:
        reducers = storage.pick_reducers(band, integration)
        reduced_features = storage.read_all_reduced_features(
            reducers, band, integration
        )
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
    band_name = str(args.band)
    integration_duration = int(args.integration)

    df = run_dataframe(
        storage=storage,
        band_name=band_name,
        integration_duration=integration_duration,
    )

    print(df)

    output = str(args.output)
    df.to_csv(path_or_buf=output, index=False)
