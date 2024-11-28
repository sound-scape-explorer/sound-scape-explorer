import {type ColDef} from 'ag-grid-community';
import dayjs from 'dayjs';
import {atom} from 'jotai';
import {DEFAULT_SETTINGS} from 'src/constants.ts';
import {ConfigTemplate} from 'src/hooks/use-config-templates-old.ts';
import {
  type Band,
  type Extractor,
  type GridRow,
  type ImportFile,
  type Integration,
  type LabelProperty,
  type Range_,
  type Reducer,
  type Settings,
  type TabIndex,
} from 'src/types';
import {convertDateToString} from 'src/utils/dates.ts';

export const tabIndexAtom = atom<TabIndex>('import');
export const importFilesAtom = atom<ImportFile[]>([]);
export const gridRowsAtom = atom<GridRow[]>([]);
export const folderExistsAtom = atom<boolean>(false);

const baseWidth = 80;
export const gridColumnsAtom = atom<ColDef[]>([
  {field: 'index', sortable: true, minWidth: baseWidth * 0.9},
  {
    field: 'path',
    minWidth: baseWidth * 3,
    tooltipField: 'path',
  },
  {
    field: 'date',
    minWidth: baseWidth * 2,
    editable: true,
    valueGetter: (params) => {
      return convertDateToString(params.data.date);
    },
    valueSetter: (params) => {
      params.data.date = dayjs(params.newValue);
      return true;
    },
  },
  {
    field: 'site',
    minWidth: baseWidth * 2,
    editable: true,
    tooltipField: 'site',
  },
]);

export const labelPropertiesAtom = atom<LabelProperty[]>([]);
export const configTemplateAtom = atom<ConfigTemplate>(ConfigTemplate.custom);
export const bandsAtom = atom<Band[]>([]);
export const integrationsAtom = atom<Integration[]>([]);
export const rangesAtom = atom<Range_[]>([]);
export const extractorsAtom = atom<Extractor[]>([]);
export const reducersAtom = atom<Reducer[]>([]);

// settings
export const settingsAtom = atom<Settings>(DEFAULT_SETTINGS);
export const settingsAtoms = {
  storagePath: atom<Settings['storagePath']>(DEFAULT_SETTINGS.storagePath),
  audioPath: atom<Settings['audioPath']>(DEFAULT_SETTINGS.audioPath),
  sampleRate: atom<Settings['expectedSampleRate']>(
    DEFAULT_SETTINGS.expectedSampleRate,
  ),
  origin: atom<Settings['timelineOrigin']>(DEFAULT_SETTINGS.timelineOrigin),
  audioHost: atom<Settings['audioHost']>(DEFAULT_SETTINGS.audioHost),
  timezone: atom<Settings['timezone']>(DEFAULT_SETTINGS.timezone),
  computationDimensions: atom<Settings['computationDimensions']>(
    DEFAULT_SETTINGS.computationDimensions,
  ),
  computationIterations: atom<Settings['computationIterations']>(
    DEFAULT_SETTINGS.computationIterations,
  ),
  displaySeed: atom<Settings['displaySeed']>(DEFAULT_SETTINGS.displaySeed),
};
