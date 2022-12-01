import { composeDecorators } from '../src/decorator';

describe('#composeDecorators', () => {
    it('should call multiple decorators', () => {
        const watcher = jest.fn();

        const fn = () => watcher('core function');
        const decorator1 = (runner: () => unknown) => { 
            watcher('start');
            const response = runner();
            watcher('end');
            return response;
         };
        const decorator2 = (runner: () => unknown) => { 
            watcher('start2');
            const response = runner();
            watcher('end2');
            return response;
         };
        const fnDecorated = composeDecorators(fn, [decorator1, decorator2]);
        fnDecorated();
        expect(watcher).toHaveBeenCalledTimes(5);
        expect(watcher).toHaveBeenNthCalledWith(1, 'start2');
        expect(watcher).toHaveBeenNthCalledWith(2, 'start');
        expect(watcher).toHaveBeenNthCalledWith(3, 'core function');
        expect(watcher).toHaveBeenNthCalledWith(4, 'end');
        expect(watcher).toHaveBeenNthCalledWith(5, 'end2');
    })
});