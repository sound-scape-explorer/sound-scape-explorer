import {readFileSync, writeFileSync} from 'fs';

const ENUMS_FILE = './shared/schemas/enums.json';
const TS_FILE = './shared/enums.ts';
const PY_FILE = './processing/processing/enums.py';

type Enums = Record<string, string[]>;
const enums: Enums = JSON.parse(readFileSync(ENUMS_FILE, 'utf8'));

const ts: string[] = [];
ts.push("import {z} from 'zod';");
ts.push('');

const py: string[] = [];
py.push('from enum import Enum');
py.push('');
py.push('');

for (const [key, value] of Object.entries(enums)) {
  // typescript
  ts.push(`export const ${key} = z.enum(${JSON.stringify(value)});`);
  ts.push('// eslint-disable-next-line no-redeclare');
  ts.push(`export type ${key} = z.infer<typeof ${key}>;`);
  ts.push('');

  // python
  py.push(`class ${key}(Enum):`);

  for (const v of value) {
    py.push(`    ${v} = "${v}"`);
  }

  py.push('');
  py.push('');
}

writeFileSync(TS_FILE, ts.join('\n'));
writeFileSync(PY_FILE, py.join('\n'));
