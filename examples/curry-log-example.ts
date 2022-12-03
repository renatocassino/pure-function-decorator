import { fnDecorator } from '../src/decorator'

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

const logText = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR'
}

const loggerDecorator = (logLevel: LogLevel) => {
  return (_target: any, propertyKey: any, descriptor: PropertyDescriptor) => {
    const oldValue = descriptor.value

    descriptor.value = function () {
      const currentLogLevel = arguments.length >= 1 ? arguments[1] : LogLevel.INFO
      if (logLevel >= currentLogLevel) {
        return
      }

      oldValue.apply(this, arguments)
    }
  }
}

const logger = fnDecorator([loggerDecorator(LogLevel.INFO)], (logMessage: string, level: LogLevel) => {
  return console.log(`${logText[level]}\t[${new Date().toISOString()}]\t${logMessage}`)
})

logger('My Debug Message', LogLevel.DEBUG)
logger('My Info Message', LogLevel.INFO)
logger('My Error Message', LogLevel.ERROR)
logger('My Warn Message', LogLevel.WARN)
/*
Result (Ignore error and debug messages):

ERROR   [2022-12-03T22:03:47.149Z]      My Error Message
WARN    [2022-12-03T22:03:47.150Z]      My Warn Message
*/
