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
