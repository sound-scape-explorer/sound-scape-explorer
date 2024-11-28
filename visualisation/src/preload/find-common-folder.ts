import path from 'node:path';

export function findCommonFolder(paths: string[]) {
  if (paths.length === 0) {
    return '';
  }

  if (paths.length === 1) {
    return path.dirname(paths[0]) + path.sep;
  }

  const normalizedPaths = paths.map((p) => path.normalize(p));
  const segments = normalizedPaths.map((p) => p.split(path.sep));
  const commonParts: string[] = [];

  for (let i = 0; i < segments[0].length; i += 1) {
    const segment = segments[0][i];

    const isCommon = segments.every(
      (parts) => i < parts.length && parts[i] === segment,
    );

    if (!isCommon) {
      break;
    }

    commonParts.push(segment);
  }

  if (commonParts.length === 0) {
    return '';
  }

  return commonParts.join(path.sep);
}
