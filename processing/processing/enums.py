from enum import Enum


class ComputationStrategyEnum(Enum):
    UMAP = "UMAP"
    PCA = "PCA"
    EMBEDDINGS = "EMBEDDINGS"


class ExtractorImplEnum(Enum):
    BIRDNET = "BIRDNET"
    PERCH = "PERCH"
    SURF_PERCH = "SURF_PERCH"
    VGGISH = "VGGISH"
    YAMNET = "YAMNET"
    MUSIC_CLASS = "MUSIC_CLASS"
    SPECTRUM = "SPECTRUM"
    SPECTROGRAM = "SPECTROGRAM"
    MPS = "MPS"
    MFCC = "MFCC"
    NDSI = "NDSI"
    BI = "BI"
    ADI = "ADI"
    HF = "HF"
    HT = "HT"
    MED = "MED"
    ACI = "ACI"
    LEQ = "LEQ"
    LEQ_PERCENTILE = "LEQ_PERCENTILE"
    LEQ_DIFF = "LEQ_DIFF"


class AutoclusterImplEnum(Enum):
    HDBSCAN_EOM = "HDBSCAN_EOM"
    HDBSCAN_LEAF = "HDBSCAN_LEAF"


class ReducerImplEnum(Enum):
    UMAP = "UMAP"
    PCA = "PCA"


class MetricImplEnum(Enum):
    MEAN_STD = "MEAN_STD"
    MEAN_SPREADING = "MEAN_SPREADING"
    SILHOUETTE = "SILHOUETTE"
    CONTINGENCY = "CONTINGENCY"
    OVERLAP = "OVERLAP"


class MetricTypeEnum(Enum):
    ONE_D = "ONE_D"
    TWO_D = "TWO_D"
    TWO_D_PAIRING = "TWO_D_PAIRING"


class TrajectoryStepEnum(Enum):
    HOUR = "HOUR"
    DAY = "DAY"
    MONTH = "MONTH"


class StftWindowTypeEnum(Enum):
    HANN = "HANN"
    HAMMING = "HAMMING"
    BLACKMANHARRIS = "BLACKMANHARRIS"


class FrequencyScaleEnum(Enum):
    LIN = "LIN"
    LOG = "LOG"
    MEL = "MEL"


class AdiImplEnum(Enum):
    SHANNON = "SHANNON"
    SIMPSON = "SIMPSON"
    INVSIMPSON = "INVSIMPSON"

