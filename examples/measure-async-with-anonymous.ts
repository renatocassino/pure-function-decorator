// If you want run this example, you need to install axios lib
import { decorateFn } from "../src/decorator";
// @ts-ignore
import axios from 'axios';

const measureTimeAsync = async (runner: () => unknown) => {
  console.time('Runner');
  console.log('Start request');
  const response = await runner();
  console.timeEnd('Runner');

  return response;
};
const getGithubUser = decorateFn(async (githubUsername: string) => {
    const user = await axios.get(`https://api.github.com/users/${githubUsername}`);

    return user.data;
}, measureTimeAsync);

getGithubUser('renatocassino').then(console.log);

/*
Result:

Start request
Runner: 259.274ms
{
  login: 'renatocassino',
  ........
*/
