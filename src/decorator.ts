import { decorateFunction } from './decorateFunction'

export const fnDecorator = (decorators: any[] | any, fn: Function): Function => {
  const fakeObjectKlass = { fn }
  const decoratorList = Array.isArray(decorators) ? decorators : [decorators]
  const decorated = decorateFunction(decoratorList, fn, fn.name, Object.getOwnPropertyDescriptor(fakeObjectKlass, 'fn'))

  return decorated.value
}
