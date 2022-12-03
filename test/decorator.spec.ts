import { fnDecorator } from '../src/decorator'

describe('#fnDecorator', () => {
  it('should call function when call decorated method', () => {
    const fn = jest.fn().mockReturnValue(1)
    const decorator = (_target: any, propertyKey: any, descriptor: PropertyDescriptor): void => {}
    const fnDecorated = fnDecorator(decorator, fn)
    const response = fnDecorated()
    expect(fn).toBeCalled()
    expect(response).toBe(1)
  })

  it('should call function when call decorated method passing as array', () => {
    const fn = jest.fn().mockReturnValue(1)
    const decorator = (_target: any, propertyKey: any, descriptor: PropertyDescriptor): void => {}
    const fnDecorated = fnDecorator([decorator], fn)
    const response = fnDecorated()
    expect(fn).toBeCalled()
    expect(response).toBe(1)
  })

  it('should not call function when decorator dont call runner', () => {
    const fn = jest.fn().mockReturnValue(1)
    const decorator = (_target: any, propertyKey: any, descriptor: PropertyDescriptor): void => {
      descriptor.value = function () {
        // Not call here
      }
    }
    const fnDecorated = fnDecorator([decorator], fn)
    const response = fnDecorated()
    expect(fn).not.toBeCalled()
    expect(response).toBeFalsy()
  })

  it('should call in order of decorator function', () => {
    const watcher = jest.fn()

    const fn = (): any => watcher('core function')
    const decorator = (_target: any, propertyKey: any, descriptor: PropertyDescriptor): void => {
      const oldValue = descriptor.value
      descriptor.value = function () {
        watcher('start')
        const response = oldValue.apply(this, arguments)
        watcher('end')
        return response
      }
    }
    const fnDecorated = fnDecorator(decorator, fn)
    fnDecorated()
    expect(watcher).toHaveBeenCalledTimes(3)
    expect(watcher).toHaveBeenNthCalledWith(1, 'start')
    expect(watcher).toHaveBeenNthCalledWith(2, 'core function')
    expect(watcher).toHaveBeenNthCalledWith(3, 'end')
  })
})
