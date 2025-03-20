from processing.context import Context
from processing.new.AutoclusterManager import AutoclusterManager
from processing.new.BandManager import BandManager
from processing.new.DigesterManager import DigesterManager
from processing.new.ExtractorManager import ExtractorManager
from processing.new.FileManager import FileManager
from processing.new.IndexManager import IndexManager
from processing.new.IntegrationManager import IntegrationManager
from processing.new.RangeManager import RangeManager
from processing.new.ReducerManager import ReducerManager
from processing.new.SettingsManager import SettingsManager
from processing.new.TrajectoryManager import TrajectoryManager
from processing.new.VersionManager import VersionManager


class ConfigManager:
    @staticmethod
    def to_storage(context: Context):
        VersionManager.to_storage(context)
        SettingsManager.to_storage(context)
        FileManager.to_storage(context)
        BandManager.to_storage(context)
        IntegrationManager.to_storage(context)
        ExtractorManager.to_storage(context)
        IndexManager.to_storage(context)
        RangeManager.to_storage(context)
        AutoclusterManager.to_storage(context)
        TrajectoryManager.to_storage(context)
        DigesterManager.to_storage(context)
        ReducerManager.to_storage(context)

    @staticmethod
    def exists(context: Context):
        return (
            VersionManager.exists(context)
            and SettingsManager.exists(context)
            and FileManager.exists(context)
            and BandManager.exists(context)
            and IntegrationManager.exists(context)
            and ExtractorManager.exists(context)
            and IndexManager.exists(context)
            and RangeManager.exists(context)
            and AutoclusterManager.exists(context)
            and TrajectoryManager.exists(context)
            and DigesterManager.exists(context)
            and ReducerManager.exists(context)
        )
