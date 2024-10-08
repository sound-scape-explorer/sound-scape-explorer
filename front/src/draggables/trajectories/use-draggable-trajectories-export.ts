import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/use-date';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {EXPORT_FILENAME} from 'src/constants';
import {buildAverageTrajectory} from 'src/utils/build-average-trajectory';

export function useDraggableTrajectoriesExport() {
  const {convertTimestampToIsoDate} = useDate();
  const {traceds, isFused} = useTrajectoriesData();

  const handleClick = () => {
    const csv = new Csv();
    csv.addColumn('name');
    csv.addColumn('timestamps');
    csv.addColumn('relativeTimestamps');
    csv.addColumn('x');
    csv.addColumn('y');
    csv.addColumn('z');

    if (isFused.value) {
      const {data, traced} = buildAverageTrajectory(traceds.value);

      traced.data.forEach((_, index) => {
        csv.createRow();
        csv.addToCurrentRow('fused');
        csv.addToCurrentRow(
          convertTimestampToIsoDate(traced.timestamps[index]),
        );
        csv.addToCurrentRow(traced.relativeTimestamps[index].toString());
        csv.addToCurrentRow(data.x[index].toString());
        csv.addToCurrentRow(data.y[index].toString());
        if (typeof data.z !== 'undefined') {
          csv.addToCurrentRow(data.z[index].toString());
        }
      });
    } else {
      for (const traced of traceds.value) {
        traced.data.forEach((coordinates, index) => {
          csv.createRow();
          csv.addToCurrentRow(traced.trajectory.name);
          csv.addToCurrentRow(
            convertTimestampToIsoDate(traced.timestamps[index]),
          );
          csv.addToCurrentRow(traced.relativeTimestamps[index].toString());
          csv.addToCurrentRow(coordinates[0].toString());
          csv.addToCurrentRow(coordinates[1].toString());
          csv.addToCurrentRow(coordinates[2].toString());
        });
      }
    }

    csv.download(`${EXPORT_FILENAME}-trajectories.csv`);
  };

  return {
    handleClick: handleClick,
  };
}
