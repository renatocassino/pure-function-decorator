import { decorateFn } from '../src/decorator'

const logger = (runner: () => unknown): unknown => {
  console.log('Start FN')
  const response = runner()
  console.log('End FN')
  return response
}

const sum = decorateFn((a: number, b: number) => a + b, logger)
console.log(sum(1, 2))

/*
Result:

Start FN
End FN
3
*/
