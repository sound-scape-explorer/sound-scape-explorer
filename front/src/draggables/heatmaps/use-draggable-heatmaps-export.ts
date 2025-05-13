import {MetricTypeEnum} from '@shared/enums';
import {Csv} from 'src/common/csv';
import {metricTypeByImpl} from 'src/common/metric-type-by-impl';
import {useExportName} from 'src/composables/use-export-name';
import {useMetricData} from 'src/composables/use-metric-data';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';

export function useDraggableHeatmapsExport() {
  const {metricData} = useMetricData();
  const {x, y, series} = useDraggableHeatmapsChart();
  const {generate} = useExportName();

  const handleClick = () => {
    if (
      metricData.value === null ||
      x.value.length === 0 ||
      series.value.length === 0
    ) {
      return;
    }

    const metric = metricData.value.metric;
    const isPairing =
      metricTypeByImpl[metric.impl] === MetricTypeEnum.enum.TWO_D_PAIRING;

    const csv = new Csv();
    csv.addColumn('y');

    x.value.forEach((x) => {
      csv.addColumn(x);
    });

    series.value.forEach((vs, index) => {
      csv.createRow();
      if (series.value.length === 1) {
        csv.addToCurrentRow('value');
      } else if (isPairing) {
        csv.addToCurrentRow(y.value[index]);
      } else {
        csv.addToCurrentRow(x.value[index]);
      }

      vs.forEach((value) => {
        csv.addToCurrentRow(value.toString());
      });
    });

    const name = generate('heatmap');
    csv.download(name);
  };

  return {
    handleClick,
  };
}
