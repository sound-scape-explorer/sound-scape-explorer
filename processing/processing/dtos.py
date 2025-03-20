from enum import Enum
from typing import TypedDict, Optional


class ComputationStrategyEnum(Enum):
    Umap = "umap"
    Pca = "pca"
    Embeddings = "embeddings"


class SettingsDto(TypedDict):
    storagePath: str
    audioPath: str
    expectedSampleRate: int
    timelineOrigin: str
    audioHost: str
    timezone: str
    computationStrategy: ComputationStrategyEnum
    computationDimensions: int
    computationIterations: int
    displaySeed: int
    memoryLimit: int


class FileDto(TypedDict):
    Index: str
    Path: str
    Date: str
    Site: str
    # LABEL_xxx: str


class BandDto(TypedDict):
    index: int
    name: str
    low: int
    high: int


class IntegrationDto(TypedDict):
    index: int
    name: str
    duration: int


class ExtractorTypeEnum(Enum):
    vgg = "vgg"
    melogram = "melogram"
    melspectrum = "melspectrum"


class ExtractorDto(TypedDict):
    index: int
    name: str
    type: ExtractorTypeEnum
    offset: int
    step: int
    isPersist: bool


class ReducerTypeEnum(Enum):
    umap = "umap"
    pca = "pca"


class ReducerDto(TypedDict):
    index: int
    type: ReducerTypeEnum
    dimensions: int
    bands: list[BandDto]
    integrations: list[IntegrationDto]
    extractors: list[ExtractorDto]


class RangeDto(TypedDict):
    index: int
    name: str
    start: str
    end: str


class AutoclusterTypeEnum(Enum):
    hdbscan_eom = "hdbscan_eom"
    hdbscan_leaf = "hdbscan_leaf"


class AutoclusterDto(TypedDict):
    index: int
    type: AutoclusterTypeEnum
    minClusterSize: int
    minSamples: int
    alpha: float
    epsilon: float


class DigesterTypeEnum(Enum):
    silhouette = "silhouette"
    contingency = "contingency"
    sum_var = "sum_var"
    sum_std = "sum_std"
    mean_std = "mean_std"
    mean_spreading = "mean_spreading"
    distance = "distance"
    overlap = "overlap"


class DigesterDto(TypedDict):
    index: int
    type: DigesterTypeEnum


class TrajectoryStepEnum(Enum):
    Hour = "hour"
    Day = "day"
    Month = "month"


class TrajectoryDto(TypedDict):
    index: int
    name: str
    start: str
    end: str
    labelProperty: Optional[str]
    labelValue: Optional[str]
    step: TrajectoryStepEnum


class IndexTypeEnum(Enum):
    leq_maad = "leq_maad"
    ht = "ht"
    hf = "hf"
    med = "med"
    ndsi = "ndsi"
    aci = "aci"
    adi = "adi"
    bi = "bi"


class IndexDto(TypedDict):
    index: int
    type: IndexTypeEnum
    offset: int
    step: int
    isPersist: bool


class JsonDto(TypedDict):
    version: str
    isValid: bool
    settings: SettingsDto
    files: list[FileDto]
    bands: list[BandDto]
    integrations: list[IntegrationDto]
    extractors: list[ExtractorDto]
    reducers: list[ReducerDto]
    ranges: list[RangeDto]
    autoclusters: list[AutoclusterDto]
    digesters: list[DigesterDto]
    trajectories: list[TrajectoryDto]
    indices: list[IndexDto]
