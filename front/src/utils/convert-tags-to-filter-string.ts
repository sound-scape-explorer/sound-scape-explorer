export function convertTagsToFilterString(tags: string[]): string {
  const string = tags.reduce((acc, currentValue) => `${acc} @${currentValue}`);
  return `@${string}`;
}
