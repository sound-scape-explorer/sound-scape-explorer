import {Csv} from 'src/common/csv';
import {useScatterTrajectoryAverage} from 'src/components/scatter/use-scatter-trajectory-average';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useTrajectories} from 'src/composables/use-trajectories';

export function useDraggableTrajectoriesExport() {
  const {convertTimestampToIsoDate} = useDate();
  const {trajectories, isFused} = useTrajectories();
  const {generate} = useExportName();
  const {build} = useScatterTrajectoryAverage();

  const handleClick = () => {
    const csv = new Csv();
    csv.addColumn('name');
    csv.addColumn('timestamps');
    csv.addColumn('x');
    csv.addColumn('y');
    csv.addColumn('z');

    if (isFused.value) {
      const {data, trajectory} = build(trajectories.value);

      trajectory.path.forEach((_, index) => {
        csv.createRow();
        csv.addToCurrentRow('fused');
        csv.addToCurrentRow(
          convertTimestampToIsoDate(trajectory.timestamps[index]),
        );
        csv.addToCurrentRow(data.x[index].toString());
        csv.addToCurrentRow(data.y[index].toString());
        if (typeof data.z !== 'undefined') {
          csv.addToCurrentRow(data.z[index].toString());
        }
      });
    } else {
      for (const trajectory of trajectories.value) {
        trajectory.path.forEach((coordinates, index) => {
          csv.createRow();
          csv.addToCurrentRow(trajectory.trajectory.name);
          csv.addToCurrentRow(
            convertTimestampToIsoDate(trajectory.timestamps[index]),
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
