from enum import Enum


class Indicator(Enum):
    AcousticComplexityIndex = 'ACI'
    AcousticDiversityIndex = 'ADI'
    BioacousticsIndex = 'BI'
    TemporalMedian = 'MED'
    EquivalentLevel = 'Leq_T'
    FrequencyEntropy = 'Hf'
    NormalizedDifferenceSoundscapeIndex = 'NDSI'
    TemporalEntropy = 'Ht'
