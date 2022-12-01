import { decorateFn } from '../src/decorator';

describe('#decorator', () => {
    it('should call function when call decorated method', () => {
        const fn = jest.fn().mockReturnValue(1);
        const decorator = (runner: () => unknown) => runner();
        const fnDecorated = decorateFn(fn, decorator);
        const response = fnDecorated();
        expect(fn).toBeCalled();
        expect(response).toBe(1);
    });

    it('should not call function when decorator dont call runner', () => {
        const fn = jest.fn().mockReturnValue(1);
        const decorator = (_runner: () => unknown) => { return false; };
        const fnDecorated = decorateFn(fn, decorator);
        const response = fnDecorated();
        expect(fn).not.toBeCalled();
        expect(response).toBeFalsy()
    });

    it('should call in order of decorator function', () => {
        const watcher = jest.fn();

        const fn = () => watcher('core function');
        const decorator = (runner: () => unknown) => { 
            watcher('start');
            const response = runner();
            watcher('end');
            return response;
         };
        const fnDecorated = decorateFn(fn, decorator);
        fnDecorated();
        expect(watcher).toHaveBeenCalledTimes(3);
        expect(watcher).toHaveBeenNthCalledWith(1, 'start');
        expect(watcher).toHaveBeenNthCalledWith(2, 'core function');
        expect(watcher).toHaveBeenNthCalledWith(3, 'end');
    });
});
