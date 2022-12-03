# Pure Function decorator

Decorators to use in functions.

The experimental decorators proposal don't work with functions, only with methods. But many developers prefer to use functions instead of classes and in this way is impossible to use decorators.

Decorators is just a design pattern. This repo create a simple implementation to javascript and typescript to use this pattern in your project with functions.

## Installation

```bash
$ npm i --save pure-function-decorator
```

## Usage

You must import the function `decorateFn` and pass two parameters. The first parameter is the decorator and the second is the original function. The original function should pass as parameter to decorator. All decorators should receive just a callback called `runner`.

Ps: The function runner knows the args, and you dont need to pass parameters again. This is a [curry](https://javascript.info/currying-partials) function and all parameters already exist inside the function.

I know that the dream is use `@myDecorator`, but I have no idea how to add this in native Typescript.

### Sync way

Example: Log a synchronous function execution

```typescript
import { decorateFn } from 'pure-function-decorator';
import type { RunnerFn } from 'pure-function-decorator';
import fs from 'fs';

const loggerDecorator = (runner: RunnerFn) => {
  console.log('Start to run');
  const response = runner();
  console.log('End to run');
  return response;
};

// With anonymous function
const readMyLog = decorateFn(loggerDecorator, (logFile: string): string => {
  const myLog = fs.readFileSync(logFile).toString();

  return myLog;
});

// OR with function as param
const readMyLog = (logFile: string): string => {
  const myLog = fs.readFileSync(logFile).toString();

  return myLog;
};

const readMyLodDecorated = decorateFn(loggerDecorator, readMyLog);

console.log(readMyLog('./log001.txt'));
/*
Start to run
[DEBUG] Make request to api
.....
End to run
 */
```

### Async way

Example: Log a time of request to api

```typescript
import { decorateFn } from '../src/decorator';
import axios from 'axios';

const measureTimeAsync = async (runner: () => unknown) => {
  console.time('Runner');
  console.log('Start request');
  const response = await runner();
  console.timeEnd('Runner');

  return response;
};

const getGithubUser = async (githubUsername: string) => {
  const user = await axios.get(`https://api.github.com/users/${githubUsername}`);

  return user.data;
};

const getGithubUserDecorated = decorateFn(getGithubUser, measureTimeAsync);

getGithubUserDecorated('renatocassino').then(console.log);

/*
Result:

Start request
Runner: 259.274ms
{
  login: 'renatocassino',
  ........
*/
```

### Compose decorators

If you have multiple decorators, you dont need to call in this way:

```typescript
const functionWithMultipleDecorators = decoratedFn(
  logger,
  decoratedFn(measureTime, decoratedFn(sendMetrics, myOriginalFunction)),
); // Works, but isnt legible to read
```

This lib there is another function called `composeDecorators`. The first param is an array of decorators and the second parameter is the original function.

```typescript
import { composeDecorators } from 'pure-function-decorator';

const functionWithMultipleDecorators = composeDecorators(
  [logger, measureTime, sendMetrics],
  myOriginalFunction,
); // Better way :)
```

There are multiple examples in folder [examples](https://github.com/renatocassino/pure-function-decorator/tree/main/examples);
