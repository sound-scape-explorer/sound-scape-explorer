import * as Excel from 'exceljs';
import {
  AUDIO_HOST_DEFAULT,
  AUDIO_PATH_DEFAULT,
  AUTOCLUSTER_ALPHA_DEFAULT,
  AUTOCLUSTER_EPSILON_DEFAULT,
  AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT,
  AUTOCLUSTER_MIN_SAMPLES_DEFAULT,
  COMPUTATION_DIMENSIONS_DEFAULT,
  COMPUTATION_ITERATIONS_DEFAULT,
  DISPLAY_SEED_DEFAULT,
  IS_PERSIST_DEFAULT,
  LABEL_PREFIX,
  OFFSET_DEFAULT,
  REDUCER_DIMENSIONS_DEFAULT,
  SAMPLE_RATE_DEFAULT,
  STEP_DEFAULT,
  STORAGE_PATH_DEFAULT,
  TIMELINE_ORIGIN_DEFAULT,
  TIMEZONE_DEFAULT,
} from 'src/constants.ts';
import {
  AutoclustersColumn,
  BandsColumn,
  DigestersColumn,
  ExtractorsColumn,
  IntegrationsColumn,
  RangesColumn,
  ReducersColumn,
  SettingsCell,
  TrajectoriesColumn,
  XlsxSheet,
} from 'src/enums.ts';
import {type Settings} from 'src/hooks/use-settings-state.ts';
import {type ConfigBand} from 'src/panels/config/hooks/use-band-state.ts';
import {
  type ConfigExtractor,
  ConfigExtractorType,
} from 'src/panels/config/hooks/use-extractor-state.ts';
import {type ConfigIntegration} from 'src/panels/config/hooks/use-integration-state.ts';
import {
  type ConfigReducer,
  ConfigReducerType,
} from 'src/panels/config/hooks/use-reducer-state.ts';
import {
  AutoclusterType,
  type ConfigAutocluster,
} from 'src/panels/metrics/hooks/use-autocluster-state.ts';
import {
  type ConfigDigester,
  DigesterType,
} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {
  type MetricsIndex,
  MetricsIndexType,
} from 'src/panels/metrics/hooks/use-index-state.ts';
import {type ConfigRange} from 'src/panels/metrics/hooks/use-range-state.ts';
import {
  type ConfigTrajectory,
  ConfigTrajectoryStep,
} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {formatDateToString} from 'src/utils/dates.ts';
import {invertRowsAndColumns} from 'src/utils/objects.ts';

export interface XlsxFile {
  FILE: string;
  SITE: string;
  DATE: string;

  [label: `${typeof LABEL_PREFIX}${string}`]: string;
}

export interface IndexedXlsxFile extends XlsxFile {
  index: number;
}

function isKeyOfXlsxFile(key: string): key is keyof XlsxFile {
  return (
    key === 'FILE' ||
    key === 'SITE' ||
    key === 'DATE' ||
    key.startsWith(LABEL_PREFIX)
  );
}

const IS_PERSIST_TRUE = 'yes';

const XLSX_EXTRACTORS: Record<string, ConfigExtractorType> = {
  vgg: ConfigExtractorType.vgg,
  melogram: ConfigExtractorType.melogram,
  melspectrum: ConfigExtractorType.melspectrum,
};

const XLSX_INDICES: Record<string, MetricsIndexType> = {
  leq_maad: MetricsIndexType.leq_maad,
  med: MetricsIndexType.med,
  ht: MetricsIndexType.ht,
  hf: MetricsIndexType.hf,
  aci: MetricsIndexType.aci,
  adi: MetricsIndexType.adi,
  bi: MetricsIndexType.bi,
  ndsi: MetricsIndexType.ndsi,
};

const XLSX_REDUCERS: Record<string, ConfigReducerType> = {
  umap: ConfigReducerType.umap,
  pca: ConfigReducerType.pca,
};

const XLSX_DIGESTERS: Record<string, DigesterType> = {
  silhouette: DigesterType.silhouette,
  contingency: DigesterType.contingency,
  sum_var: DigesterType.sum_var,
  sum_std: DigesterType.sum_std,
  mean_std: DigesterType.mean_std,
  mean_spreading: DigesterType.mean_spreading,
  distance: DigesterType.distance,
  overlap: DigesterType.overlap,
};

const XLSX_AUTOCLUSTERS: Record<string, AutoclusterType> = {
  'hdbscan-eom': AutoclusterType.hdbscan_eom,
  'hdbscan-leaf': AutoclusterType.hdbscan_leaf,
};

interface ReadColumnsProps {
  sheet: Excel.Worksheet;
  rowStart?: number;
  colStart?: number;
  skipEmpty?: boolean;
}

const rowOffset = 1;

export class XlsxParser {
  private workbook: Excel.Workbook;
  private readonly directory: string;

  private constructor(workbook: Excel.Workbook, directory: string) {
    this.workbook = workbook;
    this.directory = directory;
  }

  public static async fromFile(file: File): Promise<XlsxParser> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const directory = window.electronAPI.getDirectoryPath(file);
          const data = reader.result as ArrayBuffer;
          const workbook = new Excel.Workbook();
          await workbook.xlsx.load(data);

          resolve(new XlsxParser(workbook, directory));
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }

  public parseFiles(): IndexedXlsxFile[] {
    const {keys, headers} = this.parseFilesHeader();

    const sheet = this.getSheet(XlsxSheet.Files);
    const columns = this.readColumns({sheet});
    const values = Object.values(columns);
    const length = values[0].length;
    const files = new Array<IndexedXlsxFile>(length);

    for (let i = 0; i < length; i += 1) {
      const file = {} as IndexedXlsxFile;
      file.index = i;

      for (const key of keys) {
        const k = headers.indexOf(key);
        const value = values[k][i];
        // TODO: sanitize, string, number, date, null, undefined
        (file as XlsxFile)[key as keyof XlsxFile] = String(value);
      }

      files[i] = file;
    }

    return files;
  }

  public parseSettings(): Settings {
    const sheet = this.getSheet(XlsxSheet.Settings);
    const cells = SettingsCell;

    const settings: Settings = {
      storagePath: String(
        this.readCell(sheet, cells.storagePath) ?? STORAGE_PATH_DEFAULT,
      ),
      audioPath: String(
        this.readCell(sheet, cells.audioPath) ?? AUDIO_PATH_DEFAULT,
      ),
      expectedSampleRate: Number(
        this.readCell(sheet, cells.sampleRate) ?? SAMPLE_RATE_DEFAULT,
      ),
      timelineOrigin: formatDateToString(
        (this.readCell(sheet, cells.origin) as Date | undefined) ??
          new Date(TIMELINE_ORIGIN_DEFAULT),
        true,
      ),
      audioHost: String(
        this.readCell(sheet, cells.audioHost) ?? AUDIO_HOST_DEFAULT,
      ),
      timezone: String(
        this.readCell(sheet, cells.timezone) ?? TIMEZONE_DEFAULT,
      ),
      computationDimensions: Number(
        this.readCell(sheet, cells.computationDimensions) ??
          COMPUTATION_DIMENSIONS_DEFAULT,
      ),
      computationIterations: Number(
        this.readCell(sheet, cells.computationIterations) ??
          COMPUTATION_ITERATIONS_DEFAULT,
      ),
      displaySeed: Number(
        this.readCell(sheet, cells.displaySeed) ?? DISPLAY_SEED_DEFAULT,
      ),
    };

    // TODO: check me
    const fullPath = window.electronAPI.joinPath(
      this.directory,
      settings.audioPath,
    );

    console.log(this.directory, settings.audioPath);

    return {
      ...settings,
      audioPath: fullPath,
    };
  }

  public parseBands(): ConfigBand[] {
    const rows = this.readAsRows(XlsxSheet.Bands);
    const bands: ConfigBand[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[BandsColumn.band] ?? '');
      const low = Number(row[BandsColumn.low] ?? '');
      const high = Number(row[BandsColumn.high] ?? '');

      const band: ConfigBand = {
        index: i,
        name,
        low,
        high,
      };

      bands.push(band);
    }

    return bands;
  }

  public parseIntegrations(): ConfigIntegration[] {
    const rows = this.readAsRows(XlsxSheet.Integrations);
    const integrations: ConfigIntegration[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[IntegrationsColumn.integration] ?? '');
      const duration = Number(row[IntegrationsColumn.seconds] ?? 0);

      const integration: ConfigIntegration = {
        index: i,
        name,
        duration,
      };

      integrations.push(integration);
    }

    return integrations;
  }

  public parseExtractorsAndIndices(): {
    extractors: ConfigExtractor[];
    indices: MetricsIndex[];
  } {
    const rows = this.readAsRows(XlsxSheet.Extractors);
    const extractors: ConfigExtractor[] = [];
    const indices: MetricsIndex[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];

      const offset = Number(row[ExtractorsColumn.offset] ?? OFFSET_DEFAULT);
      const step = Number(row[ExtractorsColumn.step] ?? STEP_DEFAULT);
      const isPersist =
        (row[ExtractorsColumn.persist] ?? IS_PERSIST_DEFAULT) ===
        IS_PERSIST_TRUE;

      // typeString can be extractor or index
      const typeString = String(row[ExtractorsColumn.extractor]);

      if (Object.keys(XLSX_EXTRACTORS).includes(typeString)) {
        const type = XLSX_EXTRACTORS[typeString] as ConfigExtractorType;

        const extractor: ConfigExtractor = {
          index: i,
          name: type,
          type,
          offset,
          step,
          isPersist,
        };

        extractors.push(extractor);
      }

      if (Object.keys(XLSX_INDICES).includes(typeString)) {
        const type = XLSX_INDICES[typeString] as MetricsIndexType;

        const index: MetricsIndex = {
          index: i,
          type,
          offset,
          step,
          isPersist,
        };

        indices.push(index);
      }
    }

    return {
      extractors,
      indices,
    };
  }

  public parseRanges(): ConfigRange[] {
    const rows = this.readAsRows(XlsxSheet.Ranges);
    const ranges: ConfigRange[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[RangesColumn.range] ?? '');
      const start = (row[RangesColumn.start] as Date | undefined) ?? new Date();
      const end = (row[RangesColumn.end] as Date | undefined) ?? new Date();

      const range: ConfigRange = {
        index: i,
        name,
        start: formatDateToString(start, true),
        end: formatDateToString(end, true),
      };

      ranges.push(range);
    }

    return ranges;
  }

  public parseReducers({
    bands,
    integrations,
  }: {
    bands: ConfigBand[];
    integrations: ConfigIntegration[];
  }): ConfigReducer[] {
    const rows = this.readAsRows(XlsxSheet.Reducers);
    const reducers: ConfigReducer[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const typeString = String(row[ReducersColumn.reducer]);
      const type = XLSX_REDUCERS[typeString] as ConfigReducerType;
      const dimensions = Number(
        row[ReducersColumn.dimensions] ?? REDUCER_DIMENSIONS_DEFAULT,
      );

      const bandNames: ConfigBand['name'][] = (
        (row[ReducersColumn.bands] as string) ?? ''
      )
        .split(',')
        .map((i) => i.trim());

      const integrationNames: ConfigIntegration['name'][] = (
        (row[ReducersColumn.integrations] as string) ?? ''
      )
        .split(',')
        .map((i) => i.trim());

      const reducer: ConfigReducer = {
        index: i,
        type,
        dimensions,
        bands: bands.filter((b) => bandNames.includes(b.name)),
        integrations: integrations.filter((i) =>
          integrationNames.includes(i.name),
        ),
        extractors: [],
      };

      reducers.push(reducer);
    }

    return reducers;
  }

  public parseAutoclusters(): ConfigAutocluster[] {
    const rows = this.readAsRows(XlsxSheet.Autoclusters);
    const autoclusters: ConfigAutocluster[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const typeString = String(row[AutoclustersColumn.autocluster]);
      const type = XLSX_AUTOCLUSTERS[typeString] as AutoclusterType;
      const minClusterSize = Number(
        row[AutoclustersColumn.minClusterSize] ??
          AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT,
      );
      const minSamples = Number(
        row[AutoclustersColumn.minSamples] ?? AUTOCLUSTER_MIN_SAMPLES_DEFAULT,
      );
      const alpha = Number(
        row[AutoclustersColumn.alpha] ?? AUTOCLUSTER_ALPHA_DEFAULT,
      );
      const epsilon = Number(
        row[AutoclustersColumn.epsilon] ?? AUTOCLUSTER_EPSILON_DEFAULT,
      );

      const autocluster: ConfigAutocluster = {
        index: i,
        type,
        minClusterSize,
        minSamples,
        alpha,
        epsilon,
      };

      autoclusters.push(autocluster);
    }

    return autoclusters;
  }

  public parseDigesters(): ConfigDigester[] {
    const rows = this.readAsRows(XlsxSheet.Digesters);
    const digesters: ConfigDigester[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const typeString = String(row[DigestersColumn.digester]);
      const type = XLSX_DIGESTERS[typeString] as DigesterType;

      const digester: ConfigDigester = {
        index: i,
        type,
      };

      digesters.push(digester);
    }

    return digesters;
  }

  public parseTrajectories(properties: string[]): ConfigTrajectory[] {
    const rows = this.readAsRows(XlsxSheet.Trajectories);
    const trajectories: ConfigTrajectory[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[TrajectoriesColumn.trajectory] ?? '');
      const start =
        (row[TrajectoriesColumn.start] as Date | undefined) ?? new Date();
      const end =
        (row[TrajectoriesColumn.end] as Date | undefined) ?? new Date();
      const labelProperty = String(row[TrajectoriesColumn.labelProperty] ?? '');
      const labelValue = String(row[TrajectoriesColumn.labelValue] ?? '');
      const step = String(
        row[TrajectoriesColumn.step] ?? '',
      ) as ConfigTrajectoryStep;

      const trajectory: ConfigTrajectory = {
        index: i,
        name,
        start: formatDateToString(start, true),
        end: formatDateToString(end, true),
        labelProperty: properties.find((p) => p === labelProperty),
        labelValue,
        step,
      };

      trajectories.push(trajectory);
    }

    return trajectories;
  }

  private readAsRows(sheetName: XlsxSheet) {
    const sheet = this.getSheet(sheetName);
    const columns = this.readColumns({sheet});
    return invertRowsAndColumns(columns);
  }

  private parseFilesHeader(): {keys: (keyof XlsxFile)[]; headers: string[]} {
    const sheet = this.getSheet(XlsxSheet.Files);
    const columns = this.readColumns({sheet, rowStart: 1});
    const headers = Object.keys(columns)
      .map((c) => columns[c][0])
      .map((s) => String(s).toUpperCase());

    const keys = headers.filter((h) =>
      isKeyOfXlsxFile(h),
    ) as (keyof XlsxFile)[];

    return {
      keys,
      headers,
    };
  }

  private readCell(sheet: Excel.Worksheet, cell: string): Excel.CellValue {
    return sheet.getCell(cell).value;
  }

  private getSheet(sheetName: XlsxSheet): Excel.Worksheet {
    const sheet = this.workbook.getWorksheet(sheetName);

    if (!sheet) {
      throw new Error(`${sheetName} sheet not found`);
    }

    return sheet;
  }

  private readColumns({
    sheet,
    rowStart = 1 + rowOffset,
    colStart = 1,
    skipEmpty = false,
  }: ReadColumnsProps) {
    const count = sheet.columnCount;
    const payload: Record<string, Excel.CellValue[]> = {};

    for (let n = colStart; n <= count; n += 1) {
      const column = sheet.getColumn(n);
      // @ts-expect-error actually exists
      const values = column.values.map((v) => v?.result || v);

      // TODO: simplify me
      if (values && values.length > 1) {
        const letter = sheet.getColumn(n).letter;
        const actualValues = values.slice(rowStart);

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
}
