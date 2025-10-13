import {Csv} from 'src/common/csv';
import {useExportName} from 'src/composables/use-export-name';
import {useMetricData} from 'src/composables/use-metric-data';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';

export function useDraggableHeatmapsExport() {
  const {metricData} = useMetricData();
  const {isPairing} = useDraggableHeatmaps();
  const {a, b} = useDraggableHeatmapsLabels();
  const {x, y, series} = useDraggableHeatmapsChart();
  const {generate} = useExportName();

  const handleClick = () => {
    if (
      metricData.value === null ||
      a.value === null ||
      x.value.length === 0 ||
      series.value.length === 0
    ) {
      return;
    }

    const metric = metricData.value.metric;
    const csv = new Csv();
    const colTitle = a.value;
    const rowTitle = b.value ? b.value : a.value;

    csv.addColumn(metric.impl);

    x.value.forEach((x) => {
      csv.addColumn(`${colTitle}: ${x}`);
    });

    series.value.forEach((vs, index) => {
      csv.createRow();
      if (series.value.length === 1) {
        csv.addToCurrentRow('value');
      } else if (isPairing) {
        csv.addToCurrentRow(`${rowTitle}: ${y.value[index]}`);
      } else {
        csv.addToCurrentRow(`${rowTitle}: ${x.value[index]}`);
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
