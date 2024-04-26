export function convertObjectToJsonString(object: unknown): string {
  return (
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(object, undefined, 2))
  );
}
