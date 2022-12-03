import { decorateFn } from '../src/decorator'
import type { RunnerFn } from '../src/decorator'

const cache: { [key: string]: number } = {}
const memoize: RunnerFn<number, number[]> = (runner, { args }) => {
  const [n] = args
  if (n in cache) {
    return cache[n]
  }
  const result = runner()
  cache[n] = result
  return result
}

const sleep = (seconds: number): void => {
  const start = (new Date()).getTime()

  while (true) {
    if ((new Date()).getTime() - start >= seconds * 1e3) { // must be gte!
      return
    }
  }
}

const reallySlowFunction = (n: number): number => {
  sleep(n)
  return n
}

const fibMemoized = decorateFn(reallySlowFunction, memoize)

console.time()
const result = fibMemoized(4)
console.timeEnd()

console.time()
const result2 = fibMemoized(4)
console.timeEnd()
console.log(result, result2)
/*
Result:

{}
default: 4.002s
{ '4': 4 }
default: 0.859ms
4 4
*/
