import {formatTimestampToString} from '@shared/dates';
import {Csv} from 'src/common/csv';
import {useExportName} from 'src/composables/use-export-name';
import {ExportType} from 'src/constants';
import {useTemporalData} from 'src/draggables/temporal/use-temporal-data';
import {useTemporalStrategy} from 'src/draggables/temporal/use-temporal-strategy';

export function useTemporalExport() {
  const {data} = useTemporalData();
  const {generate} = useExportName();
  const {apply} = useTemporalStrategy();

  const handleClick = () => {
    const csv = new Csv();
    csv.addColumn('intervalIndex');
    csv.addColumn('site');
    csv.addColumn('timestamp');
    csv.addColumn('scalar');

    for (let i = 0; i < data.value.length; i += 1) {
      const d = data.value[i];
      csv.createRow();
      csv.addToCurrentRow(d.index.toString());
      csv.addToCurrentRow(d.siteName);
      csv.addToCurrentRow(formatTimestampToString(d.timestamp));
      csv.addToCurrentRow(apply(d.values).toString());
    }

    const name = generate(ExportType.enum.temporal);
    csv.download(name);
  };

  return {
    handleClick,
  };
}
