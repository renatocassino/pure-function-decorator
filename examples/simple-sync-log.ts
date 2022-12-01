import { decorateFn } from '../src/decorator'

const logger = (runner: () => unknown): unknown => {
  console.log('Start FN')
  const response = runner()
  console.log('End FN')
  return response
}

const sum = (a: number, b: number): number => a + b

const sumDecorated = decorateFn(sum, logger)

console.log(sumDecorated(1, 2))
/*
Result:

Start FN
End FN
3
*/
