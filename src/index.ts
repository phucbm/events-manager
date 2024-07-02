/**
 * Events Manager v0.0.2
 * An util class to manage event with these features:
 * 1. Able to assign event via context.options or context.config
 * 2. Able to assign event via method on()
 * 3. Consistently fire an event with fire() method
 */
import {getValidatedEventName} from "./utils";
import {Context, EventResponse, Options} from "./types";

export class EventsManager {
    private readonly context: Context;
    private options: Options;
    readonly eventsList: Record<string, Function[]>;

    constructor(context: Context = {options: {}}, options: Partial<Options> = {names: []}) {
        this.context = context;
        this.options = {
            names: [],
            ...options
        };

        // list of event listeners
        this.eventsList = {};
    }

    // get event names
    eventNames(): string[] {
        return this.options.names || [];
    }

    /**
     * Fire an event
     * @param eventName
     * @param responseObj
     */
    fire(eventName: string, responseObj: Record<string, any> = {}): void {
        if (!this.eventNames().includes(eventName)) {
            console.warn(`Cannot fire unrecognized event "${eventName}"`, this, responseObj);
            return;
        }
        const response: EventResponse = {
            instance: this.context,
            eventName,
            ...responseObj
        };

        // check if event is assigned in context.options or context.config
        const contextOptions = this.context.config ? this.context.config : this.context.options;
        if (contextOptions) {
            const eventFromOption = contextOptions[eventName];
            if (typeof eventFromOption === 'function') eventFromOption(response);
        }

        // check if event is assigned via on() method
        const callbacks = this.eventsList[eventName];
        if (callbacks?.length) {
            callbacks.forEach(callback => {
                if (typeof callback === 'function') callback(response);
            });
        }
    }

    /**
     * Add custom event listener
     */
    add(eventName: string, callback: Function): void {
        // validate event name
        eventName = getValidatedEventName(eventName);

        // check if event name is recognized
        if (!this.eventNames().includes(eventName)) {
            console.warn(`Cannot add unrecognized event "${eventName}". Allow:`, this.eventNames());
            return;
        }

        // add event listener
        if (!this.eventsList[eventName]) {
            this.eventsList[eventName] = [];
        }

        this.eventsList[eventName].push(callback);
    }
}