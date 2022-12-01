export type FnAny = (...args: any) => any;
export type RunnerFn = (runner: () => unknown) => unknown | Promise<unknown>;

export const decorateFn = (fn: FnAny, cb: RunnerFn): FnAny => {
  return (...args: any) => {
    const runner = () => fn(...args);
    return cb(runner);
  };
};

export const composeDecorators = (fn: FnAny, decorators: RunnerFn[]): FnAny => (
  decorators.reduce((acc, decorator) => decorateFn(acc, decorator), fn)
);
