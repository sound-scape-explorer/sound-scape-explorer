export function convertToUnixMilliseconds(dateString: string): number {
  const date = new Date(dateString);
  const milliseconds = date.getTime();
  return milliseconds;
}
