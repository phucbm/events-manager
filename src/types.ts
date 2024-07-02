interface Context {
    config?: Record<string, any>;
    options?: Record<string, any>;
}

interface Options {
    names: string[];
}

interface EventResponse {
    instance: Context;
    eventName: string;

    [key: string]: any;
}
