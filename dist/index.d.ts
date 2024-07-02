import { Context, Options } from "./types";
export declare class EventsManager {
    private readonly context;
    private options;
    readonly eventsList: Record<string, Function[]>;
    constructor(context?: Context, options?: Partial<Options>);
    eventNames(): string[];
    /**
     * Fire an event
     * @param eventName
     * @param responseObj
     */
    fire(eventName: string, responseObj?: Record<string, any>): void;
    /**
     * Add custom event listener
     */
    add(eventName: string, callback: Function): void;
}
