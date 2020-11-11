const sum = (items: Array<number>): number => {
  const reducer = (accamulator: number, currentValue: number) => accamulator + currentValue
  return items.reduce(reducer, 0)
}

const countBy = (items: Array<number>): Record<string, number> => {
  const reducer = (accumulator: Record<string, number>, currentValue: number): Record<string, number> => {
    if (accumulator[currentValue] == null) {
      accumulator[currentValue] = 1
      return accumulator
    } 

    accumulator[currentValue] = accumulator[currentValue] + 1
    return accumulator
  }

  return items.reduce<Record<string, number>>(reducer, {})
} 

export const numbersReg = /\d/g

type BirthDayNumbers = Array<number>

export type CellsNumbers = Array<number>

type PyhographData = {
  psyNumber: number, // 1 - young spirit, 2 - shudra, 3 - host, 4 - warrior
  /**
   * amount of digits in cells [0..9]
   * [0:4, // 3, 0, 3, 1, 1, 1, 0, 1, 2]
  */
  cells: CellsNumbers,
  calculatedNumbers: Array<number>, // ?
  dateNumbers: Array<number>, // ?
  squareNumbers: {[key: string]: number}, // ?
}

// type ResultCells = {
//   dateNumbers: numberArr,
//   calculatedNumbers,
//   squareNumbers,
//   cells,
//   psyNumber,
// }

/*
  Q7 = SUM(A7:K7)
  Q8 = Q7 - S7
  S7 = A7 === 0 ? B7 * 2 : A7 * 2
  R8 = A8 + B8
  S8 =

  1(A8) INT(Q7/10) +
  2(B8) Q7 - A8*10 +
  .(C8)
  3(D8) R8 > 9 ? 1 : 0
  4(E8) R8 > 9 ? R8 - 10 : R8
  .()
  5(G8) INT(Q8/10)
  6(H8) Q8 - G8 * 10
  .()
  7(J8) S8 > 9 ? 1 : 0
  8(K8) S8 > 9 ? S8 - 10 : S8
*/

// @TODO tests
export default function getCells(date: string): PyhographData {

  const numberArr: BirthDayNumbers = getNumbersFromDate(date)
  let calculatedNumbers = []
  // Q7
  const sumBirthDayNumbers = sum(numberArr)
  // S7 = A7 === 0 ? B7 * 2 : A7 * 2
  const S7 = numberArr[0] === 0 ? numberArr[1] * 2 : numberArr[0] * 2
  // Q8 = Q7 - S7
  const Q8 = sumBirthDayNumbers - S7


  calculatedNumbers[0] = Math.trunc(sumBirthDayNumbers / 10) // 1(A8) INT(Q7/10)

  calculatedNumbers[1] = sumBirthDayNumbers - (calculatedNumbers[0] * 10) // 2(B8) Q7 - A8*10

  // R8
  const R8 = calculatedNumbers[0] + calculatedNumbers[1]

  calculatedNumbers[2] = R8 > 9 ? 1 : 0
  calculatedNumbers[3] = R8 > 9 ? R8 - 10 : R8

  calculatedNumbers[4] = Math.trunc(Q8 / 10)
  calculatedNumbers[5] = Q8 - (calculatedNumbers[4] * 10)

  const S8 = calculatedNumbers[4] + calculatedNumbers[5]

  calculatedNumbers[6] = S8 > 9 ? 1 : 0
  calculatedNumbers[7] = S8 > 9 ? S8 - 10 : S8

  const resultTmp = [...numberArr, ...calculatedNumbers].sort()


  const squareNumbers = countBy(resultTmp)

  let cells = []

  for(let i = 0; i < 10; i++) {
    cells[i] = squareNumbers[i] ? squareNumbers[i] : 0
  }

  // N15 = =(M12*N11*O13+O12*N13*M11+M11*N12*O13)-(M13*N11*O12+M12*N13*O11+M13*N12*O11)
  // O15 = M11*N12-M12*N12
  const n = (i: number) => squareNumbers[i] ? squareNumbers[i] : 0

  const N15 = ((n(2) * n(4) * n(9)) +
               (n(8) * n(6) * n(1)) +
               (n(1) * n(5) * n(9))
              ) -
              ((n(3) * n(4) * n(8)) +
               (n(2) * n(6) * n(7)) +
               (n(3) * n(5) * n(7)))

  const O15 = n(1) * n(5) - n(2) * n(5)

  const psyNumber = ((N15 === 0 && O15 === 0) && 1) ||
              ((N15 !== 0 && O15  <  0) && 2) ||
              ((N15 !== 0 && O15  >  0) && 3) ||
              ((N15 !== 0 && O15 === 0) && 4) ||
              ((N15 === 0 && O15  <  0) && 5) ||
              ((N15 === 0 && O15  >  0) && 6) || -1


  return {
    dateNumbers: numberArr,
    calculatedNumbers,
    squareNumbers,
    cells,
    psyNumber,
  }

  // for (let i = 0; i < 10; i++) {
  //   result[]
  // }
}

function getNumbersFromDate(date: string): BirthDayNumbers {
  const numbers = date.match(numbersReg)
  if (numbers === null) return []
  return numbers.map(s => parseInt(s, 10))
}
