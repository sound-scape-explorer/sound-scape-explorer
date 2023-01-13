from enum import Enum


class Indicator(Enum):
    AcousticComplexityIndex = 'ACI'
    AcousticDiversityIndex = 'ADI'
    BioAcousticIndex = 'BI'
    EnvelopeMedian = 'MED'
    EquivalentLevel = 'Leq_T'
    FrequencyEntropy = 'Hf'
    NormalizedDifferenceSoundscapeIndex = 'NDSI'
    TemporalEntropy = 'Ht'
