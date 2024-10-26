import {LINEBREAK} from 'src/constants';

export function trimRectangular<T>(
  array: T[][],
  filterWith: string | number | null = null,
): T[][] {
  const isNanStrategy =
    typeof filterWith === 'number' && Number.isNaN(filterWith);

  const trimmedArray = [];

  for (const sublist of array) {
    const trimmedSublist = sublist.filter((element) => {
      if (isNanStrategy) {
        return !Number.isNaN(element);
      }

      return element !== filterWith;
    });
    trimmedArray.push(trimmedSublist);
  }

  return trimmedArray;
}

interface SumArraysIndexWiseProps {
  arrays: number[][];
  index?: number;
  result?: number[];
  doAveraging?: boolean;
}

export function sumArraysIndexWise({
  arrays,
  index = 0,
  result = [],
  doAveraging = false,
}: SumArraysIndexWiseProps): number[] {
  if (index >= arrays[0].length) {
    return result;
  }

  let sum = 0;
  for (const array of arrays) {
    sum += array[index];
  }

  if (doAveraging) {
    result.push(sum / arrays.length);
  } else {
    result.push(sum);
  }

  return sumArraysIndexWise({
    arrays: arrays,
    index: index + 1,
    result: result,
    doAveraging: doAveraging,
  });
}

export function convertArrayToCsv(
  content: string[],
  firstRow?: string,
): string {
  let csv = 'data:text/csv;charset=utf-8,';

  if (firstRow) {
    csv += firstRow;
    csv += LINEBREAK;
  }

  content.forEach((contentRow) => {
    csv += contentRow;
    csv += LINEBREAK;
  });

  return csv;
}

export function convertArrayToText(array: string[]): string {
  let content = 'data:text/plain;charset=utf-8,';
  content += array.join('\n');
  return content;
}

export function createIndicesArray(length: number) {
  const array = new Array(length);

  for (let i = 0; i < length; i += 1) {
    array[i] = i;
  }

  return array;
}

function linearInterpolate(
  before: number,
  after: number,
  atPoint: number,
): number {
  return before + (after - before) * atPoint;
}

export function interpolateArray(data: number[], fitCount: number) {
  const newData = [];
  const springFactor = Number((data.length - 1) / (fitCount - 1));

  newData[0] = data[0]; // for new allocation

  for (let i = 1; i < fitCount - 1; i++) {
    const tmp = i * springFactor.valueOf();
    const before = Number(Math.floor(tmp)).toFixed();
    const after = Number(Math.ceil(tmp)).toFixed();
    const atPoint = tmp - Number(before);
    newData[i] = linearInterpolate(
      data[Number(before)],
      data[Number(after)],
      atPoint,
    );
  }

  newData[fitCount - 1] = data[data.length - 1]; // for new allocation

  return newData;
}
