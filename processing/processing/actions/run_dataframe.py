import argparse

from pandas import DataFrame

from processing.storage.Storage import Storage


def run_dataframe(
    storage: Storage,
    band: str,
    integration: int,
) -> DataFrame:
    payload = {}

    # Group index
    payload["g"] = []
    for _, g in storage.enumerate_group_indexes(band, integration):
        payload["g"].append(g)

    # Timestamps
    payload["timestamp"] = []
    for timestamp in storage.read_grouped_timestamps(band, integration):
        payload["timestamp"].append(timestamp[0])

    # Filenames
    filenames = storage.read_files()
    output_filenames = []
    for f, _ in storage.enumerate_group_indexes(band, integration):
        output_filenames.append(filenames[f])

    payload["filename"] = output_filenames

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

    parser.add_argument("-b", "--band")
    parser.add_argument("-i", "--integration")
    parser.add_argument("-o", "--output")
    parser.add_argument("-s", "--storage")

    args = parser.parse_args()

    storage = Storage(path=str(args.storage))
    band = str(args.band)
    integration = int(args.integration)

    df = run_dataframe(storage=storage, band=band, integration=integration)

    print(df)

    output = str(args.output)
    df.to_csv(path_or_buf=output)
