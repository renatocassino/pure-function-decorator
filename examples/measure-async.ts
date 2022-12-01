// If you want run this example, you need to install axios lib
import { decorateFn } from '../src/decorator'
// @ts-expect-error
import axios from 'axios'

const measureTimeAsync = async (runner: () => unknown): Promise<unknown> => {
  console.time('Runner')
  console.log('Start request')
  const response = await runner()
  console.timeEnd('Runner')

  return response
}

const getGithubUser = async (githubUsername: string): Promise<unknown> => {
  const user = await axios.get<unknown>(`https://api.github.com/users/${githubUsername}`)

  return user.data
}

const getGithubUserDecorated = decorateFn(getGithubUser, measureTimeAsync)

getGithubUserDecorated('renatocassino').then(console.log)

/*
Result:

Start request
Runner: 259.274ms
{
  login: 'renatocassino',
  ........
*/
