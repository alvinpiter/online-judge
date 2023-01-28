export function leftShift(num: number, numberOfShifts: number): number {
  let result = num;
  for (let i = 1; i <= numberOfShifts; i++) {
    result *= 2;
  }

  return result;
}
