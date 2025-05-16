from enum import Enum


class StorageDomain(Enum):
    config = "config"
    extractions = "extractions"
    aggregations = "aggregations"
    reductions = "reductions"
    computations = "computations"
    mean_distance_matrix = "mean_distance_matrix"
    autoclusters = "autoclusters"
    metrics = "metrics"
    trajectories = "trajectories"
    relative_trajectories = "relative_trajectories"


class ExtractionStoragePath(Enum):
    embeddings = "embeddings"
    starts = "starts"
    ends = "ends"


class AggregationStoragePath(Enum):
    embeddings = "embeddings"
    timestamps = "timestamps"
    file_indices = "file_indices"
    file_relative_starts = "file_relative_starts"
    extractor_indices = "extractor_indices"


class TrajectoryStoragePath(Enum):
    path = "path"
    timestamps = "timestamps"


class RelativeTrajectoryStoragePath(Enum):
    distances = "distances"
    timestamps = "timestamps"
    deciles = "deciles"


class ComputationStrategy(Enum):
    UMAP = "UMAP"
    PCA = "PCA"
    EMBEDDINGS = "EMBEDDINGS"


class ExtractorImpl(Enum):
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


class AutoclusterImpl(Enum):
    HDBSCAN_EOM = "HDBSCAN_EOM"
    HDBSCAN_LEAF = "HDBSCAN_LEAF"


class ReducerImpl(Enum):
    UMAP = "UMAP"
    PCA = "PCA"


class MetricImpl(Enum):
    MEAN_STD = "MEAN_STD"
    MEAN_SPREADING = "MEAN_SPREADING"
    SILHOUETTE = "SILHOUETTE"
    CONTINGENCY = "CONTINGENCY"
    OVERLAP = "OVERLAP"


class MetricType(Enum):
    ONE_D = "ONE_D"
    TWO_D = "TWO_D"
    TWO_D_PAIRING = "TWO_D_PAIRING"


class StftWindowType(Enum):
    HANN = "HANN"
    HAMMING = "HAMMING"
    BLACKMANHARRIS = "BLACKMANHARRIS"


class FrequencyScale(Enum):
    LIN = "LIN"
    LOG = "LOG"
    MEL = "MEL"


class AdiImpl(Enum):
    SHANNON = "SHANNON"
    SIMPSON = "SIMPSON"
    INVSIMPSON = "INVSIMPSON"

