import * as Excel from 'exceljs';
import {type CellValue, type Workbook, type Worksheet} from 'exceljs';
import {XLSX_EXTRACTORS} from 'src/constants.ts';
import {
  AutoclustersColumn,
  AutoclusterType,
  BandsColumn,
  DigestersColumn,
  DigesterType,
  ExtractorsColumn,
  FilesColumn,
  IntegrationsColumn,
  RangesColumn,
  ReducersColumn,
  SettingsCell,
  TrajectoriesColumn,
  XlsxSheet,
} from 'src/enums.ts';
import {
  type Autocluster,
  type Band,
  type Config,
  type Digester,
  type ExportSettings,
  type Extractor,
  type GridRow,
  type ImportFile,
  type Integration,
  type Range_,
  type Reducer,
  type Trajectory,
} from 'src/types.ts';
import {convertStringToDate} from 'src/utils/dates.ts';
import {getFolderPath, joinPath} from 'src/utils/electron.ts';
import {findExtractorTypeByName} from 'src/utils/extractors.ts';
import {
  addPrefixToLabelProperty,
  removePrefixFromLabelProperty,
} from 'src/utils/files.ts';
import {
  isValidAutoclusterType,
  isValidDigesterType,
  isValidTrajectoryStep,
} from 'src/utils/validators.ts';

export function readJson(file: File, callback: (reader: FileReader) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(reader);
  reader.readAsText(file);
}

interface ReadXlsx extends Omit<Config, 'settings'> {
  settings: ExportSettings;
  properties: string[];
}

export function readXlsx(file: File): Promise<ReadXlsx> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const directory = getFolderPath(file as unknown as ImportFile);
      const data = reader.result as ArrayBuffer;
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(data);

      // TODO: Add try catch to notify on throw
      const settings = readXlsxSettings(workbook, directory);
      const {files, properties} = readXlsxFiles(workbook);
      const bands = readXlsxBands(workbook);
      const integrations = readXlsxIntegrations(workbook);
      const ranges = readXlsxRanges(workbook);
      const extractors = readXlsxExtractors(workbook);
      const reducers = readXlsxReducers(workbook);
      const trajectories = readXlsxTrajectories(workbook);
      const digesters = readXlsxDigesters(workbook);
      const autoclusters = readXlsxAutoclusters(workbook);

      const config = {
        settings,
        config: {
          bands,
          integrations,
          ranges,
          extractors,
          reducers,
          trajectories,
          digesters,
          autoclusters,
        },
        files,
      };

      resolve({...config, properties});
    };

    reader.readAsArrayBuffer(file);
  });
}

function readCell(sheet: Worksheet, cell: string): string {
  return sheet.getCell(cell).toString();
}

interface ReadColumnsProps {
  sheet: Worksheet;
  offset?: number;
  colStart?: number;
  skipEmpty?: boolean;
}

function readColumns({
  sheet,
  offset = 1,
  colStart = 1,
  skipEmpty = false,
}: ReadColumnsProps) {
  const count = sheet.columnCount;
  const payload: Record<string, CellValue[]> = {};

  for (let n = colStart; n <= count; n += 1) {
    const column = sheet.getColumn(n);
    // @ts-expect-error actually exists
    const values = column.values.map((v) => v?.result || v);

    // TODO: simplify me
    if (values && values.length > 1) {
      const letter = sheet.getColumn(n).letter;
      const actualValues = values.slice(offset);

      if (!skipEmpty) {
        const isNotEmpty = actualValues.every(
          (v) => v !== null && v !== undefined && v !== '',
        );

        if (!isNotEmpty) {
          throw new Error('All values should be filled');
        }
      }

      payload[letter] = actualValues;
    }
  }

  return payload;
}

function readXlsxSettings(workbook: Workbook, directory: string) {
  const sheet = workbook.getWorksheet(XlsxSheet.settings);

  if (!sheet) {
    throw new Error('Settings page not found');
  }

  // settings
  const exportSettings: ExportSettings = {
    storagePath: readCell(sheet, SettingsCell.storagePath),
    audioPath: readCell(sheet, SettingsCell.audioPath),
    expectedSampleRate: Number(
      readCell(sheet, SettingsCell.expectedSampleRate),
    ),
    timelineOrigin: readCell(sheet, SettingsCell.timelineOrigin),
    audioHost: readCell(sheet, SettingsCell.audioHost),
    timezone: readCell(sheet, SettingsCell.timezone),
    computationDimensions: Number(
      readCell(sheet, SettingsCell.computationDimensions),
    ),
    computationIterations: Number(
      readCell(sheet, SettingsCell.computationIterations),
    ),
    displaySeed: Number(readCell(sheet, SettingsCell.displaySeed)),
  };

  // audio full path
  const audioRelativePath = readCell(sheet, SettingsCell.audioPath);
  const fullPath = joinPath(directory, audioRelativePath);

  const settings: ExportSettings = {
    ...exportSettings,
    audioPath: fullPath,
  };

  return settings;
}

interface ReadXlsxFiles {
  files: GridRow[];
  properties: string[];
}

function readXlsxFiles(workbook: Workbook): ReadXlsxFiles {
  const sheet = workbook.getWorksheet(XlsxSheet.files);

  if (!sheet) {
    throw new Error('Files page not found');
  }

  const cols = readColumns({sheet});

  const paths = cols[FilesColumn.file].slice(1);
  const dates = cols[FilesColumn.date].slice(1);
  const sites = cols[FilesColumn.site].slice(1);

  const labels = Object.fromEntries(Object.entries(cols).slice(3));
  const labelProperties = Object.values(labels).map((arr) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    removePrefixFromLabelProperty(arr[0]!.toString().toUpperCase()),
  );
  const labelValues = Object.values(labels).map((arr) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    arr.slice(1).map((v) => v!.toString()),
  );

  // reconstruct file objects
  const files = new Array<GridRow>(paths.length);

  for (let i = 0; i < files.length; i += 1) {
    const path = paths[i];
    const date = dates[i];
    const site = sites[i];

    if (
      typeof path === 'undefined' ||
      path === null ||
      typeof date === 'undefined' ||
      date === null ||
      typeof site === 'undefined' ||
      site === null
    ) {
      throw new Error('Empty cell value');
    }

    const actualDate = convertStringToDate(date.toString());

    files[i] = {
      index: i,
      path: path.toString(),
      site: site.toString(),
      date: actualDate,
    };

    for (let l = 0; l < labelProperties.length; l += 1) {
      const labelProperty = labelProperties[l];
      const prefixedProperty = addPrefixToLabelProperty(labelProperty);
      // @ts-expect-error extending default grid behaviour
      files[i][prefixedProperty] = labelValues[l][i];
    }
  }

  return {files, properties: labelProperties};
}

export function readXlsxBands(workbook: Workbook): Band[] {
  const sheet = workbook.getWorksheet(XlsxSheet.bands);

  if (!sheet) {
    throw new Error('Bands page not found');
  }

  const cols = readColumns({sheet});

  const names = cols[BandsColumn.band].slice(1);
  const lows = cols[BandsColumn.low].slice(1);
  const highs = cols[BandsColumn.high].slice(1);

  const bands = new Array<Band>(names.length);

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const low = lows[i];
    const high = highs[i];

    if (
      typeof name === 'undefined' ||
      name === null ||
      typeof low === 'undefined' ||
      low === null ||
      typeof high === 'undefined' ||
      high === null
    ) {
      throw new Error('Empty cell value');
    }

    if (isNaN(Number(low))) {
      throw new Error('Invalid low number');
    }

    if (isNaN(Number(high))) {
      throw new Error('Invalid high number');
    }

    bands[i] = {
      name: name.toString(),
      low: Number(low),
      high: Number(high),
    };
  }

  return bands;
}

export function readXlsxIntegrations(workbook: Workbook): Integration[] {
  const sheet = workbook.getWorksheet(XlsxSheet.integrations);

  if (!sheet) {
    throw new Error('Integrations page not found');
  }

  const cols = readColumns({sheet});

  const names = cols[IntegrationsColumn.integration].slice(1);
  const durations = cols[IntegrationsColumn.seconds].slice(1);

  const integrations = new Array<Integration>(names.length);

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const seconds = durations[i];

    if (
      typeof name === 'undefined' ||
      name === null ||
      typeof seconds === 'undefined' ||
      seconds === null
    ) {
      throw new Error('Empty cell value');
    }

    if (isNaN(Number(seconds))) {
      throw new Error('Invalid seconds number');
    }

    integrations[i] = {
      name: name.toString(),
      seconds: Number(seconds),
    };
  }

  return integrations;
}

export function readXlsxExtractors(workbook: Workbook): Extractor[] {
  const sheet = workbook.getWorksheet(XlsxSheet.extractors);

  if (!sheet) {
    throw new Error('Extractors page not found');
  }

  const extractorColumns = readColumns({sheet});
  const extractorNames = extractorColumns[ExtractorsColumn.extractor].slice(1);
  const extractorOffsets = extractorColumns[ExtractorsColumn.offset].slice(1);
  const extractorSteps = extractorColumns[ExtractorsColumn.step].slice(1);
  const extractorPersists = extractorColumns[ExtractorsColumn.persist].slice(1);

  const extractors = new Array<Extractor>(extractorNames.length);

  for (let i = 0; i < extractorNames.length; i += 1) {
    const name = extractorNames[i];
    const offset = extractorOffsets[i];
    const step = extractorSteps[i];
    const persist = extractorPersists[i];

    if (
      typeof name === 'undefined' ||
      name === null ||
      typeof offset === 'undefined' ||
      offset === null ||
      typeof step === 'undefined' ||
      step === null ||
      typeof persist === 'undefined' ||
      persist === null
    ) {
      throw new Error('Empty cell value');
    }

    if (isNaN(Number(offset))) {
      throw new Error('Offset is not a number');
    }

    if (isNaN(Number(step))) {
      throw new Error('step is not a number');
    }

    const type = findExtractorTypeByName(name.toString());

    extractors[i] = {
      name: `${name.toString()}_${i}`,
      type: type,
      offset: Number(offset),
      step: Number(step),
      persist: persist === 'yes',
      isNeural: XLSX_EXTRACTORS.includes(name.toString()),
    };
  }

  return extractors;
}

export function readXlsxRanges(workbook: Workbook): Range_[] {
  const sheet = workbook.getWorksheet(XlsxSheet.ranges);

  if (!sheet) {
    throw new Error('Ranges page not found');
  }

  const cols = readColumns({sheet});

  const names = cols[RangesColumn.range].slice(1);
  const starts = cols[RangesColumn.start].slice(1);
  const ends = cols[RangesColumn.end].slice(1);

  const ranges = new Array<Range_>(names.length);

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const start = starts[i];
    const end = ends[i];

    if (
      typeof name === 'undefined' ||
      name === null ||
      typeof start === 'undefined' ||
      start === null ||
      typeof end === 'undefined' ||
      end === null
    ) {
      throw new Error('Empty cell value');
    }

    const startDate = convertStringToDate(start.toString());
    const endDate = convertStringToDate(end.toString());

    ranges[i] = {
      name: name.toString(),
      start: startDate,
      end: endDate,
    };
  }

  return ranges;
}

export function readXlsxReducers(workbook: Workbook): Reducer[] {
  const sheet = workbook.getWorksheet(XlsxSheet.reducers);

  if (!sheet) {
    throw new Error('Reducers page not found');
  }

  const cols = readColumns({sheet, skipEmpty: true});
  const names = cols[ReducersColumn.reducer].slice(1);
  const dimensions = cols[ReducersColumn.dimensions].slice(1);

  const reducers = new Array<Reducer>(names.length);

  // TODO: We assume that reducers concern all NN extractors... Document this.
  // TODO: We also assume that reducers are for all bands, integrations and ranges... Document or allow granular scope in campaing module.
  // TODO: Allow attaching multiple reducers to the same extractor
  for (let i = 0; i < names.length; i += 1) {
    const reducerName = names[i];
    const dimension = dimensions[i];

    if (
      typeof reducerName === 'undefined' ||
      reducerName === null ||
      typeof dimension === 'undefined' ||
      dimension === null
    ) {
      throw new Error('Empty cell value');
    }

    if (isNaN(Number(dimension))) {
      throw new Error('Invalid dimensions number');
    }

    reducers[i] = {
      name: reducerName.toString(),
      dimensions: Number(dimension),
      extractors: [], // we assume all
      bands: [], // we assume all
      integrations: [], // we assume all
      ranges: [], // we assume all
    };
  }

  return reducers;
}

export function readXlsxTrajectories(workbook: Workbook): Trajectory[] {
  const sheet = workbook.getWorksheet(XlsxSheet.trajectories);

  if (!sheet) {
    throw new Error('Trajectories page not found');
  }

  const cols = readColumns({sheet});
  const names = cols[TrajectoriesColumn.trajectory].slice(1);
  const starts = cols[TrajectoriesColumn.start].slice(1);
  const ends = cols[TrajectoriesColumn.end].slice(1);
  const labelProperties = cols[TrajectoriesColumn.labelProperty].slice(1);
  const labelValues = cols[TrajectoriesColumn.labelValue].slice(1);
  const steps = cols[TrajectoriesColumn.step].slice(1);

  const trajectories = new Array<Trajectory>(names.length);

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const start = starts[i];
    const end = ends[i];
    const labelProperty = labelProperties[i];
    const labelValue = labelValues[i];
    const step = steps[i];

    if (
      typeof name === 'undefined' ||
      name === null ||
      typeof start === 'undefined' ||
      start === null ||
      typeof end === 'undefined' ||
      end === null ||
      typeof labelProperty === 'undefined' ||
      labelProperty === null ||
      typeof labelValue === 'undefined' ||
      labelValue === null ||
      typeof step === 'undefined' ||
      step === null
    ) {
      throw new Error('Empty cell value');
    }

    if (!isValidTrajectoryStep(step.toString())) {
      throw new Error(`Invalid step ${step}`);
    }

    trajectories[i] = {
      name: name.toString(),
      start: convertStringToDate(start.toString()),
      end: convertStringToDate(end.toString()),
      labelProperty: labelProperty.toString(),
      labelValue: labelValue.toString(),
      step: step.toString() as Trajectory['step'],
    };
  }

  return trajectories;
}

export function readXlsxDigesters(workbook: Workbook): Digester[] {
  const sheet = workbook.getWorksheet(XlsxSheet.digesters);

  if (!sheet) {
    throw new Error('Digesters page not found');
  }

  const cols = readColumns({sheet});
  const types = cols[DigestersColumn.digester].slice(1);

  const digesters = new Array<Digester>(types.length);

  for (let i = 0; i < types.length; i += 1) {
    const type = types[i];

    if (typeof type === 'undefined' || type === null) {
      throw new Error('Empty cell value');
    }

    if (!isValidDigesterType(type.toString())) {
      throw new Error(`Digester type is not valid: ${type}`);
    }

    digesters[i] = {
      type: type.toString() as DigesterType,
    };
  }

  return digesters;
}

export function readXlsxAutoclusters(workbook: Workbook): Autocluster[] {
  const sheet = workbook.getWorksheet(XlsxSheet.autoclusters);

  if (!sheet) {
    throw new Error('Autoclusters page not found');
  }

  const cols = readColumns({sheet});
  const types = cols[AutoclustersColumn.autocluster].slice(1);
  const minClusterSizes = cols[AutoclustersColumn.minClusterSize].slice(1);
  const minSamples = cols[AutoclustersColumn.minSamples].slice(1);
  const alphas = cols[AutoclustersColumn.alpha].slice(1);
  const epsilons = cols[AutoclustersColumn.epsilon].slice(1);

  const autoclusters = new Array<Autocluster>(types.length);

  for (let i = 0; i < types.length; i += 1) {
    const type = types[i];
    const size = minClusterSizes[i];
    const samples = minSamples[i];
    const alpha = alphas[i];
    const epsilon = epsilons[i];

    if (
      typeof type === 'undefined' ||
      type === null ||
      typeof size === 'undefined' ||
      size === null ||
      typeof samples === 'undefined' ||
      samples === null ||
      typeof alpha === 'undefined' ||
      alpha === null ||
      typeof epsilon === 'undefined' ||
      epsilon === null
    ) {
      throw new Error('Empty cell value');
    }

    if (isNaN(Number(size))) {
      throw new Error(`Invalid size: ${size}`);
    }

    if (isNaN(Number(samples))) {
      throw new Error(`Invalid samples: ${samples}`);
    }

    if (isNaN(Number(alpha))) {
      throw new Error(`Invalid alpha: ${alpha}`);
    }

    if (isNaN(Number(epsilon))) {
      throw new Error(`Invalid epsilon: ${epsilon}`);
    }

    if (!isValidAutoclusterType(type.toString())) {
      throw new Error(`Invalid type: ${type}`);
    }

    autoclusters[i] = {
      name: `${i}`,
      type: type.toString() as AutoclusterType,
      minClusterSize: Number(size),
      minSamples: Number(samples),
      alpha: Number(alpha),
      epsilon: Number(epsilon),
    };
  }

  return autoclusters;
}
