# Events Manager

![Test Status](https://github.com/phucbm/events-manager/actions/workflows/test.yml/badge.svg)
[![npm version](https://badgen.net/npm/v/@phucbm/events-manager?activeTab=readme?icon=npm)](https://www.npmjs.com/package/@phucbm/events-manager?activeTab=readme)
[![npm downloads](https://badgen.net/npm/dm/@phucbm/events-manager?activeTab=readme?icon=npm)](https://www.npmjs.com/package/@phucbm/events-manager?activeTab=readme)
[![npm dependents](https://badgen.net/npm/dependents/@phucbm/events-manager?activeTab=readme?icon=npm)](https://www.npmjs.com/package/@phucbm/events-manager?activeTab=readme)
[![github stars](https://badgen.net/github/stars/phucbm/events-manager?icon=github)](https://github.com/phucbm/events-manager/)
[![jsdelivr hits](https://badgen.net/jsdelivr/hits/gh/phucbm/events-manager?icon=jsdelivr)](https://www.jsdelivr.com/package/gh/phucbm/events-manager)
[![jsdelivr npm rank](https://badgen.net/jsdelivr/rank/npm/@phucbm/events-manager?activeTab=readme?icon=npm)](https://www.npmjs.com/package/@phucbm/events-manager?activeTab=readme)
[![github license](https://badgen.net/github/license/phucbm/events-manager?icon=github)](https://github.com/phucbm/events-manager/blob/main/LICENSE)
[![Made in Vietnam](https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg)](https://webuild.community)

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
