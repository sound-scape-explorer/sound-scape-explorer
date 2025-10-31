import {Csv} from 'src/common/csv';
import {useDateTime} from 'src/composables/use-date-time';
import {useExportName} from 'src/composables/use-export-name';
import {ExportType} from 'src/constants';
import {useTemporalSeries} from 'src/draggables/temporal/use-temporal-series';
import {useTemporalStrategy} from 'src/draggables/temporal/use-temporal-strategy';

export function useTemporalExport() {
  const {series} = useTemporalSeries();
  const {generate} = useExportName();
  const {apply} = useTemporalStrategy();
  const {timestampToString} = useDateTime();

  const handleClick = () => {
    if (series.value === null) {
      return;
    }

    const csv = new Csv();
    csv.addColumn('intervalIndex');
    csv.addColumn('site');
    csv.addColumn('timestamp');
    csv.addColumn('scalar');

    for (let i = 0; i < series.value.length; i += 1) {
      const data = series.value[i];
      csv.createRow();
      csv.addToCurrentRow(data.index.toString());
      csv.addToCurrentRow(data.siteName);
      csv.addToCurrentRow(timestampToString(data.timestamp));
      csv.addToCurrentRow(apply(data.values).toString());
    }

    const name = generate(ExportType.enum.temporal);
    csv.download(name);
  };

  return {
    handleClick,
  };
}
