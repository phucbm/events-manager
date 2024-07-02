export interface Context {
    config?: Record<string, any>;
    options?: Record<string, any>;
}
export interface Options {
    names: string[];
}
export interface EventResponse {
    instance: Context;
    eventName: string;
    [key: string]: any;
}
