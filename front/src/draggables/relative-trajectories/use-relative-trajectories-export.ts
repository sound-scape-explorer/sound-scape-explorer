import {Csv} from 'src/common/csv';
import {useRelativeTrajectoriesData} from 'src/draggables/relative-trajectories/use-relative-trajectories-data';

export function useRelativeTrajectoriesExport() {
  const {names, labels, values, exportName} = useRelativeTrajectoriesData();

  const handleExportClick = () => {
    if (
      values.value.length === 0 ||
      labels.value.length === 0 ||
      names.value.length === 0 ||
      // TODO: Fix me, is this mandatory?
      typeof names?.value === 'undefined'
    ) {
      return;
    }

    const csv = new Csv();

    const maxLength = values.value
      .map((values) => values.length)
      .reduce((a, b) => Math.max(a, b), 0);

    // create time column
    csv.addColumn('relative time');

    // create columns
    for (const name of names.value) {
      csv.addColumn(name);
    }

    // create rows
    for (let i = 0; i < maxLength; i += 1) {
      const time = labels.value[0][i];
      let row: string[] = [time];

      for (const j in names.value) {
        const distance = values.value[j][i] as unknown as string | undefined;
        let payload = '';

        if (distance !== undefined) {
          payload = distance.toString();
        }

        row = [...row, payload];
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
