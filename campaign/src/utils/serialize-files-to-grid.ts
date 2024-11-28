import dayjs from 'dayjs';
import {type InputFile, type OutputFile} from 'src/types.ts';

export function serializeFilesToGrid(files: InputFile[]): OutputFile[] {
  const rows = new Array<OutputFile>(files.length);

  for (let f = 0; f < files.length; f += 1) {
    const file = files[f];

    const row: OutputFile = {
      index: f,
      path: file.path,
      date: dayjs(file.lastModified).toISOString(),
      site: file.name,
    };

    rows[f] = row;
  }

  return rows;
}