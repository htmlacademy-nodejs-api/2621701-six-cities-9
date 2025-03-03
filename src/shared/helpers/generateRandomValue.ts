export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0
) {
  return Number((Math.random() * (max - min) + min).toFixed(numAfterDigit));
}
