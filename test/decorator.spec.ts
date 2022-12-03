import { decorateFn } from '../src/decorator'
import type { RunnerFn } from '../src/decorator'

describe('#decorator', () => {
  it('should call function when call decorated method', () => {
    const fn = jest.fn().mockReturnValue(1)
    const decorator: RunnerFn = (runner: () => unknown) => runner()
    const fnDecorated = decorateFn(fn, decorator)
    const response = fnDecorated()
    expect(fn).toBeCalled()
    expect(response).toBe(1)
  })

  it('should not call function when decorator dont call runner', () => {
    const fn = jest.fn().mockReturnValue(1)
    const decorator: RunnerFn = (_runner: () => unknown) => { return false }
    const fnDecorated = decorateFn(fn, decorator)
    const response = fnDecorated()
    expect(fn).not.toBeCalled()
    expect(response).toBeFalsy()
  })

  it('should call in order of decorator function', () => {
    const watcher = jest.fn()

    const fn = () => watcher('core function')
    const decorator: RunnerFn = (runner) => {
      watcher('start')
      const response = runner()
      watcher('end')
      return response
    }
    const fnDecorated = decorateFn(fn, decorator)
    fnDecorated()
    expect(watcher).toHaveBeenCalledTimes(3)
    expect(watcher).toHaveBeenNthCalledWith(1, 'start')
    expect(watcher).toHaveBeenNthCalledWith(2, 'core function')
    expect(watcher).toHaveBeenNthCalledWith(3, 'end')
  })

  it('should call and get args', () => {
    expect.assertions(3)
    const fn = jest.fn().mockReturnValue(1)
    interface Args { a: number }
    const decorator: RunnerFn<number, Args> = (runner, { args }) => {
      const number = runner()

      expect(args).toEqual([{ a: 1 }])
      return number
    }
    const fnDecorated = decorateFn<number, Args>(fn, decorator)
    const response = fnDecorated({ a: 1 })
    expect(fn).toBeCalled()
    expect(response).toBe(1)
  })
})
