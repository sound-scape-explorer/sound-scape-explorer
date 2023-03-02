from processing.volumes.MeanSpreadingVolume import MeanSpreadingVolume
from processing.volumes.MeanStandardDeviationVolume import \
    MeanStandardDeviationVolume
from processing.volumes.SumStandardDeviationVolume import \
    SumStandardDeviationVolume
from processing.volumes.SumVarianceVolume import SumVarianceVolume

VolumeByName = {
    'sum_var': SumVarianceVolume,
    'sum_std': SumStandardDeviationVolume,
    'mean_std': MeanStandardDeviationVolume,
    'mean_spreading': MeanSpreadingVolume,
}
