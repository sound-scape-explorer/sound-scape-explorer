from dataclasses import dataclass
from typing import Optional

from processing.dtos import ExtractorDto
from processing.enums import (
    ExtractorImpl,
    AdiImpl,
    FrequencyScale,
    StftWindowType,
)


@dataclass
class ExtractorConfig:
    index: int
    name: str
    impl: ExtractorImpl

    window: int
    hop: int

    spectro_n_bands: int
    spectro_scale: FrequencyScale
    spectro_stft_window_type: StftWindowType
    spectro_stft_window_ms: Optional[int]
    spectro_stft_overlap_ratio: float
    spectro_dbfs_ref: float

    mps_n_bands: int
    mps_scale: FrequencyScale
    mps_stft_1_window_ms: Optional[int]
    mps_stft_1_overlap_ratio: float
    mps_stft_2_window_ms: Optional[int]
    mps_stft_2_overlap_ratio: float

    mfcc_n_mfcc: int

    ndsi_band_bio: tuple[int, int]
    ndsi_band_anthro: tuple[int, int]

    adi_bin_step: int
    adi_db_threshold: int
    adi_impl: AdiImpl

    ht_frame_size: int
    med_frame_size: int

    leq_percentile_dt: float
    leq_percentile_value: int

    leq_diff_dt: float
    leq_diff_percentile_a: int
    leq_diff_percentile_b: int

    @classmethod
    def from_dto(cls, dto: ExtractorDto):
        return cls(
            index=dto.index,
            name=dto.name,
            impl=dto.impl,
            window=dto.window,
            hop=dto.hop,
            spectro_n_bands=dto.spectro_n_bands,
            spectro_scale=dto.spectro_scale,
            spectro_stft_window_type=dto.spectro_stft_window_type,
            spectro_stft_window_ms=dto.spectro_stft_window_ms,
            spectro_stft_overlap_ratio=dto.spectro_stft_overlap_ratio,
            spectro_dbfs_ref=dto.spectro_dbfs_ref,
            mps_n_bands=dto.mps_n_bands,
            mps_scale=dto.mps_scale,
            mps_stft_1_window_ms=dto.mps_stft_1_window_ms,
            mps_stft_1_overlap_ratio=dto.mps_stft_1_overlap_ratio,
            mps_stft_2_window_ms=dto.mps_stft_2_window_ms,
            mps_stft_2_overlap_ratio=dto.mps_stft_2_overlap_ratio,
            mfcc_n_mfcc=dto.mfcc_n_mfcc,
            ndsi_band_bio=dto.ndsi_band_bio,
            ndsi_band_anthro=dto.ndsi_band_anthro,
            adi_bin_step=dto.adi_bin_step,
            adi_db_threshold=dto.adi_db_threshold,
            adi_impl=dto.adi_impl,
            ht_frame_size=dto.ht_frame_size,
            med_frame_size=dto.med_frame_size,
            leq_percentile_dt=dto.leq_percentile_dt,
            leq_percentile_value=dto.leq_percentile_value,
            leq_diff_dt=dto.leq_diff_dt,
            leq_diff_percentile_a=dto.leq_diff_percentile_a,
            leq_diff_percentile_b=dto.leq_diff_percentile_b,
        )
