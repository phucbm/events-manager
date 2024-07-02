import {EventsManager} from "../src";
import {Context, Options} from "../src/types";

describe('EventsManager', () => {
    let context: Context;
    let options: Partial<Options>;
    let manager: EventsManager;

    beforeEach(() => {
        context = {options: {}};
        options = {names: ['onTestEvent']};
        manager = new EventsManager(context, options);
    });

    test('should add and fire events correctly', () => {
        const callback = jest.fn();
        manager.add('onTestEvent', callback);

        manager.fire('onTestEvent', {data: 'test'});

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith({
            instance: context,
            eventName: 'onTestEvent',
            data: 'test'
        });
    });

    test('should not fire unrecognized events', () => {
        console.warn = jest.fn();
        manager.fire('onUnknownEvent');

        expect(console.warn).toHaveBeenCalledWith(
            'Cannot fire unrecognized event "onUnknownEvent"',
            manager,
            {}
        );
    });

    test('should not add unrecognized events', () => {
        console.warn = jest.fn();
        const callback = jest.fn();
        manager.add('onUnknownEvent', callback);

        expect(console.warn).toHaveBeenCalledWith(
            'Cannot add unrecognized event "onUnknownEvent". Allow:',
            ['onTestEvent']
        );
        expect(manager.eventsList['onUnknownEvent']).toBeUndefined();
    });

    test('should handle context options events', () => {
        const eventOptionCallback = jest.fn();
        context.options = {
            onTestEvent: eventOptionCallback
        };

        manager.fire('onTestEvent', {data: 'test'});

        expect(eventOptionCallback).toHaveBeenCalledTimes(1);
        expect(eventOptionCallback).toHaveBeenCalledWith({
            instance: context,
            eventName: 'onTestEvent',
            data: 'test'
        });
    });

    test('should handle context config events', () => {
        const eventConfigCallback = jest.fn();
        context.config = {
            onTestEvent: eventConfigCallback
        };

        manager.fire('onTestEvent', {data: 'test'});

        expect(eventConfigCallback).toHaveBeenCalledTimes(1);
        expect(eventConfigCallback).toHaveBeenCalledWith({
            instance: context,
            eventName: 'onTestEvent',
            data: 'test'
        });
    });
});
