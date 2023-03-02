from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations_seconds()
seed = storage.get_umap_seed()
reducers = storage.get_config_reducers()

storage.delete_groups_features_reduced()

for band in bands:
    for integration in integrations:
        files_length = len(files)
        all_features = []

        for file_index, _ in enumerate(files):
            grouped_features = storage.get_grouped_features(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for features in grouped_features:
                all_features.append(features)

        for reducer_index, config_reducer in enumerate(reducers):
            reducer = config_reducer.create_reducer(seed)

            if band not in config_reducer.bands:
                continue

            # TODO: Map integration name and integration seconds
            # if integration not in config_reducer.integrations:
            #     continue

            # TODO: Filter range?

            features_split = reducer.reduce_and_split(
                features=all_features,
                files_length=files_length,
            )

            for file_index, _ in enumerate(files):
                storage.write_reduced(
                    band=band,
                    integration=integration,
                    file_index=file_index,
                    reducer_index=reducer_index,
                    features=features_split[file_index],
                )
