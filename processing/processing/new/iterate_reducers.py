from typing import NamedTuple, Generator

from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.ReducerConfigNew import ReducerConfigNew


class ReducerIteration(NamedTuple):
    band: BandConfigNew
    integration: IntegrationConfigNew
    extractor: ExtractorConfigNew
    reducer: ReducerConfigNew


def iterate_reducers(
    reducers: list[ReducerConfigNew],
) -> Generator[ReducerIteration, None, None]:
    for reducer in reducers:
        for band in reducer.bands:
            for integration in reducer.integrations:
                for extractor in reducer.extractors:
                    yield ReducerIteration(
                        band=band,
                        integration=integration,
                        extractor=extractor,
                        reducer=reducer,
                    )
