import {
  AUDIO_HOST_DEFAULT,
  AUDIO_PATH_DEFAULT,
  AUTOCLUSTER_ALPHA_DEFAULT,
  AUTOCLUSTER_EPSILON_DEFAULT,
  AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT,
  AUTOCLUSTER_MIN_SAMPLES_DEFAULT,
  COMPUTATION_DIMENSIONS_DEFAULT,
  COMPUTATION_ITERATIONS_DEFAULT,
  COMPUTATION_STRATEGY_DEFAULT,
  DISPLAY_SEED_DEFAULT,
  HOP_MS_DEFAULT,
  MEMORY_LIMIT_DEFAULT,
  REDUCER_DIMENSIONS_DEFAULT,
  SAMPLE_RATE_DEFAULT,
  SMOOTHING_WINDOW_PRESETS,
  STORAGE_PATH_DEFAULT,
  TIMELINE_ORIGIN_DEFAULT,
  TIMEZONE_DEFAULT,
  WINDOW_MS_DEFAULT,
} from '@shared/constants';
import {
  type AutoclusterDto,
  type BandDto,
  type ExtractorDto,
  type FileDto,
  type IntegrationDto,
  type MetricDto,
  type RangeDto,
  type ReducerDto,
  type SettingsDto,
  type TrajectoryDto,
} from '@shared/dtos';
import {
  AutoclusterImpl,
  ExtractorImpl,
  MetricImpl,
  ReducerImpl,
} from '@shared/enums';
import * as Excel from 'exceljs';
import {LABEL_PREFIX_XLSX_13} from 'src/constants';
import {formatDateToString} from 'src/utils/dates';
import {invertRowsAndColumns} from 'src/utils/objects';
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
} from 'src/xlsx-columns';

export interface XlsxFile {
  FILE: string;
  SITE: string;
  DATE: string;
  tags: Record<string, string>;
}

function isKeyOfXlsxFile(key: string): key is keyof XlsxFile {
  return (
    key === 'FILE' ||
    key === 'SITE' ||
    key === 'DATE' ||
    key.startsWith(LABEL_PREFIX_XLSX_13)
  );
}

const XLSX_EXTRACTORS: Record<string, ExtractorImpl> = {
  vgg: ExtractorImpl.enum.VGGISH,
  melspectrum: ExtractorImpl.enum.SPECTROGRAM,
  melogram: ExtractorImpl.enum.SPECTROGRAM,
};

const XLSX_INDICES: Record<string, ExtractorImpl> = {
  leq_maad: ExtractorImpl.enum.LEQ,
  med: ExtractorImpl.enum.MED,
  ht: ExtractorImpl.enum.HT,
  hf: ExtractorImpl.enum.HF,
  aci: ExtractorImpl.enum.ACI,
  adi: ExtractorImpl.enum.ADI,
  bi: ExtractorImpl.enum.BI,
  ndsi: ExtractorImpl.enum.NDSI,
};

const XLSX_REDUCERS: Record<string, ReducerImpl> = {
  umap: ReducerImpl.enum.UMAP,
  pca: ReducerImpl.enum.PCA,
};

const XLSX_DIGESTERS: Record<string, MetricImpl> = {
  mean_std: MetricImpl.enum.MEAN_STD,
  mean_spreading: MetricImpl.enum.MEAN_SPREADING,
  silhouette: MetricImpl.enum.SILHOUETTE,
  contingency: MetricImpl.enum.CONTINGENCY,
  overlap: MetricImpl.enum.CONTINGENCY,
};

const XLSX_AUTOCLUSTERS: Record<string, AutoclusterImpl> = {
  'hdbscan-eom': AutoclusterImpl.enum.HDBSCAN_EOM,
  'hdbscan-leaf': AutoclusterImpl.enum.HDBSCAN_LEAF,
};

const TRAJECTORY_STEPS: Record<string, number> = {
  hour: SMOOTHING_WINDOW_PRESETS.HOUR,
  day: SMOOTHING_WINDOW_PRESETS.DAY,
  month: SMOOTHING_WINDOW_PRESETS.MONTH,
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

  public parseFiles(): FileDto[] {
    const {keys, headers} = this.parseFilesHeader();

    const sheet = this.getSheet(XlsxSheet.Files);
    const columns = this.readColumns({sheet});
    const values = Object.values(columns);
    const length = values[0].length;
    const files = new Array<FileDto>(length);

    for (let i = 0; i < length; i += 1) {
      const file = {
        tags: {},
      } as FileDto;

      file.Index = String(i);

      for (const key of keys) {
        const k = headers.indexOf(key);
        const value = values[k][i];

        if (key === 'FILE') {
          file.Path = String(value);
          continue;
        }

        if (key === 'DATE') {
          file.Date = formatDateToString(new Date(String(value)));
          continue;
        }

        if (key === 'SITE') {
          file.Site = String(value);
          continue;
        }

        if (key.startsWith(LABEL_PREFIX_XLSX_13)) {
          const removed = key.replace(LABEL_PREFIX_XLSX_13, '');
          file.tags[removed] = String(value);
        }
      }

      files[i] = file;
    }

    return files;
  }

  public parseSettings(): SettingsDto {
    const sheet = this.getSheet(XlsxSheet.Settings);
    const cells = SettingsCell;

    const settings: SettingsDto = {
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
      computationStrategy: COMPUTATION_STRATEGY_DEFAULT,
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
      memoryLimit: MEMORY_LIMIT_DEFAULT,
    };

    const fullPath = window.electronAPI.joinPath(
      this.directory,
      settings.audioPath,
    );

    return {
      ...settings,
      audioPath: fullPath,
    };
  }

  public parseBands(): BandDto[] {
    const rows = this.readAsRows(XlsxSheet.Bands);
    const bands: BandDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[BandsColumn.band] ?? '');
      const low = Number(row[BandsColumn.low] ?? '');
      const high = Number(row[BandsColumn.high] ?? '');

      const band: BandDto = {
        index: i,
        name,
        low,
        high,
      };

      bands.push(band);
    }

    return bands;
  }

  public parseIntegrations(): IntegrationDto[] {
    const rows = this.readAsRows(XlsxSheet.Integrations);
    const integrations: IntegrationDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[IntegrationsColumn.integration] ?? '');
      const duration = Number(row[IntegrationsColumn.seconds] ?? 0);

      const integration: IntegrationDto = {
        index: i,
        name,
        duration: duration * 1000,
      };

      integrations.push(integration);
    }

    return integrations;
  }

  public parseExtractorsAndIndices(): ExtractorDto[] {
    const rows = this.readAsRows(XlsxSheet.Extractors);
    const extractors: ExtractorDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];

      // can be extractor or acoustic index (v13 definitions)
      const implString = String(row[ExtractorsColumn.extractor]);

      if (Object.keys(XLSX_EXTRACTORS).includes(implString)) {
        const impl = XLSX_EXTRACTORS[implString] as ExtractorImpl;

        const extractor: ExtractorDto = {
          index: i,
          name: impl,
          impl,
          window: WINDOW_MS_DEFAULT,
          hop: HOP_MS_DEFAULT,
        };

        extractors.push(extractor);
      }

      // acoustic indices that are now considered as extractors
      if (Object.keys(XLSX_INDICES).includes(implString)) {
        const impl = XLSX_INDICES[implString] as ExtractorImpl;

        const extractor: ExtractorDto = {
          index: i,
          name: impl,
          impl,
          window: WINDOW_MS_DEFAULT,
          hop: HOP_MS_DEFAULT,
        };

        extractors.push(extractor);
      }
    }

    return extractors;
  }

  public parseRanges(): RangeDto[] {
    const rows = this.readAsRows(XlsxSheet.Ranges);
    const ranges: RangeDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[RangesColumn.range] ?? '');
      const start = (row[RangesColumn.start] as Date | undefined) ?? new Date();
      const end = (row[RangesColumn.end] as Date | undefined) ?? new Date();

      const range: RangeDto = {
        index: i,
        name,
        start: formatDateToString(start, true),
        end: formatDateToString(end, true),
      };

      ranges.push(range);
    }

    return ranges;
  }

  public parseReducers(): ReducerDto[] {
    const rows = this.readAsRows(XlsxSheet.Reducers);
    const reducers: ReducerDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const implString = String(row[ReducersColumn.reducer]);
      const impl = XLSX_REDUCERS[implString] as ReducerImpl;
      const dimensions = Number(
        row[ReducersColumn.dimensions] ?? REDUCER_DIMENSIONS_DEFAULT,
      );

      const reducer: ReducerDto = {
        index: i,
        impl,
        dimensions,
      };

      reducers.push(reducer);
    }

    return reducers;
  }

  public parseAutoclusters(): AutoclusterDto[] {
    const rows = this.readAsRows(XlsxSheet.Autoclusters);
    const autoclusters: AutoclusterDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const implString = String(row[AutoclustersColumn.autocluster]);
      const impl = XLSX_AUTOCLUSTERS[implString] as AutoclusterImpl;
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

      const autocluster: AutoclusterDto = {
        index: i,
        impl,
        minClusterSize,
        minSamples,
        alpha,
        epsilon,
      };

      autoclusters.push(autocluster);
    }

    return autoclusters;
  }

  public parseDigesters(): MetricDto[] {
    const rows = this.readAsRows(XlsxSheet.Digesters);
    const digesters: MetricDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const implString = String(row[DigestersColumn.digester]);
      const impl = XLSX_DIGESTERS[implString] as MetricImpl;

      const digester: MetricDto = {
        index: i,
        impl,
      };

      digesters.push(digester);
    }

    return digesters;
  }

  public parseTrajectories(tagNames: string[]): TrajectoryDto[] {
    const rows = this.readAsRows(XlsxSheet.Trajectories);
    const trajectories: TrajectoryDto[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const name = String(row[TrajectoriesColumn.trajectory] ?? '');
      const start =
        (row[TrajectoriesColumn.start] as Date | undefined) ?? new Date();
      const end =
        (row[TrajectoriesColumn.end] as Date | undefined) ?? new Date();
      const tagName = String(row[TrajectoriesColumn.labelProperty] ?? '');
      const tagValue = String(row[TrajectoriesColumn.labelValue] ?? '');
      const stepString = String(row[TrajectoriesColumn.step] ?? '');
      const smoothingWindow =
        TRAJECTORY_STEPS[stepString] ?? SMOOTHING_WINDOW_PRESETS.HOUR;

      const trajectory: TrajectoryDto = {
        index: i,
        name,
        start: formatDateToString(start, true),
        end: formatDateToString(end, true),
        tagName: tagNames.find((n) => n === tagName) ?? '',
        tagValue,
        smoothingWindow,
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
