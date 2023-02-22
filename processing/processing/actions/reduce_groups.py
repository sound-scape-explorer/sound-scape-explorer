from processing.reducers.UmapReducer import UmapReducer
from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations()
seed = storage.get_umap_seed()

storage.delete_groups_features_reduced()

for band in bands:
    for integration in integrations:
        all_features = []

        for file_index, _ in enumerate(files):
            group_features = storage.get_group_features(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for features in group_features:
                all_features.append(features)

        umap_2d = UmapReducer(
            target_dimensions=2,
            seed=seed,
        )

        features_2d_split = umap_2d.reduce_and_split(
            features=all_features,
            files_length=len(files)
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_umap_2d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_2d_split[file_index],
            )

        umap_3d = UmapReducer(
            target_dimensions=3,
            seed=seed,
        )

        features_3d_split = umap_3d.reduce_and_split(
            features=all_features,
            files_length=len(files),
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_umap_3d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_3d_split[file_index]
            )
