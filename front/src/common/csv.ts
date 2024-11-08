import {CsvError} from 'src/common/Errors';
import {convertArrayToCsv} from 'src/utils/arrays';

export class Csv {
  columns: string[];

  rows: string[][];

  separator: string;

  currentRow: string[];

  public constructor() {
    this.columns = [];
    this.rows = [];
    this.currentRow = [];
    this.separator = ',';
  }

  public addColumn(column: string) {
    if (this.columns.includes(column)) {
      const msg = `Column ${column} already exists`;
      throw new CsvError(msg);
    }

    this.columns.push(column);
  }

  public createRow() {
    const row: string[] = [];
    this.currentRow = row;
    this.rows.push(row);
    return this.currentRow;
  }

  public addToCurrentRow(value: string) {
    this.currentRow.push(value);
    return this.currentRow;
  }

  public download(name: string) {
    const data = convertArrayToCsv(
      this.rows.map((row) => row.join(this.separator)),
      this.columns.join(this.separator),
    );

    const anchor = document.createElement('a');
    anchor.download = `${name}.csv`;
    anchor.href = data;
    anchor.click();
    anchor.remove();
  }
}
