import {atom} from 'jotai';
import {DEFAULT_SETTINGS} from 'src/constants.ts';
import {
  type Band,
  type Extractor,
  type InputFile,
  type Integration,
  type JsonFile,
  type OutputFile,
  type Reducer,
  type Settings,
} from 'src/types.ts';

export const tabIndexAtom = atom<number>(0);
export const settingsAtom = atom<Settings>(DEFAULT_SETTINGS);
export const inputFilesAtom = atom<InputFile[]>([]);
export const outputFilesAtom = atom<OutputFile[]>([]);
export const jsonFilesAtom = atom<JsonFile[]>([]);

const baseWidth = 80;
export const audioFilesColumnsAtom = atom([
  {field: 'index', sortable: true, minWidth: baseWidth * 0.9},
  {
    field: 'path',
    minWidth: baseWidth * 3,
    tooltipField: 'path',
  },
  {field: 'date', minWidth: baseWidth * 2, editable: true},
  {
    field: 'site',
    minWidth: baseWidth * 2,
    editable: true,
    tooltipField: 'site',
  },
]);

export const bandsAtom = atom<Band[]>([]);
export const integrationsAtom = atom<Integration[]>([]);
export const extractorsAtom = atom<Extractor[]>([]);
export const reducersAtom = atom<Reducer[]>([]);
