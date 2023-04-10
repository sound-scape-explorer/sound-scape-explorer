from processing.common.Env import Env
from processing.common.Timer import Timer
from processing.matrices.DistanceMatrix import DistanceMatrix
from processing.matrices.OverlapMatrix import OverlapMatrix
from processing.matrices.SilhouetteMatrix import SilhouetteMatrix
from processing.storage.Storage import Storage

env = Env()
storage = Storage(path=env.storage)

files = storage.read_config_files()
bands = storage.get_bands()
integrations = storage.get_integrations_seconds()
meta_properties = storage.read_meta_properties()

matrices = [
    ['distance', DistanceMatrix],
    ['overlap', OverlapMatrix],
    ['silhouette', SilhouetteMatrix],
]

storage.delete_matrices()

timer = Timer(
    len(bands) * len(integrations) * len(matrices) * len(meta_properties)
)

for band in bands:
    for integration in integrations:
        grouped_features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
            unwrap=True,
        )

        # TODO: We should robust scale but not on grouped_features but on all
        #  features. Do we want this? Can all the grouped features fit into RAM?

        meta_values = storage.read_meta_values(band, integration)

        for matrix_index, m in enumerate(matrices):
            matrix_name = m[0]
            matrix = m[1]
            for meta_index in storage.enumerate_meta_properties():
                meta_property = meta_properties[meta_index]
                meta_property_values = meta_values[meta_index]

                instance = matrix(
                    band=band,
                    integration=integration,
                    matrix_index=matrix_index,
                    meta_index=meta_index,
                    features=grouped_features,
                    labels=meta_property_values,
                )

                instance.calculate()
                instance.store(storage)
                timer.progress()
