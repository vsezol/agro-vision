export function hasKey<T extends object, K extends string>(
  value: T,
  key: K
): value is T & { [key in K]: unknown } {
  return Object.prototype.hasOwnProperty.call(value, key);
}
