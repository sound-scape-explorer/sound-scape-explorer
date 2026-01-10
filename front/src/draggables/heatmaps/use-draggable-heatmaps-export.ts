import {Csv} from 'src/common/csv';
import {useExportName} from 'src/composables/use-export-name';
import {useMetricData} from 'src/composables/use-metric-data';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';
import {useDraggableHeatmapsTags} from 'src/draggables/heatmaps/use-draggable-heatmaps-tags';

export function useDraggableHeatmapsExport() {
  const {metricData} = useMetricData();
  const {isPairing} = useDraggableHeatmaps();
  const {a, b} = useDraggableHeatmapsTags();
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

    // header
    csv.addColumn(metric.impl);

    // cols
    x.value.forEach((x) => {
      csv.addColumn(`${a.value}: ${x}`);
    });

    // rows
    series.value.forEach((values, index) => {
      csv.createRow();

      if (isPairing.value) {
        csv.addToCurrentRow(`${b.value}: ${y.value[index]}`);
      } else {
        csv.addToCurrentRow(`${a.value}: ${x.value[index]}`);
      }

      values.forEach((value) => {
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
