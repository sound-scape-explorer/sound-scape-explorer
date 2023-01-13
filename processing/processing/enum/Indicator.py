from enum import Enum


class Indicator(Enum):
    AcousticComplexityIndex = 'ACI'
    AcousticDiversityIndex = 'ADI'
    BioacousticsIndex = 'BI'
    TemporalMedian = 'MED'
    TemporalLeq = 'Leq_T'
    FrequencyEntropy = 'Hf'
    NormalizedDifferenceSoundscapeIndex = 'NDSI'
    TemporalEntropy = 'Ht'
