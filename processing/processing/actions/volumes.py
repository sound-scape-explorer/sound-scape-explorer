from processing.storage.Storage import Storage
from processing.volumes.SumStandardDeviationVolume import \
    SumStandardDeviationVolume
from processing.volumes.SumVarianceVolume import SumVarianceVolume

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations()

storage.delete_groups_volumes()

for band in bands:
    for integration in integrations:
        for file_index, _ in enumerate(files):
            group = storage.get_group_features(band, integration, file_index)

            sumvar = SumVarianceVolume(
                storage=storage,
                band=band,
                integration=integration,
                file_index=file_index,
            )

            sumstd = SumStandardDeviationVolume(
                storage=storage,
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for group_index, features in enumerate(group):
                sumvar.calculate(features)
                sumstd.calculate(features)

            sumvar.store()
            sumstd.store()
