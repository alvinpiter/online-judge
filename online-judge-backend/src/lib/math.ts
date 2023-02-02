export function leftShift(num: number, numberOfShifts: number): number {
  return num * Math.pow(2, numberOfShifts);
}

export function rightShift(num: number, numberOfShifts: number): number {
  let result = num;
  for (let repetition = 1; repetition <= numberOfShifts; repetition++) {
    result = Math.floor(result / 2);
  }

  return result;
}
