import { fnDecorator } from '../src/decorator'

const multiplyDecorator = (multiplier: number) => {
  return function (_target: any, _propertyKey: any, descriptor: PropertyDescriptor): void {
    const oldValue = descriptor.value
    descriptor.value = function () {
      const response = oldValue.apply(this, arguments)
      return response * multiplier
    }
  }
}

const doubleNumber = fnDecorator(multiplyDecorator(2), (a: number) => a)
const tripleNumber = fnDecorator(multiplyDecorator(3), (a: number) => a)
const doubleOfDouble = fnDecorator([
  multiplyDecorator(2),
  multiplyDecorator(2)
], (a: number) => a)

console.log(doubleNumber(5))
console.log(tripleNumber(5))
console.log(doubleOfDouble(5))
/*
Result:

10
15
20
*/
