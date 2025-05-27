import {type MetricDto} from '@shared/dtos';
import {MetricType} from '@shared/enums';
import {metricTypeByImpl} from 'src/common/metric-type-by-impl';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelection} from 'src/composables/use-view-selection';
import {type Ref, ref} from 'vue';

export interface MetricData {
  metric: MetricDto;
  values: number[][];
}

const metricData = ref<MetricData | null>(null);

export function useMetricData() {
  const {read: r} = useStorageReader();
  const {extraction, band, integration} = useViewSelection();

  const read = (
    metric: MetricDto,
    labelPropertyA: Ref<string | null>,
    labelPropertyB: Ref<string | null>,
  ) =>
    r(async (worker, file) => {
      const isPairing =
        metricTypeByImpl[metric.impl] === MetricType.enum.TWO_D_PAIRING;
      const isPairingAndNotSecondLabel =
        isPairing && labelPropertyB.value === null;

      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null ||
        labelPropertyA.value === null ||
        isPairingAndNotSecondLabel
      ) {
        return;
      }

      const values = await worker.readMetric(
        file,
        extraction.value.index,
        band.value.index,
        integration.value.index,
        metric.index,
        labelPropertyA.value,
        isPairing ? labelPropertyB.value : null,
      );

      metricData.value = {
        metric,
        values,
      };
    });

  return {
    metricData,
    read,
  };
}
