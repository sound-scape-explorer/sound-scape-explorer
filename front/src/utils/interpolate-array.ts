const linearInterpolate = (
  before: number,
  after: number,
  atPoint: number,
): number => {
  return before + (after - before) * atPoint;
};

export function interpolateArray(data: number[], fitCount: number) {
  const newData = [];
  const springFactor = new Number((data.length - 1) / (fitCount - 1));

  newData[0] = data[0]; // for new allocation

  for (let i = 1; i < fitCount - 1; i++) {
    const tmp = i * springFactor.valueOf();
    const before = new Number(Math.floor(tmp)).toFixed();
    const after = new Number(Math.ceil(tmp)).toFixed();
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
