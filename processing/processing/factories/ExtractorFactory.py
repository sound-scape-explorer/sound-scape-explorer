from processing.config.BandConfig import BandConfig
from processing.config.ExtractorConfig import ExtractorConfig
from processing.enums import ExtractorImplEnum
from processing.extractors.AciExtractor import AciExtractor
from processing.extractors.AdiExtractor import AdiExtractor
from processing.extractors.BiExtractor import BiExtractor
from processing.extractors.BirdNetExtractor import BirdNetExtractor
from processing.extractors.HfExtractor import HfExtractor
from processing.extractors.HtExtractor import HtExtractor
from processing.extractors.LeqDiffExtractor import LeqDiffExtractor
from processing.extractors.LeqExtractor import LeqExtractor
from processing.extractors.LeqPercentileExtractor import LeqPercentileExtractor
from processing.extractors.MedExtractor import MedExtractor
from processing.extractors.MfccExtractor import MfccExtractor
from processing.extractors.MpsExtractor import MpsExtractor
from processing.extractors.MusicClassifierExtractor import MusicClassifierExtractor
from processing.extractors.NdsiExtractor import NdsiExtractor
from processing.extractors.PerchExtractor import PerchExtractor
from processing.extractors.SpectrogramExtractor import SpectrogramExtractor
from processing.extractors.SurfPerchExtractor import SurfPerchExtractor
from processing.extractors.VggishExtractor import VggishExtractor
from processing.extractors.YamNetExtractor import YamNetExtractor


class ExtractorFactory:
    @staticmethod
    def create(
        extractor: ExtractorConfig,
        band: BandConfig,
    ):
        if extractor.impl is ExtractorImplEnum.BIRDNET:
            instance = BirdNetExtractor(
                freq_low=band.low,
                freq_high=band.high,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.PERCH:
            instance = PerchExtractor(
                freq_low=band.low,
                freq_high=band.high,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.SURF_PERCH:
            instance = SurfPerchExtractor(
                freq_low=band.low,
                freq_high=band.high,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.VGGISH:
            instance = VggishExtractor(
                freq_low=band.low,
                freq_high=band.high,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.YAMNET:
            instance = YamNetExtractor(
                freq_low=band.low,
                freq_high=band.high,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.MUSIC_CLASS:
            instance = MusicClassifierExtractor(
                freq_low=band.low,
                freq_high=band.high,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.SPECTRUM:
            instance = SpectrogramExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                n_bands=extractor.spectro_n_bands,
                scale=extractor.spectro_scale,
                dbfs_ref=extractor.spectro_dbfs_ref,
            )
        elif extractor.impl is ExtractorImplEnum.SPECTROGRAM:
            instance = SpectrogramExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                n_bands=extractor.spectro_n_bands,
                scale=extractor.spectro_scale,
                dbfs_ref=extractor.spectro_dbfs_ref,
                stft_window_type=extractor.spectro_stft_window_type,
                stft_window_ms=extractor.spectro_stft_window_ms,
                stft_overlap_ratio=extractor.spectro_stft_overlap_ratio,
            )
        elif extractor.impl is ExtractorImplEnum.MPS:
            instance = MpsExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                n_bands=extractor.mps_n_bands,
                scale=extractor.mps_scale,
                stft_1_window_ms=extractor.mps_stft_1_window_ms,
                stft_1_overlap_ratio=extractor.mps_stft_1_overlap_ratio,
                stft_2_window_ms=extractor.mps_stft_2_window_ms,
                stft_2_overlap_ratio=extractor.mps_stft_2_overlap_ratio,
            )
        elif extractor.impl is ExtractorImplEnum.MFCC:
            instance = MfccExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                n_mfcc=extractor.mfcc_n_mfcc,
                n_bands=extractor.spectro_n_bands,
                stft_window_type=extractor.spectro_stft_window_type,
                stft_window_ms=extractor.spectro_stft_window_ms,
                stft_overlap_ratio=extractor.spectro_stft_overlap_ratio,
            )
        elif extractor.impl is ExtractorImplEnum.NDSI:
            instance = NdsiExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                band_bio=extractor.ndsi_band_bio,
                band_anthro=extractor.ndsi_band_anthro,
            )
        elif extractor.impl is ExtractorImplEnum.BI:
            instance = BiExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.ADI:
            instance = AdiExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                bin_step=extractor.adi_bin_step,
                db_threshold=extractor.adi_db_threshold,
                index=extractor.adi_impl,
            )
        elif extractor.impl is ExtractorImplEnum.HF:
            instance = HfExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.HT:
            instance = HtExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                frame_size=extractor.ht_frame_size,
            )
        elif extractor.impl is ExtractorImplEnum.MED:
            instance = MedExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                frame_size=extractor.med_frame_size,
            )
        elif extractor.impl is ExtractorImplEnum.ACI:
            instance = AciExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.LEQ:
            instance = LeqExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
            )
        elif extractor.impl is ExtractorImplEnum.LEQ_PERCENTILE:
            instance = LeqPercentileExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                dt=extractor.leq_percentile_dt,
                percentile=extractor.leq_percentile_value,
            )
        elif extractor.impl is ExtractorImplEnum.LEQ_DIFF:
            instance = LeqDiffExtractor(
                freq_low=band.low,
                freq_high=band.high,
                window_ms=extractor.window,
                hop_ms=extractor.hop,
                dt=extractor.leq_diff_dt,
                percentile_a=extractor.leq_diff_percentile_a,
                percentile_b=extractor.leq_diff_percentile_b,
            )
        else:
            raise RuntimeError(f"Could not load extractor {extractor.impl}")

        return instance
