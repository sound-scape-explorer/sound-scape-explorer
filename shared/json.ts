export function stringifyJsonPretty<T>(object: T) {
  return JSON.stringify(object, null, 2);
}
