# Pure Function decorator

## What is this project?

I love typescript decorators <3, but we know that is impossible to use in pure functions, only in methods in class. But in Typescript we usually prefer to use just functions instead of classes and methods. This project is a "Hack" to use the same implementation of method decorators in pure functions (but without the sintax @myDecorator, I'm sorry). This happens because the [Property Descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) just work in classes.

Decorators is just a design pattern. This repo create a simple implementation to javascript and typescript to use this pattern in your project with functions.

## Installation

```bash
$ npm i --save pure-function-decorator
```

## Usage

In [method decorator](https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators) in Typescript receives 3 parameters. The `target`, the `propertyKey` and the `descriptor`. The target is the class, the propertyKey is the name of method and the descriptor is an instance of [Property Descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor). To keep the compatibility in pure functions, the target should be null and the property descriptor should be generate in instanciation. The propertyKey is the name of function.

You must import the function `fnDecorator` and pass two parameters. The first is the list of decorators (if is just one decorator you don't need to pass an array) and the second parameter is the function.

In the descriptor, exists the attribute called `value`. The value (in method decorator)

### Sync way

Example: Log a synchronous function execution

```typescript
import { decorateFn } from 'pure-function-decorator';

const logger = (_target: any, _propertyKey: any, descriptor: PropertyDescriptor): void => {
  // descriptor.value is the original function
  const oldValue = descriptor.value; // save in aux

  // replace the value with another function
  // If you use `descriptor.value = () => {}` instead of function,
  //   you cannot access the `arguments`
  descriptor.value = function () {
    console.log('Start FN');
    const response = oldValue.apply(this, arguments);
    console.log('End FN');

    return response;
  };
};

const sum = (a: number, b: number): number => a + b;
const sumDecorated = fnDecorator(logger, sum);
console.log(sumDecorated(1, 2));
/*
Result:

Start FN
End FN
3
*/
```

<b>PS: Is IMPORTANT to descriptor.value is a function instead of `() => {}`, because with function sintax you can get the `attributes`.</b>

The greatest advantage is that you can use the same decorator in methods, like this:

```typescript
// Same for decorator for a class works like a charm
class MyClass {
  @logger
  sum(a: number, b: number): number {
    return a + b;
  }
}

const math = new MyClass();
console.log(math.sum(1, 2));
```

### Async way

Example: Log a time of request to api

```typescript
import { fnDecorator } from '../src/decorator';
import axios from 'axios';

const measureTimeAsync = (
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
): void => {
  const oldValue = descriptor.value;

  descriptor.value = async function () {
    console.time('Runner');
    console.log('Start request');
    const response = await oldValue.apply(this, arguments);
    console.timeEnd('Runner');

    return response;
  };
};

const getGithubUser = async (githubUsername: string): Promise<unknown> => {
  const user = await axios.get<unknown>(`https://api.github.com/users/${githubUsername}`);

  return user.data;
};

const getGithubUserDecorated = fnDecorator(measureTimeAsync, getGithubUser);

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

There are multiple examples in folder [examples](https://github.com/renatocassino/pure-function-decorator/tree/main/examples);
