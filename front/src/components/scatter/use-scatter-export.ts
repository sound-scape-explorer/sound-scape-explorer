import {useAppNotification} from 'src/app/notification/use-app-notification';
import {Csv} from 'src/common/csv';
import {useAggregations} from 'src/composables/use-aggregations';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useIntervals} from 'src/composables/use-intervals';
import {useReductions} from 'src/composables/use-reductions';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ExportType, STRING_DELIMITER} from 'src/constants';
import {ref} from 'vue';

interface ExportData {
  intervalIndex: number;
  start: number;
  end: number;
  site: string;
  tags: string[];
  reductions: number[];
  embeddings: number[];
}

export function useScatterExport() {
  const {band, integration} = useViewSelection();
  const {allUniques} = useTagUniques();
  const {notify} = useAppNotification();
  const {convertTimestampToIsoDate} = useDate();
  const {reductions} = useReductions();
  const {aggregations} = useAggregations();
  const {intervals} = useIntervals();
  const {filtered} = useScatterGlobalFilter();
  const {generate} = useExportName();

  const loadingRef = ref<boolean>(false);

  const handleScatterExportClick = async () => {
    if (
      band.value === null ||
      integration.value === null ||
      aggregations.value === null ||
      reductions.value === null
    ) {
      return;
    }

    notify('info', 'scatter-export', 'generating csv file...');

    loadingRef.value = true;

    const csv = new Csv();
    const payload: ExportData[] = [];

    for (let i = 0; i < aggregations.value.timestamps.length; i += 1) {
      if (filtered.value[i]) {
        continue;
      }

      const interval = intervals.value[i];
      const tagValues = Object.values(interval.tags);

      payload.push({
        intervalIndex: interval.index,
        start: interval.start,
        end: interval.end,
        site: interval.sites.join(STRING_DELIMITER),
        tags: tagValues.map((v) => v.join(STRING_DELIMITER)),
        reductions: reductions.value[i],
        embeddings: aggregations.value.embeddings[i],
      });
    }

    csv.addColumn('intervalIndex');
    csv.addColumn('start');
    csv.addColumn('end');
    csv.addColumn('site');

    Object.keys(allUniques.value).forEach((name) => {
      csv.addColumn(`tag_${name}`);
    });

    payload[0].reductions.forEach((_, r) => {
      csv.addColumn(`red_${r}`);
    });

    payload[0].embeddings.forEach((_, f) => {
      csv.addColumn(`emb_${f}`);
    });

    payload.forEach((data) => {
      csv.createRow();
      csv.addToCurrentRow(data.intervalIndex.toString());
      csv.addToCurrentRow(convertTimestampToIsoDate(data.start));
      csv.addToCurrentRow(convertTimestampToIsoDate(data.end));
      csv.addToCurrentRow(data.site);

      data.tags.forEach((v) => {
        csv.addToCurrentRow(v);
      });

      data.reductions.forEach((v) => {
        csv.addToCurrentRow(`${v}`);
      });

      data.embeddings.forEach((v) => {
        csv.addToCurrentRow(`${v}`);
      });
    });

    const name = generate(ExportType.enum.scatter);
    csv.download(name);
    loadingRef.value = false;
  };

  return {
    handleScatterExportClick,
  };
}
