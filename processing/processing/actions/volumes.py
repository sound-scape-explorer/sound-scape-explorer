from processing.storage.Storage import Storage
from processing.volumes.MeanSpreadingVolume import MeanSpreadingVolume
from processing.volumes.MeanStandardDeviationVolume import \
    MeanStandardDeviationVolume
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

            sum_var = SumVarianceVolume(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            sum_std = SumStandardDeviationVolume(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            mean_std = MeanStandardDeviationVolume(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            mean_spreading = MeanSpreadingVolume(
                band=band,
                integration=integration,
                file_index=file_index,
            )

            for group_index, features in enumerate(group):
                sum_var.calculate(features)
                sum_std.calculate(features)
                mean_std.calculate(features)
                mean_spreading.calculate(features)

            sum_var.store(storage)
            sum_std.store(storage)
            mean_std.store(storage)
            mean_spreading.store(storage)
