from typing import NamedTuple

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.ExtractorConfig import ExtractorConfig
from processing.config.FileConfig import FileConfig
from processing.context import Context
from processing.extractors.Extractor import ExtractedDataRaw
from processing.interfaces import ExtractedData
from processing.paths.ExtractedPath import ExtractedPath
from processing.paths.path_registry import build_path


class _Paths(NamedTuple):
    embeddings: str
    starts: str
    ends: str


class ExtractedRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ExtractedPath.EMBEDDINGS.value)
        context.storage.delete(ExtractedPath.STARTS.value)
        context.storage.delete(ExtractedPath.ENDS.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(ExtractedPath.EMBEDDINGS.value)
            and context.storage.exists(ExtractedPath.STARTS.value)
            and context.storage.exists(ExtractedPath.ENDS.value)
        )

    @staticmethod
    def _get_paths(
        extraction: ExtractionConfig,
        extractor: ExtractorConfig,
        band: BandConfig,
        file: FileConfig,
    ):
        path_suffix = [
            extraction.index,
            extractor.index,
            band.index,
            file.site,
            file.index,
        ]

        return _Paths(
            embeddings=build_path(ExtractedPath.EMBEDDINGS.value, *path_suffix),
            starts=build_path(ExtractedPath.STARTS.value, *path_suffix),
            ends=build_path(ExtractedPath.ENDS.value, *path_suffix),
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        extractor: ExtractorConfig,
        band: BandConfig,
        file: FileConfig,
    ):
        paths = ExtractedRepository._get_paths(extraction, extractor, band, file)

        embeddings = context.storage.read(paths.embeddings)
        starts = context.storage.read(paths.starts)
        ends = context.storage.read(paths.ends)

        raw = ExtractedDataRaw(
            embeddings=np.array(embeddings),
            starts=np.array(starts).flatten().tolist(),
            ends=np.array(ends).flatten().tolist(),
        )

        return ExtractedRepository.from_raw(raw, file, extractor)

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        extractor: ExtractorConfig,
        extracted: ExtractedData,
        band: BandConfig,
    ):
        paths = ExtractedRepository._get_paths(
            extraction, extractor, band, extracted.file
        )

        context.storage.append(
            path=paths.embeddings,
            data=extracted.embeddings,
        )

        context.storage.append(
            path=paths.starts,
            data=np.array([[s] for s in extracted.starts]),
        )

        context.storage.append(
            path=paths.ends,
            data=np.array([[e] for e in extracted.ends]),
        )

    @staticmethod
    def from_raw(
        raw: ExtractedDataRaw,
        file: FileConfig,
        extractor: ExtractorConfig,
    ):
        astarts = [s + file.timestamp for s in raw.starts]
        aends = [e + file.timestamp for e in raw.ends]

        return ExtractedData(
            file=file,
            extractor=extractor,
            embeddings=raw.embeddings,
            starts=raw.starts,
            ends=raw.ends,
            astarts=astarts,
            aends=aends,
        )
