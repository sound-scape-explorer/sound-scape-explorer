from typing import NamedTuple

import numpy as np
import numpy.typing as npt

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.ExtractorConfig import ExtractorConfig
from processing.config.FileConfig import FileConfig
from processing.extractors.Extractor import Extractor
from processing.services.SiteService import SiteWithFiles


class ExtractedData(NamedTuple):
    file: FileConfig
    extractor: ExtractorConfig
    embeddings: np.ndarray
    starts: list[int]  # relative timestamps in ms
    ends: list[int]  # relative timestamps in ms
    astarts: list[int]  # absolute timestamps in ms
    aends: list[int]  # absolute timestamps in ms


class ExtractionIteration(NamedTuple):
    site: SiteWithFiles
    band: BandConfig
    extraction: ExtractionConfig
    extractor: ExtractorConfig
    ex: Extractor


class TimelineSlice(NamedTuple):
    extractor: ExtractorConfig
    file: FileConfig
    embeddings: np.ndarray
    astart: int  # absolute timestamp in ms
    aend: int  # absolute timestamp in ms
    rstart: int  # relative timestamp in ms (to file)
    rend: int  # relative timestamp in ms (to file)


class TimelineAggregated(NamedTuple):
    embeddings: np.ndarray
    slices: list[TimelineSlice]
    start: int  # absolute timestamp in ms
    end: int  # absolute timestamp in ms


class AggregatedData(NamedTuple):
    embeddings: np.ndarray
    start: int  # absolute timestamp in ms
    end: int  # absolute timestamp in ms
    files: list[FileConfig]
    extractors: list[ExtractorConfig]


_MetricDataKey = str | tuple[str, str]
MetricData = dict[_MetricDataKey, npt.NDArray[np.float32]]
