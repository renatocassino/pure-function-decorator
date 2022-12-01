import { composeDecorators } from '../src/decorator'
import fs from 'fs'
import path from 'path'

const logger = (runner: () => unknown): unknown => {
  console.log('Start FN')
  const response = runner()
  console.log('End FN')
  return response
}

const measureTime = (runner: () => unknown): unknown => {
  console.time('Runner')
  const response = runner()
  console.timeEnd('Runner')
  return response
}

const readFileChars = (filename: string): number => {
  return fs.readFileSync(filename, 'utf8').toString().length
}

const sumDecorated = composeDecorators(readFileChars, [measureTime, logger])

console.log(sumDecorated(path.join(__dirname, '/compose-sync-data.ts')))
/*
Result:

Start FN
Runner: 0.188ms
End FN
712
*/
