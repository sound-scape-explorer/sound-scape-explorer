from enum import Enum


class Indicator(Enum):
    AcousticComplexityIndex = 'ACI'
    AcousticDiversityIndex = 'ADI'
    BioacousticsIndex = 'BI'
    EnvelopeMedian = 'MED'
    EquivalentLevel = 'Leq_T'
    FrequencyEntropy = 'Hf'
    NormalizedDifferenceSoundscapeIndex = 'NDSI'
    TemporalEntropy = 'Ht'
