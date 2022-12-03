/* eslint-disable @typescript-eslint/no-floating-promises */
// If you want run this example, you need to install axios lib
import { fnDecorator } from '../src/decorator'
// @ts-expect-error
import axios from 'axios'

const measureTimeAsync = (_target: any, _propertyKey: any, descriptor: PropertyDescriptor): void => {
  const oldValue = descriptor.value

  descriptor.value = async function () {
    console.time('Runner')
    console.log('Start request')
    const response = await oldValue.apply(this, arguments)
    console.timeEnd('Runner')

    return response
  }
}

const logger = (_target: any, _propertyKey: any, descriptor: PropertyDescriptor): void => {
  const oldValue = descriptor.value

  descriptor.value = function () {
    console.log(`Arguments: ${JSON.stringify(arguments)}`)
    return oldValue.apply(this, arguments)
  }
}

const memoize = (_target: any, _propertyKey: any, descriptor: PropertyDescriptor): void => {
  const oldValue = descriptor.value
  const cache = new Map()
  descriptor.value = function () {
    const key = JSON.stringify(arguments)
    if (cache.has(key)) {
      console.log('Get from cache')
      return cache.get(key)
    }
    const result = oldValue.apply(this, arguments)
    cache.set(key, result)
    return result
  }
}

const logError = (_target: any, _propertyKey: any, descriptor: PropertyDescriptor): any => {
  const oldValue = descriptor.value
  descriptor.value = async function () {
    try {
      const response = await oldValue.apply(this, arguments)
      return response
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

const getGithubUser = async (githubUsername: string): Promise<string> => {
  const user = await axios.get(`https://api.github.com/users/${githubUsername}`)

  return user.data
}

const getGithubUserDecorated = fnDecorator([logger, measureTimeAsync, memoize, logError], getGithubUser);

(async () => {
  // Should return error
  console.log(await getGithubUserDecorated('renatocassino12312'))
  // Should return data but in 200ms
  console.log(await getGithubUserDecorated('renatocassino'))
  // Should get value memoized and return in 0ms
  console.log(await getGithubUserDecorated('renatocassino'))
})()

/**
Result:

Arguments: {"0":"renatocassino12312"}
Start request
AxiosError: Request failed with status code 404
Runner: 286.282ms
null
Arguments: {"0":"renatocassino"}
Start request
Runner: 222.221ms
{
  login: 'renatocassino',
...
Arguments: {"0":"renatocassino"}
Start request
Get from cache
Runner: 0.072ms
{
  login: 'renatocassino',
...
}
*/
