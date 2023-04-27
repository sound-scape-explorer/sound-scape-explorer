import argparse

import pandas

from processing.storage.Storage import Storage


def build_dataframe(
    storage: Storage,
    band: str,
    integration: int,
) -> pandas.DataFrame:
    payload = {}

    files = storage.read_config_files()

    # Files

    filenames = storage.read_files()
    output_filenames = []
    for f, _ in storage.enumerate_group_indexes(band, integration):
        output_filenames.append(filenames[f])

    payload['filenames'] = output_filenames

    # Timestamps

    timestamps = storage.get_grouped_timestamps_all_files(
        band,
        integration,
    )

    payload['timestamps'] = timestamps

    # Autocluster

    autocluster = storage.read_autocluster(band, integration)

    payload['autocluster'] = autocluster

    # Metas
    meta_properties = storage.read_meta_properties()
    # TODO: Remove after storage flattening
    meta_properties = meta_properties[1:]

    metas = [file.meta for file in files.values()]

    output_metas = []
    for f, _ in storage.enumerate_group_indexes(band, integration):
        output_metas.append(metas[f])

    for mp, meta_property in enumerate(meta_properties):
        for f in storage.enumerate_file_indexes():
            meta_value = output_metas[f][mp]
            payload[meta_property] = meta_value

    # Reducers

    reducers = storage.get_grouped_reducers(band, integration)

    reduced_features = \
        storage.get_reduced_features(reducers, band, integration)

    for reducer in reducers:
        for d in range(reducer.dimensions):
            name = f'{reducer.name}{reducer.index}_{d + 1}'
            payload[name] = [rf[d] for rf in reduced_features[reducer.index]]

    # Grouped features

    grouped_features = storage.read_grouped_features_all_files(
        band,
        integration,
        unwrap=True,
    )

    for feature_index in range(128):
        name = f'f_{feature_index + 1}'
        payload[name] = [gf[feature_index] for gf in grouped_features]

    return pandas.DataFrame(payload)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()

    parser.add_argument('-b', '--band')
    parser.add_argument('-i', '--integration')
    parser.add_argument('-c', '--csv')
    parser.add_argument('-s', '--storage')

    args = parser.parse_args()

    df = build_dataframe(
        storage=Storage(path=args.storage),
        band=args.band,
        integration=int(args.integration),
    )

    df.to_csv(path_or_buf=args.csv)
