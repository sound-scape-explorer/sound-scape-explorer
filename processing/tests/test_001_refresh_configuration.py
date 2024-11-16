from typing import List

from hdbscan import HDBSCAN

from processing.actions.refresh_configuration import refresh_configuration
from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig
from processing.config.autoclusters.AutoclusterStorage import AutoclusterStorage
from processing.config.bands.BandConfig import BandConfig
from processing.config.bands.BandStorage import BandStorage
from processing.config.digesters.DigesterConfig import DigesterConfig
from processing.config.digesters.DigesterStorage import DigesterStorage
from processing.config.extractors.ExtractorConfig import ExtractorConfig
from processing.config.extractors.ExtractorStorage import ExtractorStorage
from processing.config.files.FileConfig import FileConfig
from processing.config.files.FileStorage import FileStorage
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.integrations.IntegrationStorage import IntegrationStorage
from processing.config.ranges.RangeConfig import RangeConfig
from processing.config.ranges.RangeStorage import RangeStorage
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.reducers.ReducerStorage import ReducerStorage
from processing.config.trajectories.TrajectoryConfig import TrajectoryConfig
from processing.config.trajectories.TrajectoryStorage import TrajectoryStorage
from processing.storage.StoragePath import StoragePath
from ._utils import get_inputs

config, storage = get_inputs()
refresh_configuration(config, storage)


def test_binary():
    exists = storage.exists_dataset(StoragePath.config_file.value)
    assert exists is True, "config binary file should exist"


def test_settings():
    exists = storage.exists_dataset(StoragePath.settings.value)
    assert exists is True, "settings should exist"


def test_bands_storage():
    names_exists = storage.exists_dataset(StoragePath.bands_names.value)
    lows_exists = storage.exists_dataset(StoragePath.bands_lows.value)
    highs_exists = storage.exists_dataset(StoragePath.bands_highs.value)

    assert (
        names_exists is True and lows_exists is True and highs_exists is True
    ), "bands should exist in storage"


def __test_band_objects(bands: List[BandConfig]):
    for index, band in enumerate(bands):
        assert band.index == index, "indices should match"
        assert type(band.index) is int, "band index should be integer"
        assert type(band.name) is str, "band name should be string"
        assert type(band.low) is int, "band low should be integer"
        assert type(band.high) is int, "band high should be integer"


def test_bands():
    __test_band_objects(config.bands)

    bands = BandStorage.read_from_storage(storage)
    __test_band_objects(bands)


def __test_integration_objects(integrations: List[IntegrationConfig]):
    for index, integration in enumerate(integrations):
        assert integration.index == index, "indices should match"
        assert type(integration.index) is int, "integration index should be integer"
        assert type(integration.name) is str, "integration name should be string"
        assert type(integration.seconds) is int, "integration seconds should be integer"


def test_integrations():
    __test_integration_objects(config.integrations)

    integrations = IntegrationStorage.read_from_storage(storage)
    __test_integration_objects(integrations)


def __test_range_objects(ranges: List[RangeConfig]):
    for index, range_ in enumerate(ranges):
        assert range_.index == index, "indices should match"
        assert type(range_.index) is int, "range index should be integer"
        assert type(range_.name) is str, "range name should be string"
        assert type(range_.start) is int, "range start should be integer"
        assert type(range_.end) is int, "range end should be integer"


def test_ranges():
    __test_range_objects(config.ranges)

    ranges = RangeStorage.read_from_storage(storage)
    __test_range_objects(ranges)


def __test_file_objects(files: List[FileConfig]):
    for index, file in enumerate(files):
        assert file.index == index, "indices should match"
        assert type(file.index) is int, "file index should be integer"
        assert type(file.name) is str, "file name should be string"
        assert type(file.path) is str, "file path should be string"
        assert type(file.audio_path) is str, "file audio path should be string"
        assert type(file.timestamp) is int, "file timestamp should be integer"
        assert type(file.duration) is int, "file duration should be integer"
        assert type(file.site) is str, "file site should be string"

        for label in file.labels:
            assert type(label) is str, "label should be string"


def test_files():
    __test_file_objects(config.files)

    files = FileStorage.read_from_storage(storage, config.settings)
    __test_file_objects(files)


def __test_extractor_objects(extractors: List[ExtractorConfig]):
    for index, extractor in enumerate(extractors):
        assert extractor.index == index, "indices should match"
        assert type(extractor.index) is int, "extractor index should be integer"
        assert type(extractor.name) is str, "extractor name should be string"
        assert type(extractor.offset) is int, "extractor offset should be integer"
        assert type(extractor.step) is int, "extractor step should be integer"
        assert type(extractor.persist) is bool, "extractor persists should be boolean"


def test_extractors():
    __test_extractor_objects(config.extractors)

    extractors = ExtractorStorage.read_from_storage(storage)
    __test_extractor_objects(extractors)


def __test_digester_objects(digesters: List[DigesterConfig]):
    for index, digester in enumerate(digesters):
        assert digester.index == index, "indices should match"
        assert type(digester.index) is int, "digester index should be integer"
        assert type(digester.name) is str, "digester name should be string"
        assert (
            type(digester.is_pairing) is bool
        ), "digester is_pairing should be boolean"


def test_digesters():
    __test_digester_objects(config.digesters)

    digesters = DigesterStorage.read_from_storage(storage)
    __test_digester_objects(digesters)


def __test_autocluster_objects(autoclusters: List[AutoclusterConfig]):
    for index, autocluster in enumerate(autoclusters):
        assert autocluster.index == index, "indices should match"
        assert type(autocluster.index) is int, "autocluster index should be integer"
        assert type(autocluster.name) is str, "autocluster name should be string"
        assert (
            type(autocluster.min_samples) is str
        ), "autocluster min_samples should be string"
        assert (
            type(autocluster.min_cluster_size) is int
        ), "autocluster min_cluster_size should be integer"
        assert type(autocluster.alpha) is float, "autocluster alpha should be float"
        assert type(autocluster.epsilon) is float, "autocluster epsilon should be float"


def __test_autocluster_instance(autocluster: AutoclusterConfig):
    assert type(autocluster.band) is BandConfig, "autocluster band should be BandConfig"

    assert (
        type(autocluster.integration) is IntegrationConfig
    ), "autocluster integration should be IntegrationConfig"

    assert (
        type(autocluster.instance) is HDBSCAN
    ), "autocluster instance should be HDBSCAN"


def test_autoclusters():
    __test_autocluster_objects(config.autoclusters)

    autoclusters = AutoclusterStorage.read_from_storage(storage)
    __test_autocluster_objects(autoclusters)

    for band in config.bands:
        for integration in config.integrations:
            for autocluster in autoclusters:
                autocluster.create_instance(band, integration)
                __test_autocluster_instance(autocluster)


def __test_trajectory_objects(trajectories: List[TrajectoryConfig]):
    for index, trajectory in enumerate(trajectories):
        assert trajectory.index == index, "indices should match"
        assert type(trajectory.index) is int, "trajectory index should be integer"
        assert type(trajectory.name) is str, "trajectory name should be string"
        assert type(trajectory.start) is int, "trajectory start should be integer"
        assert type(trajectory.end) is int, "trajectory end should be integer"
        assert (
            type(trajectory.label_property) is str
        ), "trajectory label_property should be string"
        assert (
            type(trajectory.label_value) is str
        ), "trajectory label_value should be string"

        assert type(trajectory.step) is int, "trajectory step should be integer"


def test_trajectories():
    __test_trajectory_objects(config.trajectories)

    trajectories = TrajectoryStorage.read_from_storage(storage)
    __test_trajectory_objects(trajectories)


def __test_reducer_objects(reducers: List[ReducerConfig]):
    for index, reducer in enumerate(reducers):
        assert reducer.index == index, "indices should match"
        assert type(reducer.index) is int, "reducer index should be integer"
        assert type(reducer.name) is str, "reducer name should be string"
        assert type(reducer.dimensions) is int, "reducer dimensions should be integer"

        for band in reducer.bands:
            assert type(band) is BandConfig, "band should be BandConfig"

        for integration in reducer.integrations:
            assert (
                type(integration) is IntegrationConfig
            ), "integration should be IntegrationConfig"

        for range_ in reducer.ranges:
            assert type(range_) is RangeConfig, "range_ should be RangeConfig"


def test_reducers():
    __test_reducer_objects(config.reducers)

    reducers = ReducerStorage.read_from_storage(
        storage,
        config.bands,
        config.integrations,
        config.ranges,
    )
    __test_reducer_objects(reducers)
