from processing.constants import AUTOCLUSTER_PREFIX
from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.AutoclusteredManager import AutoclusteredManager
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.FusedLabel import FusedLabel
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.LabelManager import LabelManager
from processing.utils.get_uniques_sorted import get_uniques_sorted
from processing.utils.get_uniques_unsorted import get_uniques_unsorted


class LabelFusionAdapter:
    @staticmethod
    def _read_flat(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ):
        properties: list[str] = LabelManager.get_properties(context)

        aggregated = AggregatedManager.from_storage(
            context,
            band,
            integration,
            extractor,
        )

        values: list[list[str]] = aggregated.labels

        autoclusters = context.config.autoclusters
        for autocluster in reversed(autoclusters):
            autoclustered = AutoclusteredManager.from_storage(
                context,
                band,
                integration,
                extractor,
                autocluster,
            )

            properties.insert(0, f"{AUTOCLUSTER_PREFIX}{autocluster.index}")

            for i in range(len(values)):
                values[i] = [str(autoclustered[i]), *values[i]]

        return properties, values

    @staticmethod
    def from_storage(
        context: Context,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ):
        properties, values = LabelFusionAdapter._read_flat(
            context,
            band,
            integration,
            extractor,
        )

        fused_labels: list[FusedLabel] = []

        for i in range(len(properties)):
            fused_property = properties[i]
            fused_values = []

            for v in values:
                fused_values.append(v[i])

            fused_label = FusedLabel(
                index=i,
                property=fused_property,
                values=fused_values,
                uniques_sorted=get_uniques_sorted(fused_values),
                uniques_unsorted=get_uniques_unsorted(fused_values),
            )

            fused_labels.append(fused_label)

        return fused_labels
