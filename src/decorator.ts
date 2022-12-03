export type FnAny = (...args: any) => any
export interface Config<T = unknown> {
  args: T
}

export type RunnerFn<TReturn = unknown, TArgs = unknown> = (runner: () => TReturn, config: Config<TArgs>) => TReturn | Promise<TReturn>

export const decorateFn = <TReturn = unknown, TArgs = unknown>(fn: FnAny, decoratorFunction: RunnerFn<TReturn, TArgs>): FnAny => {
  return (...args: any) => {
    const runner = (): TReturn => fn(...args)
    return decoratorFunction(runner, { args })
  }
}

export const composeDecorators = (fn: FnAny, decorators: RunnerFn[]): FnAny => (
  decorators.reduce((acc, decorator) => decorateFn(acc, decorator), fn)
)
