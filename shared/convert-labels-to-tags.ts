import {readFileSync, writeFileSync} from 'fs';

const target = process.argv[2];
const json = JSON.parse(readFileSync(target, 'utf8'));

type LabelProperty = `LABEL_${string}`;

interface File {
  Index: string;
  Path: string;
  Date: string;
  Site: string;

  [p: LabelProperty]: string;
}

interface NewFile {
  Index: string;
  Path: string;
  Date: string;
  Site: string;
  tags: Record<string, string>;
}

const files: File[] = json.files;
const newFiles: NewFile[] = [];

for (const file of files) {
  const keys = Object.keys(file);
  const labels = keys.filter((key) => key.startsWith('LABEL_')) as LabelProperty[];

  const newFile: NewFile = {
    Index: file.Index,
    Path: file.Path,
    Date: file.Date,
    Site: file.Site,
    tags: {},
  };

  for (const label of labels) {
    const tag = label.replace('LABEL_', '');
    const value = file[label];
    newFile.tags[tag] = value;
  }

  newFiles.push(newFile);
}

const newJson = {
  ...json,
  files: newFiles,
};

writeFileSync(target, JSON.stringify(newJson, null, 2));
