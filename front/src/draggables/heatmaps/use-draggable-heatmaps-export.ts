import {Csv} from 'src/common/csv';
import {useStorageDigested} from 'src/composables/use-storage-digested';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';

export function useDraggableHeatmapsExport() {
  const {digested} = useStorageDigested();
  const {x, y, values} = useDraggableHeatmapsChart();

  const handleClick = () => {
    if (
      digested.value === null ||
      x.value.length === 0 ||
      values.value.length === 0
    ) {
      return;
    }

    const csv = new Csv();
    const isPairing = digested.value.isPairing;
    csv.addColumn('y');

    x.value.forEach((x) => {
      csv.addColumn(x);
    });

    values.value.forEach((vs, index) => {
      csv.createRow();
      if (values.value.length === 1) {
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

    csv.download('digested.csv');
  };

  return {
    handleClick: handleClick,
  };
}
