import { fnDecorator } from '../src/decorator'

const logger = (_target: any, _propertyKey: any, descriptor: PropertyDescriptor): void => {
  const oldValue = descriptor.value
  descriptor.value = function () {
    console.log('Start FN')
    const response = oldValue.apply(this, arguments)
    console.log('End FN')

    return response
  }
}

const sum = (a: number, b: number): number => a + b

const sumDecorated = fnDecorator(logger, sum)

console.log(sumDecorated(1, 2))

// Same for decorator for a class works like a charm
// class MyClass {
//   @logger
//   sum (a: number, b: number): number {
//     return a + b
//   }
// }

// const math = new MyClass()
// console.log(math.sum(1, 2))
/*
Result:

Start FN
End FN
3
*/
