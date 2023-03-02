from processing.indicators.AcousticComplexityIndexIndicator import \
    AcousticComplexityIndexIndicator
from processing.indicators.AcousticDiversityIndexIndicator import \
    AcousticDiversityIndexIndicator
from processing.indicators.BioacousticsIndexIndicator import \
    BioacousticsIndexIndicator
from processing.indicators.FrequencyEntropyIndicator import \
    FrequencyEntropyIndicator
from processing.indicators.LeqEnesIndicator import LeqEnesIndicator
from processing.indicators.LeqMaadIndicator import LeqMaadIndicator
from processing.indicators.SoundscapeIndexIndicator import \
    SoundscapeIndexIndicator
from processing.indicators.TemporalEntropyIndicator import \
    TemporalEntropyIndicator
from processing.indicators.TemporalMedianIndicator import \
    TemporalMedianIndicator

IndicatorByName = {
    'leq_enes': LeqEnesIndicator,
    'leq_maad': LeqMaadIndicator,
    'med': TemporalMedianIndicator,
    'ht': TemporalEntropyIndicator,
    'hf': FrequencyEntropyIndicator,
    'aci': AcousticComplexityIndexIndicator,
    'adi': AcousticDiversityIndexIndicator,
    'bi': BioacousticsIndexIndicator,
    'ndsi': SoundscapeIndexIndicator,
}
