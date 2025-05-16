import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {buildAverageTrajectory} from 'src/utils/trajectories';

export function useDraggableTrajectoriesExport() {
  const {convertTimestampToIsoDate} = useDate();
  const {traceds, isFused} = useTrajectoriesData();
  const {generate} = useExportName();

  const handleClick = () => {
    const csv = new Csv();
    csv.addColumn('name');
    csv.addColumn('timestamps');
    csv.addColumn('x');
    csv.addColumn('y');
    csv.addColumn('z');

    if (isFused.value) {
      const {data, traced} = buildAverageTrajectory(traceds.value);

      traced.path.forEach((_, index) => {
        csv.createRow();
        csv.addToCurrentRow('fused');
        csv.addToCurrentRow(
          convertTimestampToIsoDate(traced.timestamps[index]),
        );
        csv.addToCurrentRow(data.x[index].toString());
        csv.addToCurrentRow(data.y[index].toString());
        if (typeof data.z !== 'undefined') {
          csv.addToCurrentRow(data.z[index].toString());
        }
      });
    } else {
      for (const traced of traceds.value) {
        traced.path.forEach((coordinates, index) => {
          csv.createRow();
          csv.addToCurrentRow(traced.trajectory.name);
          csv.addToCurrentRow(
            convertTimestampToIsoDate(traced.timestamps[index]),
          );
          csv.addToCurrentRow(coordinates[0].toString());
          csv.addToCurrentRow(coordinates[1].toString());
          csv.addToCurrentRow(coordinates[2].toString());
        });
      }
    }

    const name = generate('trajectories');
    csv.download(name);
  };

  return {
    handleClick,
  };
}
