from enum import Enum


class Indicator(Enum):
    AcousticComplexityIndex = 'ACI'
    AcousticDiversityIndex = 'ADI'
    BioacousticsIndex = 'BI'
    FrequencyEntropy = 'Hf'
    NormalizedDifferenceSoundscapeIndex = 'NDSI'
    TemporalEntropy = 'Ht'
    TemporalLeq = 'Leq_T'
    TemporalMedian = 'MED'
