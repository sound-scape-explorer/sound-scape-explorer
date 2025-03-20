from typing import List

from processing.config.labels.LabelConfig import LabelConfig
from processing.context import Context
from processing.new.AutoclusterConfigNew import AutoclusterConfigNew
from processing.new.AutoclusteredManager import AutoclusteredPath
from processing.new.BandConfigNew import BandConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.paths import build_path


# TODO: refactor me
class AutoclusteredStorage:
    @staticmethod
    def read_from_storage(
        context: Context,
        autoclusters: List[AutoclusterConfigNew],
        band: BandConfigNew,
        integration: IntegrationConfigNew,
    ) -> List[LabelConfig]:
        storage = context.storage

        autoclustereds: List[LabelConfig] = []

        for index, autocluster in enumerate(autoclusters):
            path_suffix = [band.index, integration.index, autocluster.index]
            autoclustered = LabelConfig(index, autocluster.name)

            path = build_path(AutoclusteredPath.autoclustered.value, *path_suffix)

            path_exists = storage.exists(path)
            if not path_exists:
                continue

            values = storage.read(path)
            autoclustered.load_values(values[:])
            autoclustereds.append(autoclustered)

        return autoclustereds
