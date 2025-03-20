from enum import Enum
from typing import Union

from pydantic import BaseModel, model_validator

from processing.constants import LABEL_PREFIX


class ComputationStrategyDto(Enum):
    Umap = "umap"
    Pca = "pca"
    Embeddings = "embeddings"


class SettingsDto(BaseModel):
    storagePath: str
    audioPath: str
    expectedSampleRate: int
    timelineOrigin: str
    audioHost: str
    timezone: str
    computationStrategy: ComputationStrategyDto
    computationDimensions: int
    computationIterations: int
    displaySeed: int
    memoryLimit: Union[int, float]


class FileDto(BaseModel):
    Index: str
    Path: str
    Date: str
    Site: str
    labels: dict[str, str]

    class Config:
        extra = "allow"

    # noinspection PyNestedDecorators
    @model_validator(mode="before")
    @classmethod
    def __extract_labels(cls, data):
        if isinstance(data, dict):
            labels = {}

            for key in list(data.keys()):
                if key.startswith(LABEL_PREFIX):
                    prefix_len = len(LABEL_PREFIX)
                    label_name = key[prefix_len:]
                    labels[label_name] = data[key]
                    del data[key]

            data["labels"] = labels

        return data


class BandDto(BaseModel):
    index: int
    name: str
    low: int
    high: int


class IntegrationDto(BaseModel):
    index: int
    name: str
    duration: int


class ExtractorImplDto(Enum):
    vgg = "vgg"
    melogram = "melogram"
    melspectrum = "melspectrum"


class ExtractorDto(BaseModel):
    index: int
    name: str
    impl: ExtractorImplDto
    offset: int
    step: int
    isPersist: bool


class ReducerImplDto(Enum):
    umap = "umap"
    pca = "pca"


class ReducerDto(BaseModel):
    index: int
    impl: ReducerImplDto
    dimensions: int
    bands: list[BandDto]
    integrations: list[IntegrationDto]
    extractors: list[ExtractorDto]


class RangeDto(BaseModel):
    index: int
    name: str
    start: str
    end: str


class AutoclusterImplDto(Enum):
    hdbscan_eom = "hdbscan_eom"
    hdbscan_leaf = "hdbscan_leaf"


class AutoclusterDto(BaseModel):
    index: int
    impl: AutoclusterImplDto
    minClusterSize: int
    minSamples: int
    alpha: float
    epsilon: float


class DigesterImplDto(Enum):
    silhouette = "silhouette"
    contingency = "contingency"
    sum_var = "sum_var"
    sum_std = "sum_std"
    mean_std = "mean_std"
    mean_spreading = "mean_spreading"
    distance = "distance"
    overlap = "overlap"


class DigesterDto(BaseModel):
    index: int
    impl: DigesterImplDto


class TrajectoryStepDto(Enum):
    Hour = "hour"
    Day = "day"
    Month = "month"


class TrajectoryDto(BaseModel):
    index: int
    name: str
    start: str
    end: str
    labelProperty: str
    labelValue: str
    step: TrajectoryStepDto


class IndexImplDto(Enum):
    leq_maad = "leq_maad"
    ht = "ht"
    hf = "hf"
    med = "med"
    ndsi = "ndsi"
    aci = "aci"
    adi = "adi"
    bi = "bi"


class IndexDto(BaseModel):
    index: int
    impl: IndexImplDto
    offset: int
    step: int
    isPersist: bool


class JsonDto(BaseModel):
    version: str
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
