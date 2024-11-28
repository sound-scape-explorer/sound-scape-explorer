import dayjs from 'dayjs';
import {LABEL_PREFIX} from 'src/constants.ts';
import {
  type Config,
  type ExportConfig,
  type ExportFile,
  type GridRow,
  type ImportFile,
} from 'src/types.ts';
import {convertDateToString} from 'src/utils/dates.ts';

export function addPrefixToLabelProperty(property: string) {
  return `${LABEL_PREFIX}${property}`;
}

export function removePrefixFromLabelProperty(property: string) {
  return property.replace(LABEL_PREFIX, '');
}

export function reconstructFiles(
  inputFiles: ExportConfig['files'] | Config['files'],
  audioPath: string,
): ImportFile[] {
  const files = inputFiles.map((f) => {
    const path = `${audioPath}${f.path}`;
    const date =
      typeof f.date === 'string' ? new Date(f.date) : f.date.toDate();

    const file: ImportFile = {
      path: path,
      relativePath: path,
      lastModified: date.getTime() / 1000,
      lastModifiedDate: date,
      name: 'dummy name',
      size: 0,
      type: 'dummy type',
      webkitRelativePath: path,
    };

    return file;
  });

  return files as unknown as ImportFile[];
}

export function serializeFilesToGrid(files: ImportFile[]): GridRow[] {
  const rows = new Array<GridRow>(files.length);

  for (let f = 0; f < files.length; f += 1) {
    const file = files[f];

    const row: GridRow = {
      index: f,
      path: file.path,
      date: dayjs(file.lastModifiedDate),
      site: file.name,
    };

    rows[f] = row;
  }

  return rows;
}

interface SerializeJsonToGrid {
  rows: GridRow[];
  properties: string[];
}

export function serializeJsonToGrid(files: ExportFile[]): SerializeJsonToGrid {
  const rows = new Array<GridRow>(files.length);
  const properties: string[] = [];

  for (let f = 0; f < files.length; f += 1) {
    const file = files[f];

    const row: GridRow = {
      ...file,
      date: dayjs(file.date),
    };

    const rowProperties = Object.keys(row)
      .filter((key) => key.startsWith(LABEL_PREFIX))
      .map((property) => removePrefixFromLabelProperty(property));

    for (const rowProperty of rowProperties) {
      if (properties.includes(rowProperty)) {
        continue;
      }

      properties.push(rowProperty);
    }

    rows[f] = row;
  }

  return {
    rows,
    properties,
  };
}

export function serializeXlsxToGrid(files: Config['files']): GridRow[] {
  const rows = new Array<GridRow>(files.length);

  for (let f = 0; f < files.length; f += 1) {
    const file = files[f];

    const row: GridRow = {
      ...file,
      date: dayjs(file.date),
    };

    rows[f] = row;
  }

  return rows;
}

export function convertRowsToFiles(rows: GridRow[]): ExportFile[] {
  const files = new Array<ExportFile>(rows.length);

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];

    const file: ExportFile = {
      ...row,
      date: convertDateToString(row.date),
    };

    files[i] = file;
  }

  return files;
}
