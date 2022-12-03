import { fnDecorator } from '../src/decorator'

const logger = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldValue = descriptor.value

    descriptor.value = function () {
      console.log('start')
      const response = oldValue.apply(this, arguments)
      console.log('end')
      return response
    }
  }
}

const decoratedFn = fnDecorator(logger(), (): null => {
  console.log('somethingHappen')
  return null
})
decoratedFn()

/*
Result:

Start FN
End FN
3
*/
