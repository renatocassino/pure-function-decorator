import { decorateFn } from "../src/decorator";

const sum = decorateFn((a: number, b: number) => a + b, (runner: () => unknown) => {
  console.log('Start FN');
  const response = runner();
  console.log('End FN');
  return response;
});

console.log(sum(1, 2));

/*
Result:

Start FN
End FN
3
*/
