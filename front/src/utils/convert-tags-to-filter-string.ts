export function convertTagsToFilterString(tags: string[]): string {
  return `@${tags.reduce((acc, currentValue) => `${acc} @${currentValue}`)}`;
}
