// care: these functions mutate their arguments

export const swapPrevious = <T>(array: T[], i: number) => {
  [array[i], array[i - 1]] = [array[i - 1], array[i]];
};

export const swapNext = <T>(array: T[], i: number) => {
  [array[i], array[i + 1]] = [array[i + 1], array[i]];
};
