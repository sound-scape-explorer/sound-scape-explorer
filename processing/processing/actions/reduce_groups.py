from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.SparsePcaReducer import SparsePcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.reducers.VaeReducer import VaeReducer
from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations()
seed = storage.get_umap_seed()

storage.delete_groups_features_reduced()

for band in bands:
    for integration in integrations:
        files_length = len(files)
        all_features = []

        for file_index, _ in enumerate(files):
            group_features = storage.get_group_features(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for features in group_features:
                all_features.append(features)

        # UMAP 2d

        umap_2d = UmapReducer(
            target_dimensions=2,
            seed=seed,
        )

        features_umap_2d_split = umap_2d.reduce_and_split(
            features=all_features,
            files_length=files_length
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_umap_2d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_umap_2d_split[file_index],
            )

        # UMAP 3d

        umap_3d = UmapReducer(
            target_dimensions=3,
            seed=seed,
        )

        features_umap_3d_split = umap_3d.reduce_and_split(
            features=all_features,
            files_length=files_length,
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_umap_3d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_umap_3d_split[file_index]
            )

        # PCA 2d

        pca_2d = PcaReducer(
            target_dimensions=2,
            seed=seed,
        )

        features_pca_2d_split = pca_2d.reduce_and_split(
            features=all_features,
            files_length=files_length,
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_pca_2d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_pca_2d_split[file_index],
            )

        # PCA 3d

        pca_3d = PcaReducer(
            target_dimensions=3,
            seed=seed,
        )

        features_pca_3d_split = pca_3d.reduce_and_split(
            features=all_features,
            files_length=files_length,
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_pca_3d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_pca_3d_split[file_index],
            )

        # SparsePCA 2d

        sparse_pca_2d = SparsePcaReducer(
            target_dimensions=2,
            seed=seed,
        )

        features_sparse_pca_2d_split = sparse_pca_2d.reduce_and_split(
            features=all_features,
            files_length=files_length,
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_sparse_pca_2d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_sparse_pca_2d_split[file_index],
            )

        # SparsePCA 3d

        sparse_pca_3d = SparsePcaReducer(
            target_dimensions=3,
            seed=seed,
        )

        features_sparse_pca_3d_split = sparse_pca_3d.reduce_and_split(
            features=all_features,
            files_length=files_length,
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_sparse_pca_3d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_sparse_pca_3d_split[file_index],
            )

        # VAE 2d

        vae_2d = VaeReducer(target_dimensions=2)

        features_vae_2d_split = vae_2d.reduce_and_split(
            features=all_features,
            files_length=files_length,
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_vae_2d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_vae_2d_split[file_index],
            )

        # VAE 3d

        vae_3d = VaeReducer(target_dimensions=3)

        features_vae_3d_split = vae_3d.reduce_and_split(
            features=all_features,
            files_length=files_length,
        )

        for file_index, _ in enumerate(files):
            storage.create_group_reduced_vae_3d(
                band=band,
                integration=integration,
                file_index=file_index,
                features=features_vae_3d_split[file_index],
            )
