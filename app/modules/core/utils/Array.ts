export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function getLast<T>(array: T[]) {
  return array[array.length - 1];
}