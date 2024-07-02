# Events Manager

![Test Status](https://github.com/phucbm/events-manager/actions/workflows/test.yml/badge.svg)

## Install

```shell
npm i @phucbm/events-manager
```

## Usage in Plugin

### JavaScript

```js
import {EventsManager} from "@phucbm/events-manager";

class Plugin{
    constructor(){
        // init events manager
        this.events = new EventsManager(this, {
            names: ['onInit'] // register event names
        });

        // fire an event
        this.events.fire('onInit', {source: 'example'}); // the 2nd param is an object that will be passed to the callback
    }

    /**
     * Assign late-events
     */
    on(eventName, callback){
        this.events.add(eventName, callback);
    }
}

// add event from init
const instance = new Plugin();
instance.on('onInit', data => {
    console.log('init', data);
});

// add via method after init
instance.on('onInit', data => {
    console.log('init', data);
});

// with or without keyword on before the event name are all acceptable
instance.on('init', data => {
    console.log('init', data);
});
```

### TypeScript

```typescript
import {EventsManager} from "@phucbm/events-manager";

interface Context {
    options?: Record<string, any>;
    config?: Record<string, any>;
}

class Plugin {
    private events: EventsManager;

    constructor() {
        const context: Context = {options: {}};
        // init events manager
        this.events = new EventsManager(context, {
            names: ['onInit'] // register event names
        });

        // fire an event
        this.events.fire('onInit', {source: 'example'}); // the 2nd param is an object that will be passed to the callback
    }

    /**
     * Assign late-events
     */
    on(eventName: string, callback: Function): void {
        this.events.add(eventName, callback);
    }
}

// add event from init
const instance = new Plugin();
instance.on('onInit', (data: any) => {
    console.log('init', data);
});

// add via method after init
instance.on('onInit', (data: any) => {
    console.log('init', data);
});

// with or without keyword on before the event name are all acceptable
instance.on('init', (data: any) => {
    console.log('init', data);
});
```

## Use the Plugin

### JavaScript

```js
// add event from init
const instance = Plugin.init({
    onInit: data => {
        console.log('init', data);
    }
});

// add via method after init
instance.on('onInit', data => {
    console.log('init', data);
});

// with or without keyword on before the event name are all acceptable
instance.on('init', data => {
    console.log('init', data);
});
```

### TypeScript

```typescript
// add event from init
const instance = Plugin.init({
    onInit: (data: any) => {
        console.log('init', data);
    }
});

// add via method after init
instance.on('onInit', (data: any) => {
    console.log('init', data);
});

// with or without keyword on before the event name are all acceptable
instance.on('init', (data: any) => {
    console.log('init', data);
});
```