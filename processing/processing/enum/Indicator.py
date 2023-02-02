from enum import Enum


class Indicator(Enum):
    """The enumeration of all available indicators."""
    AcousticComplexityIndex = 'ACI'
    AcousticDiversityIndex = 'ADI'
    BioacousticsIndex = 'BI'
    FrequencyEntropy = 'Hf'
    NormalizedDifferenceSoundscapeIndex = 'NDSI'
    TemporalEntropy = 'Ht'
    TemporalLeq = 'Leq_T'
    TemporalMedian = 'MED'
