import {Csv} from 'src/common/csv';
import {useRelativeTrajectoriesData} from 'src/draggables/relative-trajectories/use-relative-trajectories-data';

export function useRelativeTrajectoriesExport() {
  const {names, labels, values, exportName} = useRelativeTrajectoriesData();

  const handleExportClick = () => {
    if (
      values.value.length === 0 ||
      labels.value.length === 0 ||
      names.value.length === 0 ||
      typeof names?.value === 'undefined'
    ) {
      return;
    }

    const csv = new Csv();

    const maxLength = values.value
      .map((values) => values.length)
      .reduce((a, b) => Math.max(a, b), 0);

    // create columns
    for (const name of names.value) {
      csv.addColumn(`${name} - relative time`);
      csv.addColumn(`${name} - relative distance`);
    }

    for (let i = 0; i < maxLength; i += 1) {
      let row: string[] = [];

      for (const j in names.value) {
        const time = labels.value[j][i];
        const distance = values.value[j][i];

        if (typeof time === 'undefined' || typeof distance === 'undefined') {
          row = [...row, '', ''];
          continue;
        }

        row = [...row, time, distance.toString()];
      }

      csv.createRow();
      csv.addToCurrentRow(row.join(csv.separator));
    }

    csv.download(exportName);
  };

  return {
    handleExportClick: handleExportClick,
  };
}
