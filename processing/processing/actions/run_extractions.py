from typing import Dict, List

import numpy as np
from tqdm import tqdm

from processing.common.Env import Env
from processing.config.BandStorage import BandStorage
from processing.config.IntegrationStorage import IntegrationStorage
from processing.config.SiteStorage import SiteStorage
from processing.extractors.Extractor import Extracted, Extractor
from processing.extractors.LeqMaadExtractor import LeqMaadExtractor
from processing.extractors.VggExtractor import VggExtractor
from processing.storage.Storage import Storage
from processing.timeline.FileLoader import FileLoader
from processing.timeline.Timeline import Timeline
from processing.utils.print_new_line import print_new_line


# run_extractions
def run_extractions(env: Env):
    storage = Storage(path=env.storage)
    storage.overwrite()
    storage.delete("/aggregated")
    storage.delete("/extracted")

    # retrieve configuration
    bands = BandStorage.read_from_storage(storage)
    integrations = IntegrationStorage.read_from_storage(storage)
    sites = SiteStorage.read_from_storage(storage)
    expected_sample_rate = storage.read_expected_sample_rate()
    timeline_origin = storage.read_timeline_origin()

    # configure extraction
    extractors: List[Extractor] = []

    leq = LeqMaadExtractor()
    leq.offset = 0
    leq.step = 1000
    leq.persist()

    extractors.append(leq)

    vgg = VggExtractor(expected_sample_rate=expected_sample_rate)
    vgg.persist()

    extractors.append(vgg)

    # build timelines
    timelines: List[Timeline] = []
    for site in sites:
        for integration in integrations:
            timeline = Timeline(
                site=site,
                integration=integration,
                storage=storage,
                origin=timeline_origin,
                # debug=True,
            )

            timelines.append(timeline)

    FileIndex = int
    BandIndex = int
    ExtractorIndex = int

    print([(t.site.name, t.integration.seconds) for t in timelines])
    loaders: Dict[FileIndex, FileLoader] = {}
    extracted: Dict[FileIndex, Dict[BandIndex, Dict[ExtractorIndex, Extracted]]] = {}
    cfi = None  # current file index

    for timeline in timelines:
        print_new_line()
        print(
            f"Walking timeline for site {timeline.site.name}"
            f" with integration {timeline.integration.seconds}"
        )

        for interval in tqdm(timeline.intervals):
            # for interval in timeline.intervals:
            for b, band in enumerate(bands):
                for e, extractor in enumerate(extractors):
                    interval_data = []

                    for b_, block in enumerate(interval.blocks):
                        f = block.file.index

                        # Load file
                        if f not in loaders.keys():
                            loader = FileLoader(block.file)
                            loader.load()

                            loaders[f] = loader

                        if f not in extracted.keys():
                            extracted[f] = {}

                        # Load band
                        if b not in extracted[f].keys():
                            extracted[f][b] = {}

                        # Load extractor
                        if e not in extracted[f][b].keys():
                            extractor.index = e
                            extractor.band = band

                            loader = loaders[f]
                            extracted[f][b][e] = extractor.extract(loader.loader)

                            if extractor.is_persist:
                                # Store only for first integration
                                # this could be above
                                if timeline.integration.index == 0:
                                    extractor.store(extracted[f][b][e], storage)

                        duration = (block.end - block.start) // 1000  # seconds
                        start = (block.start - interval.start) // 1000  # seconds
                        end = start + duration

                        file_data = extracted[f][b][e]
                        block_data = file_data[start:end]
                        interval_data = [*interval_data, *block_data]

                        is_last_integration = (
                            timeline.integration.index == len(integrations) - 1
                        )
                        is_last_band = b == len(bands) - 1
                        is_last_extractor = e == len(extractors) - 1
                        is_last_block = b_ == len(interval.blocks) - 1

                        is_last_op = (
                            is_last_integration
                            and is_last_band
                            and is_last_extractor
                            and is_last_block
                        )

                        # Purge
                        # TODO: this lefts over the last operation in memory
                        if cfi is not None and f != cfi:
                            del extracted[cfi]
                            # loaded[cfi].destroy()

                        if cfi is not None and is_last_op:
                            loaders[cfi].release()

                        cfi = f

                    # Aggregate
                    aggregated_data = list(np.mean(interval_data, axis=0))

                    path = (
                        f"/aggregated"
                        f"/{band.name}"
                        f"/{timeline.integration.seconds}"
                        f"/{extractor.index}"
                    )

                    storage.append(
                        path=path,
                        data=[aggregated_data],
                        compression=True,
                    )

    print_new_line()
    print("Memory leftovers")
    # show extracted data
    for k, v in extracted.items():
        for kk, vv in v.items():
            for kkk, vvv in vv.items():
                print(k, kk, kkk, len(vvv[0]))

    # show loaded files
    for _, loader in loaders.items():
        print(type(loader.loader.torch.audio))
        print(type(loader.loader.sound.audio))


if __name__ == "__main__":
    env = Env()
    run_extractions(env)
