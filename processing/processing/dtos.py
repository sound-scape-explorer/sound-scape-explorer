from typing import Optional

from pydantic import BaseModel

from processing.constants import (
    NDSI_BAND_BIO,
    NDSI_BAND_ANTHRO,
    ADI_BIN_STEP,
    ADI_DB_THRESHOLD,
    ADI_IMPL,
    SPECTRO_STFT_OVERLAP_RATIO,
    SPECTRO_STFT_WINDOW_MS,
    SPECTRO_STFT_WINDOW_TYPE,
    SPECTRO_N_BANDS,
    SPECTRO_DBFS_REF,
    HT_FRAME_SIZE,
    MED_FRAME_SIZE,
    MFCC_N_MFCC,
    LEQ_PERCENTILE_VALUE,
    LEQ_DIFF_PERCENTILE_A,
    LEQ_DIFF_PERCENTILE_B,
    LEQ_SHORT_DT,
    MPS_STFT_1_WINDOW_MS,
    MPS_STFT_1_OVERLAP_RATIO,
    MPS_STFT_2_WINDOW_MS,
    MPS_STFT_2_OVERLAP_RATIO,
    MPS_N_BANDS,
    SPECTRO_SCALE,
    MPS_SCALE,
)
from processing.enums import (
    ExtractorImpl,
    ReducerImpl,
    AutoclusterImpl,
    MetricImpl,
    AdiImpl,
    FrequencyScale,
    StftWindowType,
    ComputationStrategy,
)


class FileDto(BaseModel):
    Index: str
    Path: str
    Date: str
    Site: str
    tags: dict[str, str]


class SettingsDto(BaseModel):
    storagePath: str
    audioPath: str
    expectedSampleRate: int
    timelineOrigin: str
    audioHost: str
    timezone: str
    computationStrategy: ComputationStrategy
    computationDimensions: int
    computationIterations: int
    displaySeed: int
    memoryLimit: int | float


class BandDto(BaseModel):
    index: int
    name: str
    low: int
    high: int


class IntegrationDto(BaseModel):
    index: int
    name: str
    duration: int


class ExtractorDto(BaseModel):
    index: int
    name: str
    impl: ExtractorImpl

    window: int
    hop: int

    spectro_n_bands: int = SPECTRO_N_BANDS
    spectro_scale: FrequencyScale = SPECTRO_SCALE
    spectro_stft_window_type: StftWindowType = SPECTRO_STFT_WINDOW_TYPE
    spectro_stft_window_ms: Optional[int] = SPECTRO_STFT_WINDOW_MS
    spectro_stft_overlap_ratio: float = SPECTRO_STFT_OVERLAP_RATIO
    spectro_dbfs_ref: float = SPECTRO_DBFS_REF

    mps_n_bands: int = MPS_N_BANDS
    mps_scale: FrequencyScale = MPS_SCALE
    mps_stft_1_window_ms: Optional[int] = MPS_STFT_1_WINDOW_MS
    mps_stft_1_overlap_ratio: float = MPS_STFT_1_OVERLAP_RATIO
    mps_stft_2_window_ms: Optional[int] = MPS_STFT_2_WINDOW_MS
    mps_stft_2_overlap_ratio: float = MPS_STFT_2_OVERLAP_RATIO

    mfcc_n_mfcc: int = MFCC_N_MFCC

    ndsi_band_bio: tuple[int, int] = NDSI_BAND_BIO
    ndsi_band_anthro: tuple[int, int] = NDSI_BAND_ANTHRO

    adi_bin_step: int = ADI_BIN_STEP
    adi_db_threshold: int = ADI_DB_THRESHOLD
    adi_impl: AdiImpl = ADI_IMPL

    ht_frame_size: int = HT_FRAME_SIZE
    med_frame_size: int = MED_FRAME_SIZE

    leq_percentile_dt: float = LEQ_SHORT_DT
    leq_percentile_value: int = LEQ_PERCENTILE_VALUE

    leq_diff_dt: float = LEQ_SHORT_DT
    leq_diff_percentile_a: int = LEQ_DIFF_PERCENTILE_A
    leq_diff_percentile_b: int = LEQ_DIFF_PERCENTILE_B


class ReducerDto(BaseModel):
    index: int
    impl: ReducerImpl
    dimensions: int


class RangeDto(BaseModel):
    index: int
    name: str
    start: str
    end: str


class AutoclusterDto(BaseModel):
    index: int
    impl: AutoclusterImpl
    minClusterSize: int
    minSamples: int
    alpha: float
    epsilon: float


class MetricDto(BaseModel):
    index: int
    impl: MetricImpl


class TrajectoryDto(BaseModel):
    index: int
    name: str
    start: str
    end: str
    tagName: str
    tagValue: str
    smoothingWindow: int


class ExtractionDto(BaseModel):
    index: int
    name: str
    bands: list[BandDto]
    integrations: list[IntegrationDto]
    extractors: list[ExtractorDto]
    reducers: list[ReducerDto]
    autoclusters: list[AutoclusterDto]
    metrics: list[MetricDto]
    trajectories: list[TrajectoryDto]


class JsonDto(BaseModel):
    version: str
    settings: SettingsDto
    extractions: list[ExtractionDto]
    ranges: list[RangeDto]
    files: list[FileDto]
