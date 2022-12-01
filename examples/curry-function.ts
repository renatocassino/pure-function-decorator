import { decorateFn } from '../src/decorator'

const doubleNumber = decorateFn((a: number) => a, (runner: () => unknown) => {
  const number = runner() as number
  return number * 2
})

const tripleNumber = decorateFn((a: number) => a, (runner: () => unknown) => {
  const number = runner() as number
  return number * 3
})

console.log(doubleNumber(5))
console.log(tripleNumber(5))
/*
Result:

10
15
*/
