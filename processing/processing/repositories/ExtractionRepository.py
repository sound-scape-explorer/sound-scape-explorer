from typing import NamedTuple

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.ExtractorConfig import ExtractorConfig
from processing.config.FileConfig import FileConfig
from processing.context import Context
from processing.extractors.Extractor import ExtractionDataRaw
from processing.interfaces import ExtractionData
from processing.paths.ExtractionPath import ExtractionPath
from processing.paths.PathRegistry import PathRegistry


class _Paths(NamedTuple):
    embeddings: str
    starts: str
    ends: str


class ExtractionRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ExtractionPath.EMBEDDINGS.value)
        context.storage.delete(ExtractionPath.STARTS.value)
        context.storage.delete(ExtractionPath.ENDS.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(ExtractionPath.EMBEDDINGS.value)
            and context.storage.exists(ExtractionPath.STARTS.value)
            and context.storage.exists(ExtractionPath.ENDS.value)
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
            embeddings=PathRegistry.build(
                ExtractionPath.EMBEDDINGS.value,
                *path_suffix,
            ),
            starts=PathRegistry.build(
                ExtractionPath.STARTS.value,
                *path_suffix,
            ),
            ends=PathRegistry.build(
                ExtractionPath.ENDS.value,
                *path_suffix,
            ),
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        extractor: ExtractorConfig,
        band: BandConfig,
        file: FileConfig,
    ):
        paths = ExtractionRepository._get_paths(extraction, extractor, band, file)

        embeddings = context.storage.read(paths.embeddings)
        starts = context.storage.read(paths.starts)
        ends = context.storage.read(paths.ends)

        raw = ExtractionDataRaw(
            embeddings=np.array(embeddings),
            starts=np.array(starts).flatten().tolist(),
            ends=np.array(ends).flatten().tolist(),
        )

        return ExtractionRepository.from_raw(raw, file, extractor)

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        extractor: ExtractorConfig,
        extracted: ExtractionData,
        band: BandConfig,
    ):
        paths = ExtractionRepository._get_paths(
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
        raw: ExtractionDataRaw,
        file: FileConfig,
        extractor: ExtractorConfig,
    ):
        absolute_starts = [s + file.timestamp for s in raw.starts]
        absolute_ends = [e + file.timestamp for e in raw.ends]

        return ExtractionData(
            file=file,
            extractor=extractor,
            embeddings=raw.embeddings,
            starts=raw.starts,
            ends=raw.ends,
            astarts=absolute_starts,
            aends=absolute_ends,
        )
