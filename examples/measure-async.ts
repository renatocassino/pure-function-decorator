// If you want run this example, you need to install axios lib
import { fnDecorator } from '../src/decorator'
// @ts-expect-error
import axios from 'axios'

const measureTimeAsync = (_target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
  const oldValue = descriptor.value

  descriptor.value = async function () {
    console.time('Runner')
    console.log('Start request')
    const response = await oldValue.apply(this, arguments)
    console.timeEnd('Runner')

    return response
  }
}

const getGithubUser = async (githubUsername: string): Promise<unknown> => {
  const user = await axios.get<unknown>(`https://api.github.com/users/${githubUsername}`)

  return user.data
}

const getGithubUserDecorated = fnDecorator(measureTimeAsync, getGithubUser)

getGithubUserDecorated('renatocassino').then(console.log)

/*
Result:

Start request
Runner: 259.274ms
{
  login: 'renatocassino',
  ........
*/
