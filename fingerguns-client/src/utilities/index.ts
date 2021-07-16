export function getAtMostN<T>(arr: T[], n: number): T[] {
  const numberToTake = Math.min(n, arr.length);
  return arr.slice(0, numberToTake);
}
