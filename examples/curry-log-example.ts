import { decorateFn } from '../src/decorator'

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

const LOG_LEVEL = LogLevel.INFO

const logText = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR'
}

const logger = decorateFn((logMessage: string, level: LogLevel) => {
  return { logMessage, level }
}, (runner: () => unknown) => {
  const { logMessage, level } = runner() as { logMessage: string, level: LogLevel }

  if (level > LOG_LEVEL) {
    return `[${logText[level]}]\t[${new Date().toISOString()}] ${logMessage}`
  }
  return null
})

console.log(logger('My Debug Message', LogLevel.DEBUG))
console.log(logger('My Info Message', LogLevel.INFO))
console.log(logger('My Error Message', LogLevel.ERROR))
console.log(logger('My Warn Message', LogLevel.WARN))
/*
Result:

null
null
[ERROR] [2022-12-01T20:47:38.140Z] My Error Message
[WARN]  [2022-12-01T20:47:38.140Z] My Warn Message
*/
